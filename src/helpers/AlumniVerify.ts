import { connect } from '@/dfConfig/dbConfig';
import AlumniModel from '@/models/alumni';

connect();

export const AlumniVerify = async (token:string) => {
    try {
        const alumni = await AlumniModel.findOne({token:token});
        if(!alumni) return {alumni:false};
        if(alumni.tokenExpire < Date.now()) return {alumni:false};
        return {alumni:true, id:alumni._id};
    } catch (error:any) {
        console.log('Error Alumni Verify :', error.message);
        return {admin:false};
    }
}