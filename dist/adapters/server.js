"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongo_1 = __importDefault(require("../frameworks/database/mongo"));
var fileController_1 = require("../business/fileController");
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1.default)();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
var HOST = process.env.HOST;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
var allowedOrigins = [HOST]; // Protected, Only allowed for HOST
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// Connect to Database
(0, mongo_1.default)();
// Load environment variables
dotenv_1.default.config();
// Routes
app.post('/uploadfile', upload.single('file'), fileController_1.uploadFile);
// Start the server
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
