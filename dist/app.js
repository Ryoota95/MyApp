"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const threads_1 = __importDefault(require("./routes/threads"));
const like_1 = __importDefault(require("./routes/like"));
const detail_1 = __importDefault(require("./routes/detail"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
require("./worker/image.worker");
const profile_1 = __importDefault(require("./routes/profile"));
const follow_1 = __importDefault(require("./routes/follow"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    },
});
exports.io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/auth", register_1.default);
app.use("/auth", login_1.default);
app.use("/auth", user_1.default);
app.use("/api", threads_1.default);
app.use("/auth", like_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/api", detail_1.default);
app.use("/api", profile_1.default);
app.use("/api/v1", follow_1.default);
const PORT = 3000;
server.listen(PORT, () => {
    console.log("server running");
});
