import mongoose from 'mongoose';

const techTalkSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    topic: { 
        type: String, 
        required: [true, 'Topic is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    isVerified:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
});

const TechTalk = mongoose.models.techtalk||mongoose.model('techtalk', techTalkSchema);

export default TechTalk;
