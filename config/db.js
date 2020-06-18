const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURL')

const connectMongoDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB is connected')

    } catch (error) {
        console.log(error.message)
    }

}

module.exports = connectMongoDB