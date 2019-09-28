const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const cookieSession = require('cookie-session');

const app = express();

mongoose.connect('mongodb://localhost:27017/myusers-dev',{useNewUrlParser: true})
.then(data=>console.log('Database is running fine'))
.catch(err=>console.log(err));

require('./Schema/Schema');
const User = mongoose.model('appusers');

require('./Schema/FuncSchema');
const Note = mongoose.model('functionality');

app.set('view engine', 'ejs');
  
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieSession({
    name:'session',
    keys: ['key1'],
}));
 
// app.use(function(req, res, next) {
//     res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
//     next();
//   });

app.get('/', (req, res)=>{
    let username = req.session.username;
    
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render('index.ejs', {username});
});
 
app.post('/addnote', (req, res)=>{
    const newnote = {
        author: req.session.username,
        title: req.body.title,
        note: req.body.text
    };
    new Note(newnote).save();
    res.json(newnote);
});

app.get('/getnotes', (req, res)=>{
    Note.find({author: req.session.username}, 'title note', (err, docs)=>{
        res.json(docs);
    });
});

app.post('/logout', (req, res)=>{
    if(req.body.logout){
         req.session.username = null;
         let username = req.session.username;
         res.render('index.ejs', {username});
     }
});

app.get('/try', (req, res)=>{
    res.render('about.ejs', {title: 'this is about page'});
});

app.get('/user/:id', (req, res)=>{
    console.log(req.params.id);
    res.render('index');
});

app.get('/porn', (req,res)=>{
    res.send('https://javfor.me/video/130154/HMPD-010038.html');
});

app.get('/register', (req,res)=>{
    res.render('register');
});

app.post('/register', (req,res)=>{
    if(req.body.password===req.body.confirmpassword){
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                };
                new User(newUser).save();
            });
        });
        res.redirect('/login');
    }
    else{
        res.redirect('/register');
    }
    
});

app.get('/login', (req,res)=>{
    res.render('login');
}); 

app.post('/login', (req, res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        // console.log(user);
        // Load hash from your password DB.
        bcrypt.compare(req.body.password, user.password, function(err, correct){
            if(correct){
                user.isLoggedIn = true;
                req.session.username = user.email;
                res.redirect('/');
            }
            else{
                res.send('Password incorrect');
            }
        });
    })
    .catch(err=>{
        console.log('User doesn\'t exist');
        res.send('User not found');
    });
});

app.listen(3000, (req,res)=>{
    console.log('server is running on port 3000');
});