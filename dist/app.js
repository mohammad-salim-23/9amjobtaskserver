"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./app/routers"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
    ],
    credentials: true
}));
app.use('/api', routers_1.default);
app.get('/', (req, res) => {
    res.send({ message: 'Alhamdulilah Server is running....' });
});
// app.use(globalErrorHandler)
exports.default = app;
