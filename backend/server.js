const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(fileUpload());

const PORT = process.env.PORT || 5000;

//Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file was uploaded" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(PORT, () =>
  console.log(`
server running on port ${PORT}`)
);
