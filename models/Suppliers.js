import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  companyAlias: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: { type: Date, default: Date.now },
});

const Suppliers = mongoose.model('Suppliers', supplierSchema);
export default Suppliers;
