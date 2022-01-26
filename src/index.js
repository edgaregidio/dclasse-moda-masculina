const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const MailController = require("./controllers/MailController");
const authMiddleware = require("./middlewares/auth");

if (!fs.existsSync(path.resolve(__dirname, "logs")))
  fs.mkdirSync(path.resolve(__dirname, "logs"));

const app = express();

app.use(cors());
app.use(express.json());

const routes = express.Router();
routes.use("/", express.static(path.resolve("public")));
routes.use("/", express.static(path.resolve(__dirname + "/public")));
routes.post("/api/news", authMiddleware, (req, res) =>
  MailController.news(req, res)
);
routes.post("/api/contact", authMiddleware, (req, res) =>
  MailController.contact(req, res)
);
routes.post("/api/registerpf", authMiddleware, (req, res) =>
  MailController.registerPF(req, res)
);
routes.post("/api/registerpj", authMiddleware, (req, res) =>
  MailController.registerPJ(req, res)
);

app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(21252 || 3000, () => console.log("Server Running"));
