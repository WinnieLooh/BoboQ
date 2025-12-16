 import * as productService from '../services/product.service.js';

  export async function getProducts(req, res, next) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  export async function getProductById(req, res, next) {
    try {
      const product = await productService.getById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      next(err);
    }
  }