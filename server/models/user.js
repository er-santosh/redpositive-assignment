import { model, Schema } from "mongoose";
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          var re =
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
          return !v || !v.trim().length || re.test(v);
        },
        message: "Provided phone number is invalid.",
      },
    },
    hobbies: String,
  },

  {
    timestamps: true,
  }
);
const User = model("User", UserSchema);

export default User;
