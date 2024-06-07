const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

const THREAD_COUNT = 10;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This is non blocking code");
});

function createWorder() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-worker.js", {
      workerData: { thread_count: THREAD_COUNT },
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (error) => {
      reject(`An error occured ${error}`);
    });
  });
}

app.get("/blocking", async (req, res) => {
  const workerPromises = [];
  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorder());
  }
  try {
    const thread_results = await Promise.all(workerPromises);
    const total =
      thread_results[0] +
      thread_results[1] +
      thread_results[2] +
      thread_results[3] +
      thread_results[4] +
      thread_results[5] +
      thread_results[6] +
      thread_results[7] +
      thread_results[8] +
      thread_results[9];
    res.status(200).send(`result is ${total}`);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
