const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.use(express.static('./public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const routes = require('./routes/');
app.use('/', routes);

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(8080, () => {
  console.log(`listening on PORT: ${PORT}`);
});