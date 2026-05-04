const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

app.get("/headers", (req, res) => {
    const headers = {
        userAgent: req.headers["user-agent"],
        accept: req.headers["accept"],
        contentEncoding: req.headers["content-encoding"] || "none",
        contentLanguage: req.headers["content-language"] || "none",
    };

    res.json({
        message: "Headers received",
        headers: headers,
    });
});

app.listen(port);