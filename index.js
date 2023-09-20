const express = require("express");
const path = require("path");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

dbConnection();
app.use(cors());
app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.json());


app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/toppings", require("./routes/toppings.route"));
app.use("/api/pizzas", require("./routes/pizzas.route"));
app.use("/api/comandas", require("./routes/comandas.route"));
app.use("/api/users", require("./routes/user.route"));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
