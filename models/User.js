import { model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,

    validate: {
      validator: validator.isEmail,
      message: "invalid email adress",
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password can't be less than 6 character"],
  },
});

UserSchema.pre("save", async function () {
  const genSalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, genSalt);
});

UserSchema.methods.toJSON = function () {
  let userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.methods.comparePasswords = async function (
  password,
  hashedPassword
) {
  const isPasswordCorrect = await bcrypt.compare(hashedPassword, password);
  return isPasswordCorrect;
};
const User = model("User", UserSchema);

export default User;
