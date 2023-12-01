const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  res.send(
    '<html><head><title>A simple chat application</title></head><body><form action="/test" method="POST"><input type="text" name="userName"><br><button type="submit">Submit</button></form></body></html>'
  );
});

app.post("/test", (req, res, next) => {
  const result = req.body;
  localStorage.setItem("name", result.userName);
  res.redirect("/");
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
