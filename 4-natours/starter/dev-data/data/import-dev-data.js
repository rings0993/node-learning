const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 導入預先設定好的Schema Model
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

// 指出 Config.env 檔案位置
dotenv.config({ path: `${__dirname}/../../config.env` });

// 宣告DB為 ALTAS 提供的位置，並替換掉密碼，CONFIG 內設置如下:
// DATABASE = mongodb+srv://vay:<DATABASE_PASSWORD>@cluster0.14c9bfp.mongodb.net/natours?retryWrites=true&w=majority
// DATABASE_PASSWORD = VpapIpDFZmQmvayf

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// 使用mongoose.connect 設定連線，傳入DB設定
const mongooseConnection = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log('DB connection successful');
  });

// Read JSON File後使用JSON.parse轉為JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf8')
);

const importData = async () => {
  try {
    // 呼叫先前設定好的DB連線
    await mongooseConnection;

    // 使用Model.create()即可一次導入所有資料
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');

    // 要使用process.exit()才會在執行完後退出
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    // 呼叫先前設定好的DB連線
    await mongooseConnection;

    // 使用Model.create()即可一次刪除所有資料
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// console.log(process.argv) 可以先看在甚麼順序輸入 argument;
// 使用process.argv[] 即可以在 COMMAND LINE中操作資料庫導入如: node file.js --import
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
