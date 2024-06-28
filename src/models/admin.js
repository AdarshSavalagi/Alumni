import mongoose,{Schema} from 'mongoose';

const adminSchema = new Schema({
    username: String,
    email: String,
    password: String,
    token:{
        type:String,
        default:''
    },
    tokenExpire:{
        type:Date,
        default:Date.now()
    }
    
});

const Admin =mongoose.models.admin || mongoose.model('admin', adminSchema);
export default Admin;