import mongoose from "mongoose";

//define the schema for the user data
const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  password: { type: String, required: true },
});

// create a model
const UserModel = mongoose.model("User", User);
// export the model
 export default UserModel;
// export the model
