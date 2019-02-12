const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const Product = require('./model/product')
// Multer Engiene
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `product-${Date.now()}${path.extname(file.originalname)}`)
    }
})

// Multer Init
const upload = multer({
    storage: storage
});

// App Initialization
const app = express();

// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// cross origin mioddleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next();
});

// multer middleware
app.use('/uploads', express.static('uploads'))

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome To Nodejs CRUD Rest api';
    res.json({
        title: title
    })
});

// Post product
app.post('/post-product', upload.single('productImage'), (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        productImage: `https://optisol.herokuapp.com/${req.file.path}`,
        productQuantity: req.body.productQuantity,
        productDescription: req.body.productDescription
    })

    product.save().then(data => {
        res.json({
            success: "Product Added Successfully"
        })
    }).catch(err => {
        res.json({
            error: "Something went Wrong"
        })

    })


})

// Get All Products
app.get('/get-all-products', (req, res) => {
    Product.find().then(data => {
        res.json({
            data: data
        })
    }).catch(err => {
        res.json({
            error: "Something went Wrong"
        })
    })
})

app.get('/get-all-products/:productCategory',(req,res)=>{
    Product.find().where('productCategory',req.params.productCategory).then(data=>{
        res.json({data:data})
    }).catch(err=>{
        res.json({
            error: "Something went Wrong"
        })
    })
        
    })


// Using port 5000 or environmental port
const port = process.env.PORT || 5000;


// Starting server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});