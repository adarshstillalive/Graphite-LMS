import express from 'express';
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
// import './infrastructure/jobs/instructorPayment.js';
dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@graphite01.adueb.mongodb.net/?retryWrites=true&w=majority&appName=Graphite01`,
  )
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);

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

const server = app.listen(PORT, () => {
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
