const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fullname: { type: String, trim: true, required: true, lowercase: true },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,

      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        { message: "Invalid email" },
      ],
    },
    password: {
      type: String,
      trim: true,
    },
  },

  { timestamps: true },
);

userSchema.pre("save", async function () {
  console.log("success");

  const count = await model("User").countDocuments({ mobile: this.mobile });
  if (count > 0) throw new Error("Mobile number alrady exist");
});

userSchema.pre("save", async function (next) {
  const count = await model("User").countDocuments({ email: this.email });
  if (count > 0) throw new Error("email alrady exist");
});

userSchema.pre("save", async function (next) {
  const encrypetedPassword = await bcrypt.hash(this.password.toString(), 12);
  this.password = encrypetedPassword;
});
const UserModel = model("User", userSchema);
module.exports = UserModel;
