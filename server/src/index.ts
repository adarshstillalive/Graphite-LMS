import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './interface/routes/userRoutes.js';
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoute);

app.listen(PORT, () => {
  console.log(`Server running at ${process.env.SERVER_URL}${PORT}`);
});
