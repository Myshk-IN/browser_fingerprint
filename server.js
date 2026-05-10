const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.static('public'));

app.get("/headers", (req, res) => {
    const headers = {
        userAgent: req.headers["user-agent"],
        accept: req.headers["accept"],
        acceptEncoding: req.headers["accept-encoding"],
        acceptLanguage: req.headers["accept-language"],
    };

    res.json({
        message: "Headers received",
        headers: headers,
    });
});

app.listen(port);