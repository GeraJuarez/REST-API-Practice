const Product = require('../models/product.model');

exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            //return next(err);
            return res.status(500).send(err);
        }
        res.status(200).send('Product Created successfully')
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            //return next(err);
            return res.status(500).send(err);
        }
        res.status(200).send(product);
    })
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            //return next(err);
            return res.status(500).send(err);
        }
        res.status(200).send('Deleted successfully!');
    })
};
