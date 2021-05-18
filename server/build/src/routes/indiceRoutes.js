"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indiceController_1 = __importDefault(require("../controllers/indiceController"));
class indiceRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indiceController_1.default.index);
    }
}
const indiceRoute = new indiceRoutes();
exports.default = indiceRoute.router;
