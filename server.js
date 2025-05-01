import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import mongoose from 'mongoose';
import Feedbackdata from './models/feedbackdata.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

mongoose.connect(MONGO_URL)
    .then(() => { console.log("✅Mongo DB Connected Successfully"); })
    .catch(() => { console.error("Mongo DB connection Failed") });



app.get('/feeddata', async (req, res) => {
    const feedData = await Feedbackdata.find().sort({date:-1});
    res.json(feedData);
});

app.post('/givefeed', async (req, res) => {
    const { username, feedback } = req.body;
    const newFeedback = new Feedbackdata({ username, feedback });
    await newFeedback.save();
    res.json({ message: "Feedback added Successfully" })
})

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));
