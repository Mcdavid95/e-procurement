import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema({
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
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transactions'
  },
  createdAt: { type: Date, default: Date.now },
});

const Receipts = mongoose.model('Receipts', receiptSchema);
export default Receipts;
