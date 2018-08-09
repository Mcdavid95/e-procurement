import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suppliers'
  },
  bank: {
    type: String,
    required: true,
    trim: true
  },
  transactionId: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: { type: Date, default: Date.now },
});

const Receipts = mongoose.model('Receipts', receiptSchema);
export default Receipts;
