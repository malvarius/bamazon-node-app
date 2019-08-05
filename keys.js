require('dotenv').config()
var keys = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pw: process.env.PW
}
module.exports= keys;