import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const buyerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  password: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActivated: { type: Boolean },
  expiryTime: Date,
  activateCode: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const SALT_WORK_FACTOR = 10;

buyerSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const Buyer = mongoose.model('Buyer', buyerSchema);
export default Buyer;
