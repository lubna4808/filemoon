const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  try {
    console.log("process.env.JWT_SECRET",process.env.JWT_SECRET)
    const payload = await jwt.verify(req.body.token, process.env.JWT_SECRET)
    res.status(200).json(payload)
  
} catch (err) {
    res.status(401).json({ message: "invalid token gfdfsv" })
  }
};
module.exports = {
  verifyToken
}
