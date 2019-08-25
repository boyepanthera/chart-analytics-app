import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import autoIncrement from 'mongoose-auto-increment';

autoIncrement.initialize(mongoose.connection);

const userSchema =  new Schema ({
    email: {type: String, unique:true, require:true},
    password: {type: String, minlength:8, required: true},
    firstName: {type:String},
    lastName: {type: String},
    date : {
        type:Date,
        default:Date.now
    }
});

userSchema.plugin(autoIncrement.plugin, {
    model:'User',
    startAt:1,
    incrementBy:5
    });

const User = mongoose.model('User', userSchema);

export default User