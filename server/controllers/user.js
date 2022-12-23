import User from "../models/user";
import { NotFoundException } from "../utils/exceptions";
import { transporter } from "../utils/nodemailer";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) throw NotFoundException("User not found");
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUpdateUser = async (req, res, next) => {
  const post = req.method === "POST";
  const { _id, ...restBody } = req.body;
  try {
    if (post) {
      const user = await User.create(restBody);
      user.save();
    } else {
      await User.findByIdAndUpdate(_id, restBody, {
        new: true,
      });
    }
    return res.json({
      status: post ? 201 : 200,
      message: `User ${post ? "Created" : "Updated"} successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params._id);
    if (!user) throw NotFoundException("User not found");
    return res.json({
      status: 200,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const sendEmail = async (req, res, next) => {
  const { _id, name, email, phone, hobbies } = req.body;
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: "User Details",
      html: `
          <h1>Hello, ${process.env.RECIPIENT_EMAIL}!</h1>
          <p>I have send you the details of ${name}</p>
          <ul>
           <li style="font-size:20px"><span style="font-weight:700">ID:</span> ${_id}</li>
            <li style="font-size:20px"><span style="font-weight:700">Name:</span> ${name}</li>
            <li style="font-size:20px"><span style="font-weight:700">Email:</span> ${email}</li>
            <li style="font-size:20px"> <span style="font-weight:700">Phone:</span> ${phone}</li>
            <li style="font-size:20px"> <span style="font-weight:700">Hobbies:</span> ${hobbies}</li>
          </ul>
      `,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json({
          message:
            "User details has been sent. Please check the recepient mail.",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
