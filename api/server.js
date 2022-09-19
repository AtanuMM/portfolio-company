"use strict";
// require('rootpath')();
require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

const PORT = parseInt(process.env.APP_PORT) || 8081;

if (process.env.APP_SECURE == "true") {
	var options = {
		key: fs.readFileSync(process.env.SSLKEY),
		cert: fs.readFileSync(process.env.SSLPEM),
		ca: fs.readFileSync(process.env.SSLCA),
		requestCert: true,
		rejectUnauthorized: false,
	};
	var server = require("https").createServer(options, app);
	server
		.listen(PORT)
		.on("error", (err) => {
			console.log("\x1b[31m%s\x1b[0m", "✘ Application failed to start");
			console.error("\x1b[31m%s\x1b[0m", "✘", err.message);
			process.exit(0);
		})
		.on("listening", () => {
			console.log("\x1b[32m%s\x1b[0m", `✔ Application Started at ${PORT}`);
		});
} else {
	var server = require("http").createServer(app);
	server
		.listen(PORT)
		.on("error", (err) => {
			console.log("\x1b[31m%s\x1b[0m", "✘ Application failed to start");
			console.error("\x1b[31m%s\x1b[0m", "✘", err.message);
			process.exit(0);
		})
		.on("listening", () => {
			console.log("\x1b[32m%s\x1b[0m", `✔ Application Started at ${PORT}`);
		});
}