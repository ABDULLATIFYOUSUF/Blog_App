import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    image:{
        type : String,
        require : [true, "image is required"]
    },
    username:{
        type : String,
        require : [true, "User Name is required"]

    },
    email:{
        type : String,
        require : [true, "Email is required"]

    },
    password:{
        type : String,
        require : [true, "Password is required"]

    },
    blogs:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Blogs",
        }
    ]
},
{ timestamps : true }
);

const userModel = mongoose.model('User', userSchema);

export default userModel;