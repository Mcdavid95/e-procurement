import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer'
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  createdAt: { type: Date, default: Date.now },
});

const Invoices = mongoose.model('Invoices', invoiceSchema);
export default Invoices;
