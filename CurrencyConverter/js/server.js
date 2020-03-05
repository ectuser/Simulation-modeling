"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3000;
var router_1 = require("./router");
var userData_1 = require("./userData");
app.set("view engine", "ejs");
var userData = new userData_1.UserData();
var router = new router_1.Router(app, userData);
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
