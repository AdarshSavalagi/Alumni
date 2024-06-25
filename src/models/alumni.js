import mongoose, { Schema } from 'mongoose';
const alumniSchema = new Schema({
    name: {
        type: String,

    },
    batch: {
        type: String,
       
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    company: {
        type: String,
    },
    position: {
        type: String,
    },
    photo: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5']
    },
    review: {
        type: String,
    },
    department: {
        type: String,
    },
    isTestimonial:{
        type:Boolean,
        default:false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    forgotPasswordToken: {
        type: String,
        default: ''
    }
});

const Alumni = mongoose.models.alumni || mongoose.model('alumni', alumniSchema);
export default Alumni;
