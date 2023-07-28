import Product from "../models/Product.js";
import mongoose from "mongoose";

class ProductController {
    async store(req, res){
        try {
            if (!req.body.nama) {
                throw { code: 400, message: "NAMA_LAPTOP_IS_REQUIRED" };
            }

            if (!req.body.harga) {
                throw { code: 400, message: "HARGA_IS_REQUIRED" };
            }

            if (!req.body.stok) {
                throw { code: 400, message: "JENIS_IS_REQUIRED" };
            }

            const product = await Product.create(req.body);

            if(!product){
                throw { code: 400, message: "FAILED_ADD_PRODUCT" };
            }

            return res.status(200).json({
                status: true,
                message: "SUCCESS_ADD_PRODUCT",
                product,
            });
        }catch(err){
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async index(req, res) {
        try {
            const product = await Product.find();

            if (!product) {
                throw { code: 409, message: "FAILED_GET_PRODUCT" };
            }

            return res.status(200).json({
                status: true,
                message: "SUCCESS_GET_PRODUCT",
                data: product,
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async getById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            console.log('product',product)
            if (!product) {
                throw { code: 409, message: "FAILED_GET_PRODUCT" };
            }

            return res.status(200).json({
                status: true,
                message: "SUCCESS_GET_PRODUCT",
                data: product,
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async update(req, res) {
        try {
            if (!req.params.id) {
                throw { code: 400, message: "REQUIRED_ID" };
            }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                throw { code: 400, message: "INVALID_ID" };
            }
    
            const updateProduct = await Product.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true }
            );
           
            return res.status(200).json({
                status: true,
                message: "SUCCESS_UPDATE_PRODUCT",
                updateProduct,
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message,
            });
        }
    }

    async destroy(req, res) {
        try {

          if (!req.params.id) {
            throw { code: 400, message: "REQUIRED_ID" };
          }
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw { code: 400, message: "INVALID_ID" };
          }
        
          const productDelete = await Product.findOneAndDelete({ _id: req.params.id });
    
          if (!productDelete) {
            throw { code: 400, message: "FAILED_DELETE_PRODUCT" };
          }
    
          return res.status(200).json({
            status: true,
            message: "SUCCESS_DELETE_PRODUCT",
            productDelete,
          });
        } catch (err) {
          return res.status(err.code || 500).json({
            status: false,
            message: err.message,
          });
        }
      }
}

const newProductController = new ProductController();
export default newProductController;
