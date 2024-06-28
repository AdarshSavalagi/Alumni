import { connect } from '@/dfConfig/dbConfig';
import AdminModel from '@/models/admin';

connect();

export const AdminVerify = async (token:string) => {
    try {
        const admin = await AdminModel.findOne({token:token});
        if(!admin) return {admin:false};
        if(admin.tokenExpire < Date.now()) return {admin:false};
        return {admin:true, id:admin._id};
    } catch (error:any) {
        console.log('Error Admin Verify :', error.message);
        return {admin:false};
    }
}