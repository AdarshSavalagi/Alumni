import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'department name is required']
    }
});

const departmentModel = mongoose.models.department || mongoose.model('department',departmentSchema);

export default departmentModel;