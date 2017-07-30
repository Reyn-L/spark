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

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});