//npm install express
//npm install -g  nodemon --save-dev
const express = require('express')
const app = express()

const port = process.env.PORT || 8080;

// app.set('port', process.env.PORT || 8080);

//npm install cors
const cors = require('cors')
app.use(cors())

//npm install body-parser  -- to get data from body backend/ form in Json format
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json();


//Install mongoose for connectivity
const mongoose = require("mongoose")
//connection to database
mongoose.connect("mongodb+srv://root:root@cluster0.rjiuf.mongodb.net/saas?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    UseUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB connected!")
}).catch((err) =>{
    console.log(err)
})


// // app.get(route,callback)
app.get("/",(req,res)=>{
    res.send("Hii Backend server")
})

// app.get("/getData", function(req,res){
//     res.send("<h2>Hii Ankit, Samson</h2>")
// })

//model
let productModel = require("./model/productmodel")

//read Data - GET api
app.get("/getProduct",(req,res)=>{
    productModel.find().then((mdbData)=>{
        console.log(mdbData)
        res.send(mdbData)
    })
})


//search Data - GET api
app.get("/searchProduct/:prodname",(req,res)=>{
    productName = req.params.prodname
    productModel.findOne({PdtName : productName}).then((mdbData)=>{
        console.log(mdbData)
        res.send(mdbData)
    })
})


//search Data - GET api by Id
// app.get("/searchbyId/:id",(req,res)=>{
//     productModel.findOne({_id : req.params.id}).then((mdbData)=>{
//         console.log(mdbData)
//         res.send(mdbData)
//     })
// })

//Add data POST API  -- query
// app.post("/addDataProd",(req,res)=>{
//     let ProductData = new productModel({
//     _id: new mongoose.Types.ObjectId,
//     PdtName : req.query.prodName,
//     PdtPrice : req.query.prodPrice,
//     PdtQty : req.query.prodQty
//     })

//     ProductData.save().then((mdbData)=>{
//         console.log(mdbData)
//         res.send(mdbData)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })



//Add data POST API  -- body
app.post("/addProd",jsonParser,(req,res)=>{
    let ProductData = new productModel({
    _id: new mongoose.Types.ObjectId,
    PdtName : req.body.prodName,
    PdtPrice : req.body.prodPrice,
    PdtQty : req.body.prodQty
    })

    ProductData.save().then((mdbData)=>{
        console.log(mdbData)
        res.send(mdbData)
    }).catch((err)=>{
        console.log(err)
    })
})


//Update data PUT api
app.put("/updateProd/:id",jsonParser,(req,res)=>{
    productModel.updateOne({_id : req.params.id}
    ,{
        $set:{
            PdtName : req.body.prodName,
            PdtPrice : req.body.prodPrice,
            PdtQty : req.body.prodQty
        }}
        ).then((mdbData)=>{
        console.log(mdbData)
        res.send(mdbData)
    }).catch((err)=>{
        console.log(err)
    })
})



//delete api
app.delete("/deleteProduct/:prodName",(req,res)=>{
    productName = req.params.prodName
    productModel.deleteOne({PdtName : productName}).then((mdbData)=>{
        console.log(mdbData)
        res.send(`${productName} deleted from mongodb`)
    })
})

// //delete api
// app.delete("/findIdProduct/:id",(req,res)=>{
//    ObjectId = req.params.id
//    productModel.findByIdAndRemove({_id : ObjectId}).then((mdbData)=>{
//        console.log(mdbData)
//        res.send(" data deleted ")
//    })
// })


// //delete api query
// app.delete("/deleteProductQry",(req,res)=>{
//     productName = req.query.prodName
//     productModel.deleteOne({PdtName : productName}).then((mdbData)=>{
//         console.log(mdbData)
//         res.send(mdbData)
//     })
// })


app.listen(port, ()=>{
   console.log(`Server listening! on ${port}`)
})


// //Product routes
// let productsRoute = require("./routes/product")
// app.use("/prod",productsRoute)


// //Middleware --- it is functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.


// app.use("/getvalue",(req,res,next)=>{
//     console.log("Start api first")
//     next()
// })

// app.get("/getvalue",(req,res,next)=>{
//     res.send("Home page")
//     next()
// })

// app.use("/getvalue",(req,res)=>{
//     console.log("end api")
// })



// //delete data - using middleware & get api

// app.get("/searchProduct/:prodname",(req,res,next)=>{
//     productName = req.params.prodname
//     productModel.findOne({PdtName : productName}).then((mdbData)=>{
//         res.send(mdbData)
//         next()
//     })
// })

// //search Data - GET api
// app.get("/searchProduct/:prodname",(req,res)=>{
//     productName = req.params.prodname
//     productModel.deleteOne({PdtName : productName}).then((mdbData)=>{
//         console.log(mdbData)
//     })
// })

// //cookieParser
// //npm install -save cookie-parser
// const cookieParser = require("cookie-parser")
// app.use(cookieParser())

// app.get("/provideData",(req,res)=>{
//     res.cookie("saas","backend Project").send("cookie set")
// })



// app.listen(3000, ()=>{
//     console.log("Server listening!")
// })




// app.use("/",function(req, res, next){
//    console.log("A new request received at " + Date());
//    //This function call is very important. It tells that more processing is
//    //required for the current request and is in the next middleware
//    //function route handler.
//    next();
// });

// app.get("/",function(req, res){
//     res.send("Middleware");
//  });

// var express = require('express');
// var app = express();
// //Middleware function to log request protocol
// app.use('/things', function(req, res, next){
//     console.log("A request for things received at " + Date());
//     next();
//  });
 
//  // Route handler that sends the response
//  app.get('/things', function(req, res){
//     res.send('Things');
//  });
// app.listen(3000,()=>{
//     console.log("Server is running")
// });





//
// var express = require('express');
// var app = express();
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());

// //Create Session
// var session = require('express-session');
// app.use(session({secret: "Shh, its a secret!"}));

// app.get('/', function(req, res){
//    if(req.session.page_views){
//       req.session.page_views++;
//       res.send("You visited this page " + req.session.page_views + " times");
//    } else {
//       req.session.page_views = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });
// app.listen(3000,()=>{console.log("Server is running")});









//Mysql CRUD API

const mysql = require('mysql2');

const connect = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"SaasDb"
})



//GET API
app.get('/mysqlgetAPi', (req,res)=>{
    connect.query("select * from CustmerDetails order by 1",  (err, mysqlData)=>{
        if(!err){
            res.send(mysqlData)
            console.log(mysqlData)
            
        } else{
            res.send("404 data not found")
            console.log(err)
        }
    })
})

//post api
app.post('/addDatatoMysql', jsonParser, (req,res)=>{
    srNo = req.body.srno
    Name = req.body.name
    mobileNo = req.body.mobile
    address = req.body.address

    connect.query(`insert into CustmerDetails values(${srNo}, '${Name}', ${mobileNo}, '${address}')`, (err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            res.status(`404 data not found, ${err}`)
            console.log(err)
        }
    })
})


//put api
app.put('/updateMysql/:name',jsonParser,(req,res)=>{
    mobieNo = req.body.mobile
    Name = req.params.name

    connect.query(`update CustmerDetails set mobieNo=${mobieNo} where Name='${Name}'`, (err,Mysqldata)=>{
        if(!err){
            res.send(Mysqldata)
        }
        else{
            console.log(err)
        }
    })
})