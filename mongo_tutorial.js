const mongoose = require("mongoose");

// 建立連線
const connConfig =
  "mongodb+srv://EvianChen:921208kk@toastmastersapp.cxdjq5u.mongodb.net/";
const conn = mongoose.createConnection(connConfig);

// 連線成功，觸發callback func
conn.on("connected", () => {
  console.log("mongo connected");
});

// 建立schema
const dramaSchema = new mongoose.Schema(
  {
    dramaId: String,
    category: String,
    name: String,
    score: Number,
  },
  {
    collection: "dramas-table",
  }
);

// 建立model(沒有該collection的話會自動建立，沒有資料的空collection的)
// 透過model和collection互動
const dramaModel = conn.model("Dramas", dramaSchema);

// 透過model進行CRUD操作
// Promise
// dramaModel
//   .find()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async / await
let main = async () => {
    try {
        let data = await dramaModel.find();  // 找全部  --> 用array的方式回傳
        let data2 = await dramaModel.find(
            { category: "政治"},  // 搜尋哪些欄位
            { category: 1, name: 1, score: 1, _id: 0}  // 要顯示哪些欄位
        );
        console.log(data2);
    } catch(err) {
        console.log(err);
    }
}

// main();

const memberData = [
    {name: "a", age: 20, math_score: 100},
    {name: "b", age: 25, math_score: 30}
];

const membersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    math_score: Number
}, {
    collection: "members",
    versionKey: false  // 移除 __v
});

const memberModel = conn.model("members", membersSchema);

// let insertMember = async () => {
//     try {
//         const res = await memberModel.insertMany(memberData);
//         console.log(res);
//     } catch(err) {
//         console.log(err);
//     }
// };

// insertMember();

let findMember = async () => {
    try {
        let data = await memberModel.findOne({  // --> 用aobject的形式回傳
            "math_score": { "$gte": 60 }
        });
        console.log(data);
    } catch(err) {
        console.log(err);
    };
};

findMember();