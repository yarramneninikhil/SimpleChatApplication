const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.get("/login", (req, res) => {
  res.send(`
  <html><head><title>A simple chat application</title></head><body>
  <form action="/login-page" method="POST"
  onsubmit="localStorage.setItem('userName',document.getElementById('userName').value)">
  <input type="text" name="userName" id="userName">
  <button type="submit">Submit</button>
  </form>
  </body></html>
  `);
});

app.post("/login-page", (req, res) => {
  res.redirect("/");
});
app.get("/", (req, res) => {
  let data = "";
  const readStream = fs.createReadStream("sample.txt");
  readStream.on("data", (chunk) => {
    data += chunk;
  });
  readStream.on("end", () => {
    if (data) {
      res.send(`
     <html><head><title>A simple chat application</title></head><body>
    <h1>${data}</h1>
    <form action="/sample.txt" method="POST"
    onsubmit="document.getElementById('userName').value=localStorage.getItem('userName')">
    <input type="text" name="message">
    <input type="hidden" name="userName" id="userName">
    <button type="submit">Submit</button>
    </form>
    </body></html>
     `);
    } else {
      res.send(`
      <html><head><title>A simple chat application</title></head><body>
      <h4>No chats available</h4>
      <form action="/sample.txt" method="POST"
      onsubmit="document.getElementById('userName').value=localStorage.getItem('userName')">
      <input type="text" name="message">
      <input type="hidden" name="userName" id="userName">
      <button type="submit">Submit</button>
      </form>
      </body></html>
      `);
    }
  });
});

app.post("/sample.txt", (req, res) => {
  const { message, userName } = req.body;
  fs.appendFile("sample.txt", " " + userName + ":" + message, (er) => {
    console.log(er);
  });
  res.redirect("/");
});

app.listen(3002, () => {
  console.log("server is listioning on port 3002");
});
