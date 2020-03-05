import express from 'express';
const app : express.Application = express()
const port = 3000
import { Router } from './router';
import { UserData } from './userData';

app.set("view engine", "ejs");

let userData = new UserData();

let router = new Router(app, userData);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))