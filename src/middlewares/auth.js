import LogController from '../controllers/LogController';
import 'dotenv/config';

const auth = (req, res, next) => {
  const authHeader = req.headers.access;
  if (!authHeader || authHeader !== process.env.KEY_ACCESS) {
    LogController.log('Unauthorized request');
    return res.json({ success: false, message: 'Requisição não autorizada' });
  }
  return next();
}

export default auth