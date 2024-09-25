const cors = require("cors");

const corsOption = {
    origin : "*",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

module.exports = cors(corsOption);