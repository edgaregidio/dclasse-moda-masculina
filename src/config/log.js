const winston = require("winston");
const path = require("path");

const logContatos = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, "..", "logs", "contatos.txt"),
      level: "info",
    }),
  ],
});

const logCadastros = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, "..", "logs", "cadastros.txt"),
      level: "info",
    }),
  ],
});

const logNews = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.resolve(__dirname, "..", "logs", "news.txt"),
      level: "info",
    }),
  ],
});

module.exports = { logContatos, logCadastros, logNews };
