const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 4000;

// 配置中间件（完全适配您的目录）
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname))); // 直接托管整个项目根目录

// 获取导航数据（直接读取根目录下的navData.json）
app.get('/navData.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'navData.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error');
    res.json(JSON.parse(data));
  });
});

// 保存导航数据（直接写入根目录下的navData.json）
app.post('/saveNavData', (req, res) => {
  fs.writeFile(
    path.join(__dirname, 'navData.json'),
    JSON.stringify(req.body, null, 2),
    'utf8',
    (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    }
  );
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});