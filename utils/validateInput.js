import validator from 'validator';

const validateInput = {
  /**
   * @method signupInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signupInput(req, res, next) {
    const {
      firstname, lastname, password, email, phone
    } = req.body;
    if (typeof (firstname) === 'undefined') {
      return res.status(401).json({
        message: 'Firstname field must not be empty'
      });
    } if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    } if (typeof (email) === 'undefined') {
      return res.status(401).send({
        message: 'Email field must not be empty'
      });
    } if (!validator.isEmail(email)) {
      return res.status(401).send({
        message: 'Please put in a proper email address'
      });
    } if (typeof (lastname) === 'undefined') {
      return res.status(401).send({
        message: 'Lastname field must not be empty'
      });
    } if (typeof (phone) === 'undefined') {
      return res.status(401).send({
        message: 'Phone field must not be empty'
      });
    } if (!validator.isMobilePhone(phone, 'en-NG')) {
      return res.status(401).send({
        message: 'Phone must be a valid number'
      });
    }
    return next();
  },

  /**
   * @method supplierSignupInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  supplierSignupInput(req, res, next) {
    const {
      businessName, companyName, address, companyAlias, password, email, phone
    } = req.body;
    if (typeof (businessName) === 'undefined') {
      return res.status(401).json({
        message: 'Business name field must not be empty'
      });
    } if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    } if (typeof (email) === 'undefined') {
      return res.status(401).send({
        message: 'Email field must not be empty'
      });
    } if (!validator.isEmail(email)) {
      return res.status(401).send({
        message: 'Please put in a proper email address'
      });
    } if (typeof (companyName) === 'undefined') {
      return res.status(401).send({
        message: 'Company Name field must not be empty'
      });
    } if (typeof (phone) === 'undefined') {
      return res.status(401).send({
        message: 'Phone field must not be empty'
      });
    } if (!validator.isMobilePhone(phone, 'en-NG')) {
      return res.status(401).send({
        message: 'Phone must be a valid number'
      });
    }
    if (typeof (companyAlias) === 'undefined') {
      return res.status(401).send({
        message: 'Company Alias field must not be empty'
      });
    }
    if (typeof (address) === 'undefined') {
      return res.status(401).send({
        message: 'Address field must not be empty'
      });
    }
    return next();
  },

  /**
   * @method signInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  signInInput(req, res, next) {
    const { email, password } = req.body;
    if (typeof (email) === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } if (typeof (password) === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    }
    return next();
  },

  /**
   * @method invoiceInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  invoiceInput(req, res, next) {
    if (typeof (req.query.productId) === 'undefined') {
      return res.status(401).json({
        message: 'Please provide productId in query as such /invoice/:productId'
      });
    }
    return next();
  },

  /**
   * @method getInvoice
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  getInvoice(req, res, next) {
    if (typeof (req.query.id) === 'undefined') {
      return res.status(401).json({
        message: 'Please pass invoice id to req.query.id'
      });
    }
    return next();
  },
  /**
   * @method createProduct
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  createProduct(req, res, next) {
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
    if (validator.isEmpty(name)) {
      return res.status(401).json({
        message: 'Name field must not be empty'
      });
    } if (validator.isEmpty(quantity)) {
      return res.status(401).json({
        message: 'Quantity field must not be empty'
      });
    } if (!validator.isNumeric(quantity)) {
      return res.status(401).json({
        message: 'Quantity field should be a number'
      });
    } if (validator.isEmpty(pricePerUnit)) {
      return res.status(401).json({
        message: 'pricePerUnit field must not be empty'
      });
    } if (!validator.isNumeric(pricePerUnit)) {
      return res.status(401).json({
        message: 'pricePerUnit field must be a number'
      });
    } if (validator.isEmpty(supplierId)) {
      return res.status(401).json({
        message: 'SupplierId field must not be empty'
      });
    } if (validator.isEmpty(deliveryCost)) {
      return res.status(401).json({
        message: 'deliveryCost field must not be empty'
      });
    } if (!validator.isNumeric(deliveryCost)) {
      return res.status(401).json({
        message: 'deliveryCost field must be a number'
      });
    } if (validator.isEmpty(deliveryTimeline)) {
      return res.status(401).json({
        message: 'deliveryTimeline field must not be empty'
      });
    } if (validator.isEmpty(description)) {
      return res.status(401).json({
        message: 'description field must not be empty'
      });
    } if (validator.isEmpty(location)) {
      return res.status(401).json({
        message: 'location field must not be empty'
      });
    } if (validator.isEmpty(unit)) {
      return res.status(401).json({
        message: 'unit field must not be empty'
      });
    } if (!validator.isNumeric(unit)) {
      return res.status(401).json({
        message: 'unit field must be a number'
      });
    }
    return next();
  },
  /**
   * @method getProduct
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} response
   */
  getProduct(req, res, next) {
    if (typeof (req.query.id) === 'undefined') {
      return res.status(401).json({
        message: 'Please pass product id to req.query.id'
      });
    }
    return next();
  },
};
export default validateInput;
