// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import myListRoutes from "./routes/listRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import userModel from "./models/user.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const app = express();
const port = 8000;

app.use(express.json());
dotenv.config();
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Netflix", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGODB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: "Sarthak Vats",
    resave: false,
    saveUninitialized: false,
  })
);

passport.use(new LocalStrategy(userModel.authenticate()));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Sarthak Vats", // Replace with your own secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await userModel.findById(payload.sub);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use("/authenticateToken", authRoutes);
app.use("/user", userRoutes);
app.use("/movies", movieRoutes);
app.use("/list", myListRoutes);

app.listen(port, () => {
  console.log(`Listening to port - http://localhost:${port}`);
});
