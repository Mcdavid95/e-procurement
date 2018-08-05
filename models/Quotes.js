import mongoose from 'mongoose';

const quotesSchema = new mongoose.Schema({
  isDelivered: {
    type: Boolean,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  dateRequested: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  dateNeeded: {
    type: String,
    trim: true
  },
  isLive: {
    type: Boolean
  },
  createdAt: { type: Date, default: Date.now },
});

const Quotes = mongoose.model('Quotes', quotesSchema);
export default Quotes;
