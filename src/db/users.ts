import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type:String, select:false},
        sessionToken: {type: String, select:false},
    },
});

export const User = mongoose.model("User", userSchema);

export const getUsers = () => User.find();
export const getUserByEmail = (email:String) => User.findOne({email});
export const getUserBySessionToken = (sessionToken:String) => User.findOne({
    'authentication.sessionToken' : sessionToken,
});
export const getUserById = (id: String) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject());
export const deleteUser = (id:String) => User.findOneAndDelete({_id: id});
export const updateUser = (id:String, values:Record<string, any>) => User.findByIdAndUpdate(id, values);