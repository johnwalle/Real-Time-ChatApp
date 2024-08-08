const { connect } = require('mongoose')
require('dotenv').config()


const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI)
        console.log(`MONGODB CONNECTED`.america)
    } catch (error) {
        console.error(error, 'Connection failed.'.red)
    }

}


module.exports = connectDB