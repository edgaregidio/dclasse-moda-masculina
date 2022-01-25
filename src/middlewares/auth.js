const auth = (req, res, next) => {
  const authHeader = req.headers.access;
  if (!authHeader || authHeader !== "862606f63fd08642df1d9679a86ea81d") {
    return res.json({ success: false, message: "Requisição não autorizada" });
  }
  return next();
};

module.exports = auth;
