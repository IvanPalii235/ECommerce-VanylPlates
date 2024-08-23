require('dotenv').config()
const express = require('express')
const {connect} = require("mongoose");
const path = require("path");
const Router = require('./Routes/indexRoute')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorHandler = require('./MIddleware/ErrorHandlingMIddleware')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
))
app.use('/', Router)

app.use(errorHandler);

const start = async () => {
    try{
        await connect(process.env.DATA_BASE)
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}
start()