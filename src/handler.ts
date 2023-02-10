import express, { Express, Request, Response } from "express";
import serverless from "serverless-http";
import { client } from './libs/os-client';

const app: Express = express();

app.use(express.json());

app.get("/test", async function (req: Request, res: Response) {
  try {
    // Create an index.
    const index_name = "cruises";

    /* let response = await client.indices.create({
        index: index_name,
    });

    console.log("Creating index:");
    console.log(response.body); */

    // Add a document to the index.
    const document = {
        "title": "Moneyball",
        "director": "Bennett Miller",
        "year": "2011"
    };

    const response = await client.index({
        index: index_name,
        body: document
    });
    console.log(response.body);

    return res.status(200).json({
      message: JSON.stringify(response.body),
    });

  } catch (error) {
    console.error(JSON.stringify(error));
    return res.status(500).json({
      message: "error check logs",
    });
  }
});

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);