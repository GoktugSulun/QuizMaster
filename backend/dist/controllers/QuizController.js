var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QuizService } from "../services";
import { Helpers } from "../helpers";
class QuizController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield QuizService.getAll();
                Helpers.responseJSON(res, result);
            }
            catch (error) {
                if (error instanceof Error) {
                    Helpers.responseMessage(res, false, error.message);
                }
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield QuizService.getById(req);
                Helpers.responseJSON(res, result);
            }
            catch (error) {
                if (error instanceof Error) {
                    Helpers.responseMessage(res, false, error.message);
                }
            }
        });
    }
}
export default QuizController;
