const express = require('express');
const productController = require('../controllers/product.controller')
const baseController = require('./../controllers/base.controller')
const router = express.Router();
const fs = require('fs')
var formidable   = require('formidable');

module.exports = () => {

    router.post("/login", async (req, res) => {
        try {
            const users = await baseController.loginUser(req.body);
            return res.status(200).json({
                data: users
            })
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    message: error.message
                })
            }
            return res.status(420).json({
                message: "There was an error, Please try again"
            })
        }
    })

    router.post("/register", async (req, res) => {
        try {
            await baseController.registerUser(req.body);
            return res.status(200).json({
                message: "Signup successfull, please login"
            })
        } catch (error) {
            if (error.status) {
                return res.status(error.status).json({
                    message: error.message
                })
            }
            return res.status(420).json({
                message: "There was an error, Please try again"
            })
        }
    })

    router.post("/addUpdateProduct", async (req, res) => {
        try {
            var form = new formidable.IncomingForm();
            form.parse(req, async function(err, fields, files) {
                if(err)
                    throw err;
                    if(files.file) {
                        var old_path  = files.file.path;
                        var file_name = 'image_' + parseInt(Date.now() / 1000) + '.png';
                        var file_path = __dirname + '/../../images/' + file_name;
                        var image_url = __dirname + '/../../images/' + file_name;
            
                        var inStream  = fs.createReadStream(old_path),
                            outStream = fs.createWriteStream(file_path);
            
                        inStream.pipe(outStream);
            
                        outStream.on('close', async () => {
                            await productController.addUpdateProduct({
                                image_url,
                                ...fields
                            });
                            res.json({
                                message: "success",
                                image_url
                            });
                        });
                    } else {
                        await productController.addUpdateProduct({
                            image_url,
                            ...fields
                        });
                        res.json({
                            message: "success",
                            image_url
                        });
                    }
            });
        } catch (error) {
            console.error("[addCart] Error : ", error);
            return res.status(420).json({
                message: "There was an error, Please try again"
            })
        }
    })

    router.get("/list", async (req, res) => {
        try {
            const users = await productController.getProductsList(req.query.id);
            return res.status(200).json({
                data: users
            })
        } catch (error) {
            console.error("[AddUpdateUser] Error : ", error);
            return res.status(420).json({
                message: "There was an error, Please try again"
            })
        }
    })
    return router;
}