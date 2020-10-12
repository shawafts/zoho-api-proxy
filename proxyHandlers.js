const url = require("url");
let apiPath = "/api/v3/contacts";

module.exports = {
  proxyReqPathResolver: function (req) {
    const path = `${apiPath}${req.url}`;
    return url.parse(path).path;
  },
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    proxyReqOpts.headers[
      "Authorization"
    ] = `Zoho-authtoken ${process.env.AUTH_TOKEN}`;
    proxyReqOpts.method = "GET";
    delete proxyReqOpts.headers["origin"];
    return proxyReqOpts;
  },
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    try {
      let data = proxyResData.toString();
      data = JSON.parse(data);
      return JSON.stringify(data);
    } catch (error) {
      console.log("Error:", new Error(error));
      return JSON.stringify({
        contact: [],
        page_context: { has_more_pages: false },
      });
    }
  },
};
