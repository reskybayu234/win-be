// models
import User from "../models/User.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

// libraries
import emailExist from "../libraries/emailExist.js";
import isEmailValid from "../libraries/isEmailValid.js";

const env = dotenv.config().parsed;

const generateAccessToken = async (payload) => {
    return jsonwebtoken.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
};

const generateRefreshToken = async (payload) => {
    return jsonwebtoken.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
};
  

class AuthController {
    async register(req, res) {
        try {

            if (!req.body.name) {
                throw { code: 400, message: "NAME_IS_REQUIRED" };
            }
              
            if (!req.body.email) {
                throw { code: 400, message: "EMAIL_IS_REQUIRED" };
            }

            if (!isEmailValid(req.body.email)) {
                throw { code: 400, message: "EMAIL_IS_NOT_VALID" };
            }

            if (!req.body.gender) {
                throw { code: 400, message: "GENDER_IS_REQUIRED" };
            }

            if (!req.body.password) {
                throw { code: 400, message: "PASSWORD_IS_REQUIRED" };
            }

            if (req.body.password.length < 6) {
                throw { code: 400, message: "PASSWORD_MUST_MORE_THAN_6_CHARACTER" };
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(req.body.password, salt);

            const isEmailExist = await emailExist(req.body.email);

            if (isEmailExist) {
                throw { code: 409, message: "EMAIL_ALREADY_EXIST" };
            }

            const user = await User.create({
                name : req.body.name,
                email : req.body.email,
                gender : req.body.gender,
                password : hash
            });

            if (!user) {
                throw { code: 500, message: "USER_REGISTER_FAILED" };
            }

            return res.status(200).json({
                name : req.body.name,
                email : req.body.email,
                gender : req.body.gender,
                password : hash
            });
        }catch(err){
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async login(req, res) {
        try {
          console.log('req.body',req.body);
          if (!req.body.email) {
            throw { code: 400, message: "EMAIL_IS_REQUIRED" };
          }
    
          if (!isEmailValid(req.body.email)) {
            throw { code: 400, message: "EMAIL_IS_NOT_VALID" };
          }
    
          if (!req.body.password) {
            throw { code: 400, message: "PASSWORD_IS_REQUIRED" };
          }
    
          const user = await User.findOne({ email: req.body.email });

          if (!user) {
            throw { code: 404, message: "USER_NOT_FOUND" };
          }
    
          const pass = bcrypt.compareSync(req.body.password, user.password);
          
          if (!pass) {
            throw {
              code: 400,
              message: "INVALID_PASSWORD",
            };
          }
    
          const accessToken = await generateAccessToken({ id: user._id });
    
          const refreshToken = await generateRefreshToken({ id: user._id });

          console.log('use.email', user.email)
          return res.status(200).json({
            status: true,
            message: "LOGIN_SUCCESS",
            email: user.email,
            refreshToken,
            accessToken,
          });
        } catch (err) {
          return res.status(err.code || 500).json({
            status: false,
            message: err.message,
          });
        }
      }
}

const newAuthController = new AuthController();
export default newAuthController;
