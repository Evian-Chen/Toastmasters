// 檢查參數存在
let isTokenExist = (req, res, next) => {
  if (!req.headers["x-jeff-token"]) {
    console.log("token not found");
    res.status(400).json({ message: "tokne not found" });
  } else {
    next();
  }
};

// 檢查參數型別正確
let isTokenValid = (req, res, next) => {
  if (req.headers["x-jeff-token"] !== "APTX4869") {
    console.log("沒有權限");
    res.status(403).json({ message: "你沒有權限" });
  } else {
    next();
  }
};

module.exports = {
  isTokenExist: isTokenExist,
  isTokenValid: isTokenValid,
};
