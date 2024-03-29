const url = require('url')
const express = require("express");
const needle = require("needle");
const apiCache = require('apicache')
const router = express.Router();
require("dotenv").config();
const { API_BASE_URL, API_KEY_NAME, API_KEY_VALUE } = process.env;

//init cache
let cache = apiCache.middleware

router.get("/",cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url,true).query
    });
    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    if(process.env.NODE_ENV !== 'production'){
        console.log(`REQUEST:${API_BASE_URL}?${params}`);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
