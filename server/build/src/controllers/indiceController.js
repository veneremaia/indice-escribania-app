"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class IndiceController {
    index(req, res) {
        res.json('Indice andamo editado 2');
        database_1.default.query('DESCRIBE indice');
    }
}
const indiceController = new IndiceController();
exports.default = indiceController;
