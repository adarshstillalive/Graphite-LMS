import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './interface/routes/userRoutes.js';
import adminRoute from './interface/routes/adminRoute.js';
import instructorRoute from './interface/routes/instructorRoute.js';
import prisma from './infrastructure/orm/prismaClient.js';
import fileUpload from 'express-fileupload';
import userResponseMiddleware from './infrastructure/middleware/userResponseMiddleware.js';
import userAuthMiddleware from './infrastructure/middleware/userAuthMiddleware.js';
import MongoChatRepository from './infrastructure/databases/mongoDB/MongoChatRepository.js';
// import './infrastructure/jobs/instructorPayment.js';
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@graphite01.adueb.mongodb.net/?retryWrites=true&w=majority&appName=Graphite01`,
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    credentials: true,
    origin: process.env.CLIENT_URL,
  },
});
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

const mongoChatRepository = new MongoChatRepository();
const users = new Map();
const socketToUser = new Map();
io.on('connection', (socket) => {
  // console.log(`User connected: ${socket.id}`);

  socket.on('userConnected', (userId) => {
    if (!users.has(userId)) {
      users.set(userId, new Set());
    }
    users.get(userId).add(socket.id);
    socketToUser.set(socket.id, userId);

    console.log(
      `User ${userId} connected. Current online users:`,
      Array.from(users.keys()),
    );
    io.emit('updateOnlineUsers', Array.from(users.keys()));
  });

  socket.on('joinRoom', ({ roomId, userName }) => {
    socket.join(roomId);
    // console.log(`${userName} joined the room: ${roomId}`);
    socket.to(roomId).emit('User joined', { userName });
  });

  socket.on('sendMessage', async ({ roomId, userName, message }) => {
    // console.log(`Message from ${userName} in room ${roomId}: ${message}`);

    // Save message to DB
    const savedMessage = await mongoChatRepository.saveMessageToDb(
      message.chatId,
      message.senderId,
      message.text,
    );

    // Emit the message to the room (i.e., the other user)
    io.to(roomId).emit('receiveMessage', savedMessage);

    // Optionally: Emit a confirmation to the sender
    socket.emit('messageSent', {
      messageId: savedMessage._id,
      status: 'sent',
    });
  });

  socket.on('disconnect', () => {
    const userId = socketToUser.get(socket.id);
    if (userId) {
      const socketSet = users.get(userId);
      socketSet.delete(socket.id);
      if (socketSet.size === 0) {
        users.delete(userId);
        console.log(`User ${userId} went offline.`);
      }
      socketToUser.delete(socket.id);
    }
    io.emit('updateOnlineUsers', Array.from(users.keys()));
  });
});

app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(userResponseMiddleware);
app.use('/', userRoute);
app.use('/admin', adminRoute);
app.use('/instructor', userAuthMiddleware.setInstructorRole, instructorRoute);

// app.use((err: Error, req: Request, res: Response) => {
//   res.status(500).json(createResponse(false, 'Internal server error', {}, err));
// });

server.listen(PORT, () => {
  console.log(`Server running at ${process.env.SERVER_URL}${PORT}`);
});

const shutDown = async () => {
  console.log('Shutting down the server...');
  try {
    await prisma.$disconnect();
    console.log('Prisma disconnected');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } catch (error) {
    console.log('Error during shutdown', error);
    process.exit(1);
  }
};

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
