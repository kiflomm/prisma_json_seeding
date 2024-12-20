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
const client_1 = require("@prisma/client");
const promises_1 = __importDefault(require("fs/promises"));
const prisma = new client_1.PrismaClient();
function importBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Read the JSON file
            const jsonData = yield promises_1.default.readFile('src/data_source/states.json', 'utf8');
            const data = JSON.parse(jsonData);
            for (const item of data) {
                yield prisma.state.create({
                    data: item
                });
                console.log(`Imported: ${item.name}`);
            }
        }
        catch (error) {
            console.error('Error importing books:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
importBooks();
