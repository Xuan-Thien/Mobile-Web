const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

const authRoute = require('./routes/auth');
const phoneRoutes = require('./routes/phoneRoutes');

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/Phonedb', { useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('err', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database Connection Established');
})
// express app
const app = express();



// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public/'));
app.use('/uploads',express.static('uploads'));


app.use(express.urlencoded({ extended: true }));

// HTTP test
app.use(morgan('dev'));
app.use(express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


app.get('/about', (req, res) => {
    res.render('about',{title: 'About'});
});

app.use('/login',authRoute);

app.use('/',phoneRoutes);




// 404 page
app.use((req, res) => {
    res.status(404).render('404');
});