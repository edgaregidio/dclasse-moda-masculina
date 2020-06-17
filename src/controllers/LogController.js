import path from 'path';
import fs from 'fs';

class LogController {

  constructor() {
    if (!fs.existsSync(path.resolve(__dirname, "..", "logs"))) fs.mkdirSync(path.resolve(__dirname, "..", "logs"));
  }

  logRequest(req, res, next) {
    this.log('==================================== NEW REQUEST ================================');
    this.log(`IP: ${req.ip} || Method: ${req.method} || URL: ${req.url}`);
    this.log('Headers: ' + req.headers['user-agent']);
    this.log('Body: ' + JSON.stringify(req.body));
    return next();
  }
  log(text) {
    const date = new Date().toLocaleDateString('pt-BR').split('-').reverse().join('/');
    const time = new Date().toLocaleTimeString('pt-BR');
    console.log(`${date} ${time} :: ${text}`)
    fs.writeFile(
      path.resolve(__dirname, "..", "logs", `log_${date.split("/").join("-")}.txt`),
      `${date} ${time} :: ${text}\n`,
      { enconding: 'utf-8', flag: 'a' },
      (err) => err ? console.log(`${date} ${time} :: Error in logging files: ${err.toString()}\n`) : null
    )
  }
}

export default new LogController()