// 檢查參數存在
let isTokenExist = (req, res, next) => {
  if (!req.headers["x-jeff-token"]) {
    console.log("token not found");
    console.log(req.headers["x-jeff-token"]);
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

let isAccoutExists = (req, res, next) => {
  if (!req.body.account || !req.body.password) {
    res.status(400).json({ message: "帳號或密碼缺少" });
  } else {
    next();
  };
};

let isUserValid = (req, res, next) => {
  if (!(req.body.account === "Evian" && req.body.password === "1111")) {
    res.status(400).json({ message: "帳號密碼錯誤" });
  } else {
    next();
  };
};

let setSessionInfo = (req, res, next) => {
  
}

module.exports = {
  "isTokenExist": isTokenExist,
  "isTokenValid": isTokenValid,
  "isAccoutExists": isAccoutExists,
  "isUserValid": isUserValid
};
