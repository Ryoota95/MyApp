import { Worker } from "bullmq";
import  IORedis from "ioredis";

const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    maxRetriesPerRequest: null,
});

new Worker("image-processing", async (job) => {
    console.log("processing bruh", job.data);

    await new Promise((res) => setTimeout(res, 2000));

    console.log("done", job.data.threadId);
    
    
}, {connection} )