const express = require('express');
const hbs = require('hbs');
const fs = require ('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method}, ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Could not append to file');
        }
    })
    next();
})

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeHome:'Welcome to my home page',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
 res.send({
    error : 'Error creating request'
 });
});

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});