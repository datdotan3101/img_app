import express from "express";
import { handleError } from "./common/helpers/handle-error.helper";

const app = express();

app.use(express.json());

app.use(handleError);

app.listen(3069, () => {
  console.log("Localhost on port: http://localhost:3069");
});
