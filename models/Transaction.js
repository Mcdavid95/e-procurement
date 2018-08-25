import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  bank: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: { type: Date, default: Date.now },
});

const Transactions = mongoose.model('Transactions', transactionSchema);
export default Transactions;
