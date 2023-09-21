const mongoose = require('mongoose')

const connectToDatabase = () => {
    mongoose
            .connect('mongodb://0.0.0.0/e-commerce')
            .then((conn) => console.log(`connected to db ${conn.connection.host}`))
            .catch((err) => console.log(err.message))
}

module.exports = connectToDatabase;