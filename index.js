var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render("index.ejs");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
