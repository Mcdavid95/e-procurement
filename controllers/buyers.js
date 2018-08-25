import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Buyer from '../models/Buyer';

dotenv.config();

mongoose.Promise = global.Promise;

export default {
  /**
   * signup a new buyer
   * @param {any} req buyer request object
   * @param {any} res servers response
   * @return {void}
   */
  signup(req, res) {
    const {
      firstname, lastname, password, phone, email
    } = req.body;
    const promise = Buyer.findOne({
      email: email.trim().toLowerCase()
    }).exec();

    promise.then((isEmail) => {
      if (isEmail) {
        return res.status(409).send({
          error: 'user with that email already exist'
        });
      }

      const buyer = new Buyer({
        firstname: firstname.trim().toLowerCase(),
        lastname: lastname.trim().toLowerCase(),
        password,
        phone: parseInt(phone, 10),
        email: email.trim().toLowerCase()
      });
      buyer.save().then((newBuyer) => {
        const token = jwt.sign(
          {
            id: newBuyer._id
          },
          process.env.SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(201).send({
          message: `Welcome ${firstname} ${lastname}`,
          token
        });
      })
        .catch((error) => {
          res.status(500).send(error.message);
        });
    });
  },
  /**
   * signin a new user
   * @param {any} req user request object
   * @param {any} res servers response
   * @return {void}
   */
  signin(req, res) {
    const { email, password } = req.body;
    const promise = Buyer.findOne({
      email: email.trim().toLowerCase()
    }).exec();
    promise.then((user) => {
      if (!user) {
        return res.status(404).send({
          error: 'Email is incorrect'
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({
          error: 'Incorrect password'
        });
      }
      if (user) {
        const token = jwt.sign(
          {
            id: user._id
          },
          process.env.SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(201).send({
          token,
          message: `Welcome back ${user.firstname} ${user.lastname}`
        });
      }
    })
      .catch((error) => {
        res.status(500).send({
          error: error.message
        });
      });
  },

};
