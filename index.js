const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const router = require("./routes");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
});

app.use(limiter);
app.set("trust proxy", 1);
app.use(express.static('public'))
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => console.log(`server is running on port:${PORT}`));
