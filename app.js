const express       = require('express');
const cors          = require('cors');
const app           = express();
const bodyParser    = require('body-parser');
const session       =require('express-session');
const flash         =require('express-flash');
const bcrypt        =require('bcrypt')
const mongoose      = require('mongoose');
const port          = process.env.PORT || 3000;
const {mongoURI}    = require('./config/keys');
const expHbs        = require('express-handlebars');
const path          = require('path')
const User          =require('./models/user');
const passport      = require('passport');
const init          =require('./config/passport');
init(passport)

// =====================Database for online===============

// DB Connection
async function connection(){
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        })
        console.log('mongoDB Connected')
    } catch (error) {
        console.log(error)
    }
}
connection()
// =====================Database for offline===============
// DB Connections
// const url = 'mongodb://localhost/posbyme';
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify:false
// })
// const db = mongoose.connection
// db.on('error', (err) => {
//     console.log(err)
// })
// db.once('open', () => {
//     console.log('MongoDB Connected!')
// })

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// handlebars
app.engine('hbs',expHbs({defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs')

// Authentication Middlewares
app.use(session({
    secret:'mysecret',
    saveUninitialized:true,
    resave:false
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());







app.post('/authenticate',passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/',
    failureFlash:true
}))

app.post('/user/add',async(req,res)=>{
    let {name,username,password}=req.body;
    let hash=await bcrypt.hash(password, 10)
    try {
        let user=await new User({
            name,
            username,
            password: hash
        }).save()
        res.json(user)
    } catch (error) {
       res.status(500).send(error) 
    }
})
app.get('/user/logout',(req,res)=>{
    req.logout();
    res.redirect('/')
})











// Routes
app.use('/', require('./routes/index'))
app.use('/api/product', require('./routes/product'));
app.use('/api/vendor', require('./routes/vendor'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/bank', require('./routes/bank'));
app.use('/api/bank-histry',require('./routes/bankTransHis'));
app.use('/api/cash',require('./routes/cash'));
app.use('/api/cat',require('./routes/category'));
app.use('/api/purcs-nvc',require('./routes/purchaseInvioce'));
app.use('/api/pur-stock-his',require('./routes/purchaseStockHis'));
app.use('/api/sales-histry',require('./routes/salesHistory'))

// server init
app.listen(port, console.log(`server running on port ${port}`))