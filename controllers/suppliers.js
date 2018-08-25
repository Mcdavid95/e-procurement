import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Supplier from '../models/Suppliers';

dotenv.config();

mongoose.Promise = global.Promise;

export default {
  /**
   * signup a new supplier
   * @param {any} req supplier request object
   * @param {any} res servers response
   * @return {void}
   */
  signup(req, res) {
    const {
      businessName, companyAlias, address, companyName, password, phone, email
    } = req.body;
    const promise = Supplier.findOne({
      email: email.trim().toLowerCase()
    }).exec();

    promise.then((isEmail) => {
      if (isEmail) {
        return res.status(409).send({
          error: 'supplier with that email already exist'
        });
      }

      const supplier = new Supplier({
        businessName: businessName.trim().toLowerCase(),
        companyAlias: companyAlias.trim(),
        address: address.trim(),
        companyName: companyName.trim().toLowerCase(),
        password,
        phone: parseInt(phone, 10),
        email: email.trim().toLowerCase()
      });
      supplier.save().then((newSupplier) => {
        const token = jwt.sign(
          {
            id: newSupplier._id
          },
          process.env.SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(201).send({
          message: `Welcome ${businessName} ${companyName}`,
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
    const promise = Supplier.findOne({
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
            id: user.id
          },
          process.env.SECRET,
          { expiresIn: 24 * 60 * 60 }
        );
        return res.status(201).send({
          token,
          message: `Welcome back ${user.businessName} ${user.companyName}`
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
