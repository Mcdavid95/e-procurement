import mongoose from 'mongoose';
import Invoice from '../models/Invoices';
import Product from '../models/Product';

mongoose.Promise = global.Promise;

export default {
  /**
   * createInvoice
   * @description controller reponsible for creating new invoice document
   * @param {object} req invoice form data
   * @param {object} res response object
   * @return {object} response object
   */
  createInvoice(req, res) {
    const { productId } = req.query;
    let supplierId;
    Product.findById(productId)
      .populate('supplier')
      .then((product) => {
        if (!product) {
          return res.status(404).send({
            success: false,
            message: 'Product not found'
          });
        }
        supplierId = product.supplier._id;
        const invoice = new Invoice({
          product: productId,
          buyer: req.decoded.id,
          supplier: supplierId
        });
        invoice.save().then(newInvoice => res.status(201).send({
          success: true,
          message: 'Invoice created',
          invoice: newInvoice
        }))
          .catch(error => res.status(500).send({
            success: false,
            message: error.message,
            error
          }));
      });
  },
  getOneInvoice(req, res) {
    const { id } = req.query;
    Invoice.findById(id).exec()
      .then((invoice) => {
        if (!invoice) {
          return res.status(404).send({
            success: false,
            message: 'Invoice not found'
          });
        }
        return res.status(200).send({
          success: true,
          invoice
        });
      })
      .catch(error => res.status(500).send({
        success: false,
        message: error.message
      }));
  },
  getAllInvoice(req, res) {
    Invoice.find({}).exec()
      .then(invoices => res.status(200).send({
        success: true,
        invoices
      }))
      .catch(error => res.status(500).send({
        success: false,
        message: error.message
      }));
  }
};
