var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Helpers } from "../helpers";
class QuizService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    type: true,
                    message: 'All comments has been fetched',
                    data: []
                };
            }
            catch (error) {
                return Helpers.responseError(error);
            }
        });
    }
    static getById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                return {
                    type: true,
                    message: 'getById',
                    data: {}
                };
            }
            catch (error) {
                return Helpers.responseError(error);
            }
        });
    }
}
export default QuizService;
