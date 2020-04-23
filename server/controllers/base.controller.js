const dbHelper = require('./../helpers/db.helper');
const bCrypt     = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('./../config')

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

var isValidPassword = (oldPassword, newpassword) => {
    return bCrypt.compareSync(newpassword, oldPassword);
}

class BaseController {
    loginUser(data) {
        return new Promise(async (resolve, reject) => {
            const user = await dbHelper.getDbData("users", {
                email: data.email.toLowerCase().trim()
            })
            if(user && user.length) {
                const founduser = user[0];
                if(isValidPassword(founduser.password, data.password)) {
                    founduser.token = jwt.sign(founduser, JWT_KEY, { expiresIn: 60 * 60 * 2 });
                    delete founduser.password; 
                    return resolve(founduser)
                }
            }
            return reject({
                status: 420,
                message: "Please check your username and password"
            })
        })
    } 

    registerUser(data) {
        return new Promise(async (resolve, reject) => {
            const user = await dbHelper.getDbData("users", {
                email: data.email.toLowerCase().trim()
            });
            if(user && user.length) {
                return reject({
                    status: 420,
                    message: "Email is been already registered"
                }) 
            };
            data.password = createHash(data.password);
            data.email = data.email.toLowerCase().trim();
            await dbHelper.inserDbData("users", data);
            return resolve()
        })
    } 

    getUserDataByUserEmail(email) {
        return new Promise(async (resolve, reject) => {
            if(email) {
                const user = await dbHelper.getDbData("users", {
                    email: email.toLowerCase().trim()
                });
                const userProducts = await dbHelper.getDbData("users-products", {
                    email: email.toLowerCase().trim()
                });
                delete user[0].password
                return resolve({
                    user: user[0],
                    userProducts
                })
            }
            return reject({
                status: 401,
                message: "Unaithorised Entry"
            }) 
        })
    }
}

module.exports = new BaseController()