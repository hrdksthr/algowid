const dbHelper = require('../helpers/db.helper');
class ProductsController {
    getProductsList(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await dbHelper.getDbData("users-products", {
                    user_id: id
                });
                const category = await dbHelper.getDbData("products-cat", {});
                return resolve({
                    products,
                    category,
                })
            } catch (error) {
                console.error("[getProductsList] Error : ", error)
                return reject(error);
            }
        })
    }

    addUpdateProduct(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (data._id) {
                    const products = await dbHelper.getDbData("users-products", {
                        _id: data._id
                    });
                    if (products && products.length) {
                        const product = {
                            ...products[0]
                        };
                        product.prod_name = data.prod_name;
                        product.price = data.price;
                        product.categoty = data.categoty;
                        product.image_url = data.image_url;
                        await dbHelper.updateDbData("users-products", data._id, product);
                        return resolve(data.id)
                    }
                }
                await dbHelper.inserDbData("users-products", data);
                return resolve(data.id)
            } catch (error) {
                console.error("[getUsersList] Error : ", error)
                return reject(error);
            }
        })
    }


}

module.exports = new ProductsController();