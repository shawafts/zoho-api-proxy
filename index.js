require("dotenv").config();
const proxy = require("express-http-proxy");
const app = require("express")();
const cors = require("cors");
const ProxyHandlers = require("./proxyHandlers");

let apiUrl = "https://books.zoho.com/";

app.use(cors());
app.use("/proxy", proxy(apiUrl, ProxyHandlers));

const port = process.env.PORT || 7000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
