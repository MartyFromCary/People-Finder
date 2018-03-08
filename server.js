const app = require("express")();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routing/htmlRoutes")(app);
require("./routing/apiRoutes")(app);

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
