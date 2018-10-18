// Traversy video link https://youtu.be/5yTazHkDR4o
//poseban folder napraviti, pa onda u njemu npm init ...napraviti package.json
// onda   npm i express body-parser mongoose concurrently  instalirali pakete
//body-parser  pretvara iz bodya u json
//mongoose  povezuje sa bazom
//concurrently pokrece vise scripti
//zatim  npm i -D nodemon    da prati promene
// "scripts": {  -- ovo podesiti u package.json
 //   "start": "node server.js",
 //   "server":"nodemon server.js"

 //u mLabu   create new project  napravi se baya...pa onda Create User
 //  mongodb://<dbuser>:<dbpassword>@ds135413.mlab.com:35413/vesalica   url za konkeciju sa bazom  
 //srediti folder da mDb bude van react folder
 //napraviti  keys.js file u config folderu i tamo napraviti module ubaciti name i password u URI
 //configovati db varijablu
 //connect preko mongoose
 //config PORT
 // nodemon se pokrece sa  npm run server
 //folder models napraviti
 //napraviti file Items.js i unutar njega definisati mongoose model i Schemu
 //napraviti folder routes i unutar njega folder api
 //unutar api folder napraviti items.js 
 //unutar items napraviti router i routes za get post i delete
 //u server delu app package.json ubaciti "client" scriptu i "dev"

 
 const express=require('express');
 const mongoose=require('mongoose');
 const bodyParser=require('body-parser');

 const items =require('./routes/api/items');

 const app = express();

 //Bodyparser Middleware
 app.use(bodyParser.json());

 //DB Config
 const db = require('./config/keys').mongoURI;

 //Connect to Mongo
 mongoose.connect(db)
 .then(()=>console.log('mongo db connected'))
 .catch(err=>console.log(err));

 //Use routes
 app.use('/api/items',items);

 const port = process.env.PORT || 5000;

 app.listen(port,()=>console.log(`server started on port ${port}`));





 
