import mongoose from 'mongoose';

const feedbackData=new mongoose.Schema({
    username:String,
    feedback:String,
    date:{
        type:Date,
        default:Date.now
    }
});

export default mongoose.model('feedbackData',feedbackData);
