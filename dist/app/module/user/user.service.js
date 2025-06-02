"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Register User
const registerUserIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, shopNames } = data;
    // Check if username already exists
    const existingUser = yield user_model_1.default.findOne({ username });
    if (existingUser) {
        throw new Error("Username already taken");
    }
    // Check for unique shop names globally
    const existingShop = yield user_model_1.default.findOne({ shopNames: { $in: shopNames } });
    if (existingShop) {
        throw new Error("One or more shop names already taken");
    }
    //Hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = new user_model_1.default({
        username,
        password: hashedPassword,
        shopNames,
    });
    return yield user.save();
});
//Login User
const loginUserFromDB = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ username });
    if (!user) {
        throw new Error("Invalid username or password");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Incorrect password");
    }
    return user;
});
exports.UserServices = {
    registerUserIntoDB,
    loginUserFromDB,
};
