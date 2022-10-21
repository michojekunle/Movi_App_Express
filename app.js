const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer()

const routes = require('./routes')

app.set('view engine', 'pug');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(upload.array())
app.use('/', routes)




app.listen(3004, () => {
    console.log('Server is Listening on Port 3004')
})