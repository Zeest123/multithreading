const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This is non blocking code");
});

app.get("/blocking", async (req, res) => {
  //   let counter = 0;
  //   for (let i = 0; i < 20_000_000_000; i++) {
  //     counter++;
  //   }

  //   res.status(200).send(`result is ${counter}`);
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`result is ${data}`);
  });
  worker.on("error", (error) => {
    res.status(404).send(`An error occured ${error}`);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
