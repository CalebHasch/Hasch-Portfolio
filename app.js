// require dependencies
var express = require('express');
var path = require('path');
var { projects } = require('./data/data.json');

var app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

// render home page
app.get('/', (req, res) => {
    res.locals = projects.data
    res.render('index', { projects });
});

// render about page
app.get('/about', (req, res) => {
    res.render('about', { projects });
});

// dynamicallyn render project pages
app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
});

// error handler
app.use((req, res, next) => {
        // Log statement to indicate that this function is running 
        console.log('Handling 404 error');
      
        // Create new error to handle non-existent routes
        const err = new Error('err');
        err.status = 404;
        err.message = 'Uh oh, this is not the page you\'re looking for.';
      
        // Pass error to global error handler below
        next(err);
});

// renders error.pug
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});