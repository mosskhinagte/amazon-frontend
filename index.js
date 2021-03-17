import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import GridFsStorage from 'multer-gridfs-storage';
import multer from 'multer';
//import { Grid } from 'gridfs-stream';




dotenv.config();

//Grid.mongo = mongoose.mongo

//app config
const app = express();






//Middleware
app.use(bodyParser.json());
app.use(cors())
const port = process.env.PORT || 5000;



/////////////////////////////////////////////////
//1
//DB CONFIG
const mongoURI = "mongodb+srv://moss:8253965814@cluster0.zib8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('MongoDB Connected...'))
.catch (err => console.log(err));


//let gfs

//conn.once('open', () => {
//console.log('DB Connected')

//gfs = Grid(conn.db, mongoose.mongo)
//gfs.collection('images')
//})


//const storage = new GridFsStorage({
//url: mongoURI,
// file: (req, file) => {
// return new Promise((resolve, reject) => {
//const filename = `image-${Data.now()}${path.extname(file.originalname)}`

//const fileInfo = {
//filename: filename,
// bucketName: 'images'
//};

// resolve(fileInfo);
// })
//}
//})

//const upload = multer({ storage });




mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

///////////////////////////////////////////////////////




//TO CHECK IN POSTMAN THE MEMENTION ALSO NEED
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//2
//TO CONNECT MONGODB
//mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon', {
//useNewUrlParser: true,
//useUnifiedTopology: true,
//useCreateIndex: true,
//});


//3

//db config
//const connect = mongoose.connect("mongodb+srv://moss:8253965814@cluster0.zib8g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
// { useNewUrlParser: true, useUnifiedTopology: true })
//.then(() => console.log('MongoDB Connected...'))
//.catch(err => console.log(err));





//connet router
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})




app.get('/', (req, res) => {
    res.send('/Server is ready');
});


// upload images

//app.post('/upload/image', upload.single('file'), (req, res) => {
//res.status(201).send(req, file)
//})




app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});




app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
})