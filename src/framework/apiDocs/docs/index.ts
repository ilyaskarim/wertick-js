import { IDocServerConfiguration } from "./../../types/configuration";
import express from "express";
import path from "path";
const port = 5200;
const app = express();
import { get } from "lodash";
import { successMessage } from "../../logger/consoleMessages";

export default function(options: IDocServerConfiguration, cb: Function) {
  const { configuration } = options;
  const port = get(options, "port", 5200);
  app.use(express.static("index"));
  app.use(express.static(path.join(__dirname, "/content")));
  app.use(async function(req, res, next) {
    const ip = req.connection.remoteAddress;
    next();
  });
  app.get("/", function(req, res) {
    res.sendFile("./index.html", { root: __dirname });
  });
  app.listen(port, function() {
    successMessage(`Rest API docs running at`,`http://localhost:${port}/`)
    cb();
  });
}
