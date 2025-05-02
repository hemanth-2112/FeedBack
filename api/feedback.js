import express from 'express';
import mongoose from 'mongoose';
import Feedbackdata from '../models/feedbackdata.js';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL;  // Vercel will inject this automatically

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

app.get('/api/feeddata', async (req, res) => {
  const feedData = await Feedbackdata.find().sort({ date: -1 });
  res.json(feedData);
});

app.post('/api/givefeed', async (req, res) => {
  const { username, feedback } = req.body;
  const newFeedback = new Feedbackdata({ username, feedback });
  await newFeedback.save();
  res.json({ message: "Feedback added Successfully" });
});

export const handler = serverless(app);
