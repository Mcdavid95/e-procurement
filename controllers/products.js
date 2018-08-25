import mongoose from 'mongoose';
import Product from '../models/Product';
import Supplier from '../models/Suppliers';

mongoose.Promise = global.Promise;

export default {
  /**
   * createProduct
   * @description controller for creating new Product document
   * @param {object} req product request object
   * @param {object} res response object
   * @returns {object} server response
   */
  createProduct(req, res) {
    const {
      name,
      quantity,
      pricePerUnit,
      supplierId,
      deliveryCost,
      deliveryTimeline,
      description,
      location,
      unit
    } = req.body;
    const product = new Product({
      name,
      quantity,
      price_per_unit: pricePerUnit,
      supplier: supplierId,
      deliveryCost,
      deliveryTimeline,
      location,
      description,
      unit
    });
    product.save().then(newProduct => res.status(201).send({
      success: true,
      message: 'Product successfully created',
      product: newProduct
    })).catch(error => res.status(500).send({
      success: false,
      message: error.message
    }));
  },
  /**
   * getOneProduct
   * @description controller to get details for one product
   * @param {object} req object containing product id
   * @param {object} res express response object
   * @returns {object} response object containing all details of selected product
   */
  getOneProduct(req, res) {
    const promise = Product.findById(req.query.id).exec();
    promise.then((product) => {
      if (!product) {
        return res.status(404).send({
          success: false,
          message: 'Id does not exist'
        });
      }
      return res.status(202).send({
        success: true,
        product
      });
    }).catch(error => res.status(500).send({
      success: false,
      message: error.message
    }));
  },

  /**
   * getBySupplier
   * @description controller to get all products for a supplier
   * @param {object} req request object containing supplier's id
   * @param {object} res response object
   * @returns {object} response object containing array of products
   */
  getBySupplier(req, res) {
    const { supplierId } = req.params;
    const promise = Supplier.findById(supplierId).exec();
    promise.then((supplier) => {
      if (!supplier) {
        return res.status(404).send({
          success: false,
          message: 'Supplier with that id does not exist'
        });
      }
      Product.find({
        'supplier._id': supplierId
      }).then(products => res.status(202).send({
        success: true,
        products
      }));
    });
  },
  /**
   * @method getAllProducts
   * @param {object} req request object containing supplier's id
   * @param {object} res response object
   * @returns {object} response object containing array of all product
   */
  getAllProducts(req, res) {
    const promise = Product.find().exec();
    promise.then((products) => {
      if (products.length === 0) {
        return res.status(202).send({
          success: true,
          message: 'No products found'
        });
      }
      return res.status(202).send({
        success: true,
        products
      });
    }).catch(error => res.status(500).send({
      success: false,
      message: error.message
    }));
  },
  /**
   * @method deleteProduct
   * @description deletes selected product
   * @param {object} req request object containing supplier's id
   * @param {object} res response object
   * @returns {object} response object containing array of all product
   */
  deleteProduct(req, res) {
    const { id } = req.query;
    Product.remove({
      _id: id,
      supplier: req.decoded.id
    }).exec()
      .then((product) => {
        if (product.result.n === 1) {
          return res.status(200).send({ message: 'Product successfully deleted' });
        }
        return res.status(404).json({
          error: 'Product not Found',
        });
      });
  }
};
