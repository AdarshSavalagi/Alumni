import mongoose, { Schema } from 'mongoose';

const alumniSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    batch: {
        type: String,
        required: [true, 'Batch is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    company: {
        type: String,
        required: [true, 'Company is required']
    },
    position: {
        type: String,
        required: [true, 'Position is required']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    linkedin: {
        type: String,
        required: [true, 'LinkedIn profile is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5']
    },
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required']
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    forgotPasswordToken: {
        type: String,
        default: ''
    }
});

const Alumni = mongoose.models.alumni || mongoose.model('alumni', alumniSchema);
export default Alumni;
