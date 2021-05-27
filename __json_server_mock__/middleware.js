module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "dell" && req.body.password === "123456") {
      console.log("200");
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      console.log(400);
      return res.status(400).json({
        message: "用户名或者密码错误",
      });
    }
  }
  next();
};
