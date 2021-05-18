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
const database_1 = __importDefault(require("../database"));
class IndiceController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const indices = yield database_1.default.query('SELECT * FROM indice');
            res.json(indices);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const indice = yield database_1.default.query('SELECT * FROM indice WHERE id=?', [id]);
            if (indice.length > 0)
                return res.json(indice[0]);
            res.status(404).json({ text: 'El indice no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO indice set?', [req.body]);
            res.json({ message: 'Indice guardado con exito' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM indice WHERE id = ?', [id]);
            res.json({ message: 'El inidice con id ' + id + ' fue eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE indice set ? WHERE id=?', [req.body, id]);
            res.json({ message: 'El inidice con id ' + id + ' fue actualizado' });
        });
    }
}
const indiceController = new IndiceController();
exports.default = indiceController;
