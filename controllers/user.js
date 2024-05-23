const User = require("../models/users.js");
const Donor_history = require("../models/donor_history.js");
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.user_login = async (req, res, next) => {
  try {
    const { phone_Number, password_PIN } = req.body;
    if (!phone_Number || !password_PIN) {
      // Change to || (OR) instead of &&
      return res.status(400).json({ message: "Something is missing!" });
    }
    const user = await User.findOne({ where: { phone_Number } }); // Use findOne instead of findAll
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User does not exist!" });
    }
    const passwordPINString = password_PIN.toString();
    bcrypt.compare(passwordPINString, user.password_PIN, (err, result) => {
      // if (err) {
      //   console.error(err);
      //   return res.status(500).json({
      //     success: false,
      //     message: "Internal Server Error",
      //   });
      // }
      if (result === true) {
        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: generateAccessToken(user.id, user.name),
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "Incorrect password",
        });
      }
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.user_signup = async (req, res, next) => {
  try {
    const {
      name,
      phone_Number,
      gender,
      father_Name,
      password_PIN,
      pin_Code,
      bloodGroup,
      addressLine1,
      dateOfBirth,
    } = req.body;

    if (
      !name &&
      !phone_Number &&
      !gender &&
      !father_Name &&
      !password_PIN &&
      !pin_Code &&
      !bloodGroup &&
      !addressLine1 &&
      !dateOfBirth
    ) {
      return res.status(400).json({ message: "Somthing is missing!" });
    }
    const saltrounds = 10;
    const passwordPINString = password_PIN.toString();
    bcrypt.hash(passwordPINString, saltrounds, async (err, hash) => {
      try {
        const user = await User.create({
          name,
          phone_Number,
          gender,
          father_Name,
          password_PIN: hash,
          pin_Code,
          bloodGroup,
          addressLine1,
          dateOfBirth,
        });
        res.status(200).json({
          message: "Successfuly create new user",
          token: generateAccessToken(user.id, user.name),
        });
      } catch (err) {
        res.status(500).json({
          error: err,
          message: "User may Already exixt!",
        });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.user_profile = async (req, res, next) => {
  try {
    console.log(req.user.id);
    // const user = await User.findOne({
    //   where: { id: req.user.id },
    // });

    const user = await User.findOne({
      where: { id: req.user.id },
      include: [{
        model: Donor_history,
        attributes: []
      }],
      attributes: {
        include: [
          [
            // Subquery to count the number of 'done' status Platelets donations
            Sequelize.fn("SUM", Sequelize.literal(`CASE WHEN donor_histories.donationStatus = 'Done' AND donor_histories.donationType = 'Platelets' THEN 1 ELSE 0 END`)),
            "donePlateletsCount"
          ],
          [
            // Subquery to count the number of 'done' status Blood donations
            Sequelize.fn("SUM", Sequelize.literal(`CASE WHEN donor_histories.donationStatus = 'Done' AND donor_histories.donationType = 'Blood' THEN 1 ELSE 0 END`)),
            "doneBloodCount"
          ]
        ]
      },
      group: ['id']
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

// exports.forgot_password = async (req, res) => {
//   const { email } = req.body;
//   console.log(email);

//   if (!email) {
//     return res.status(400).json({ message: "Somthing is missing!" });
//   }
//   try {
//     const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();
//     const sender = {
//       email: "mnkb007@gmail.com",
//     };
//     const receivers = [
//       {
//         email: email,
//       },
//     ];

//     // const responce = await User.findAll({where: { email:email}});
//     // const p = bcrypt.compare(password, responce[0].password);
//     const data = tranEmailApi.sendTransacEmail({
//       sender,
//       to: receivers,
//       subject: "Your Password is...",
//       textContent: `
//         try to log in with this password {{params.password}} with mail id {{params.email}}.
//         `,
//       params: {
//         password: "12345",
//         email: email,
//       },
//     });

//     console.log(
//       "API called successfully. Returned data: " + JSON.stringify(data)
//     );
//     res.status(200).json({ message: "Dome" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, name: name }, "key");
}
