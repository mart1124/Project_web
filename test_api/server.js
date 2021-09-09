const express = require('express');
const app = express();
const db = require('./src/models');
const uploadCon = require('./src/controllers/uploadCon');
const upload = require('./src/middleware/upload');
const path = require('path')

const steram = require('./src/routes/stream');
const filter = require('./src/routes/sorting');
const userRoutes = require('./src/routes/userRoutes');
const home = require('./src/routes/home');

global.__basedir = __dirname;

app.set('views', path.join(__basedir + '/src/', 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app.disable('etag');
app.post("/api/upload", upload.single('file'), uploadCon.uploadFiles);
app.use("/api/stream", steram);
app.use("/api", filter);
app.use("/api", userRoutes);
app.use("/", home);

let port = 3001;

db.sequelize.sync();

app.listen(port, () => {
    console.log('server is running on port: http://localhost:%s ', port);
});









































// const express = require('express');
// const router = express.Router();
// const multer = require('multer')
// const fs = require('fs')
// const url = require("url");
// const path = require('path');


// const port = process.env.PORT || 3000;
// const app = express();

// const fileStorageEngine =  multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./resources/upload");
//     },
//     filename: function (ctx, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const limits = {
//     fields: 10,
//     fileSize: 1980 * 1024,
//     files: 1
// };

// const upload =  multer({ storage: fileStorageEngine});

// app.post("/upload", upload.single('file'), (req,res) => {
//     var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
//     console.log(req.file)
//     res.json({
//         massage: "OK",
//         statusCode: 200,
//         data: {
//             url: fullUrl + "/" + req.file.filename
//         }
//     });
// });

// app.get("/upload/*", function (req, res){
//     const videopath = path.resolve(__dirname,req.url)
//     console.log(videopath)
//     const stat = fs.statSync(videopath)
//     const fileSize = stat.size
//     const range = req.headers
//     console.log(range)
//     if (range) {
//         console.log("เข้า")
//         const parts = range.replace(/bytes=/, "").split("-")
//         // const start = parseInt(parts[0], 10)
//         // const end = parts[1] 
//         // ? parseInt(parts[1], 10)
//         // : fileSize-1
//         // const chunksize = (end-start)+1
//         // const file = fs.createReadStream(path, {start, end})
//         // const head = {
//         // 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//         // 'Accept-Ranges': 'bytes',
//         // 'Content-Length': chunksize,
//         // 'Content-Type': 'video/mp4',
//         // }
//         // res.writeHead(206, head);
//         // file.pipe(res);
//     } else {
//         const head = {
//         'Content-Length': fileSize,
//         'Content-Type': 'video/mp4',
//         }
//         // res.writeHead(200, head)
//         // fs.createReadStream(path).pipe(res)
//     }
// })

// app.listen(port, () => {
//     console.log('server is running on port: http://localhost:%s ', port);
//   });