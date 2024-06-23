import mongoose, { Schema } from "mongoose";


const managementSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    designation: {
        type: String,
        required: [true, "Description is required"]
    },
    message: {
        type: String,
        required: [true, "Message is required"]
    }
});

const Management = mongoose.models.management || mongoose.model("management", managementSchema);

export default Management;