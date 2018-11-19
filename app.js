const express = require ('express'); 
const appConfig = require('./Config/appConfig')
let routePath = './app/Routes'
const fs = require('fs')
const app = express();
var path = require('path');
app.set('view engine','ejs')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname,'client')));

//bootstrap routes
fs.readdirSync(routePath).forEach(function(file)
{
    if(~file.indexOf('.js'))
    {
        console.log("include following file");
        console.log(routePath +'/'+file)
        let route = require(routePath+'/'+file)
        route.setRouter(app)
    }});

app.listen(appConfig.port,()=>console.log('app listening on port 3000'))



/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
  console.log('database connection error');
  console.log(err)
  logger.error(err,
    'mongoose connection on error handler', 10)
  //process.exit(1)
}); // end mongoose connection error

mongoose.connection.on('open', function (err) {
  if (err) {
    console.log("database error");
    console.log(err);
    logger.error(err, 'mongoose connection open handler', 10)
  } else {
    console.log("database connection open success");
    logger.info("database connection open",
      'database connection open handler', 10)
  }

}); 



module.exports = app;