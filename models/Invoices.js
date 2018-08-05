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
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', invoiceSchema);
export default Product;
