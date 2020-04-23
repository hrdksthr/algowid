const dbHelper = require('./../helpers/db.helper');

const MainProductsCategory = [
    {
        id: 1,
        cat_name: "Sports"
    },
    {
        id: 2,
        cat_name: "Fruits"
    },
    {
        id: 3,
        cat_name: "Travel"
    },
    {
        id: 4,
        cat_name: "Vehicle"
    },
    {
        id: 5,
        cat_name: "cat 1"
    }
]

const insertProducts = async () => {
    const products = await dbHelper.getDbData("products-cat", {});
    for (let index = 0; index < MainProductsCategory.length; index++) {
        const product = MainProductsCategory[index];
        if(product && product.id) {
            const foundProduct = products.find(obj => obj.id === product.id);
            if(!foundProduct) {
                await dbHelper.inserDbData("products-cat", product);
            }
        }
    }
}

module.exports = insertProducts