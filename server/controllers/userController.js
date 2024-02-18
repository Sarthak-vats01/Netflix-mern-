// controllers/userController.js
import userModel from "../models/user.js";
import passport from "passport";
import jwt from "jsonwebtoken";

function generateJwtToken(user) {
  const payload = {
    sub: user._id,
  };

  return jwt.sign(payload, "Sarthak Vats", { expiresIn: "1h" });
}

async function Signup(req, res) {
  try {
    console.log(
      `Registration initiated username = ${req.body.email} and password = ${req.body.password}`
    );

    const existingUser = await userModel.findOne({
      username: req.body.email,
    });
    if (existingUser) {
      console.log("Username already in use");
      return res.status(400).send("Username already in use");
    }

    const newUser = await userModel.register(
      new userModel({ username: req.body.email }),
      req.body.password
    );

    // Generate JWT token
    const token = generateJwtToken(newUser);

    console.log("User registered successfully", newUser);
    return res.status(201).json({ userId: newUser._id, token });
  } catch (error) {
    console.error(`Internal Error ${error}`);
    res.status(500).send("Internal Server Error");
  }
}

function SignIN(req, res, next) {
  console.log(
    `signin initiated username = ${req.body.email} and password = ${req.body.password}`
  );
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(`Internal Error ${err}`);
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      console.log("Incorrect email or password");
      console.log(info);
      return res.status(401).send("Incorrect email or password");
    }

    // Generate JWT token
    const token = generateJwtToken(user);

    // Send both user and token in the response
    return res.status(200).json({
      userId: user._id,
      token,
    });
  })(req, res, next);
}

async function SignOut(req, res) {
  try {
    console.log("SignOut function called");

    // Use a callback function with req.logout
    req.logout((err) => {
      if (err) {
        console.error(`Error during logout: ${err}`);
        return res.status(500).send("Internal Server Error");
      }

      console.log("User logged out successfully");
      res.status(200).send("User Logged Out");
    });
  } catch (error) {
    console.error(`Error during sign-out: ${error}`);
    res.status(500).send("Internal Server Error");
  }
}

export { Signup, SignIN, SignOut };
