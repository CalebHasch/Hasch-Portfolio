var express = require('express');
var path = require('path');
var { projects } = require('./data/data.json');

var app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.locals = projects.data
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about', { projects });
});

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects.find( ({ id }) => id === +projectId );
    
    if (project) {
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
});
  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});