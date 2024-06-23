import mongoose, {Schema} from 'mongoose';
import { type } from 'os';


const officeBearersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

const OfficeBearers = mongoose.models.officebearer||mongoose.model('officebearer', officeBearersSchema);
export default OfficeBearers;

