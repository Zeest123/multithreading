const { workerData, parentPort } = require("worker_threads");

let counter = 0;
for (let i = 0; i < 20_000_000_000 / workerData.thread_count; i++) {
  counter++;
}

//to communicate with the main thread
parentPort.postMessage(counter);
