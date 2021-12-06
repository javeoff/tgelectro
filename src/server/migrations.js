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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var knex_1 = require("knex");
var categories_1 = require("../data/categories");
var fabricators_1 = require("../data/fabricators");
var products_1 = require("../data/products");
var knex = (0, knex_1["default"])({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'tglegard'
    }
});
var createCategoriesTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex.schema.createTable('categories', function (table) {
                    table.increments();
                    table.string('name');
                    table.string('link');
                    table.string('fabricators_id');
                })];
            case 1:
                _a.sent();
                mockCategories = categories_1.categories.map(function (category) { return ({
                    name: category.name,
                    link: category.link,
                    fabricators_id: category.fabricators.join(', ')
                }); });
                return [4 /*yield*/, knex.insert(mockCategories).into('categories')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createFabricatorsTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockFabricators;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex.schema.createTable('fabricators', function (table) {
                    table.increments();
                    table.string('name');
                    table.string('link');
                    table.string('image_url');
                    table.string('categories_id');
                })];
            case 1:
                _a.sent();
                mockFabricators = fabricators_1.fabricators.map(function (fabricator) { return ({
                    name: fabricator.name,
                    link: fabricator.link,
                    categories_id: fabricator.categories.join(', '),
                    image_url: fabricator.imageUrl
                }); });
                return [4 /*yield*/, knex.insert(mockFabricators).into('fabricators')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var createProductsTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mockProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, knex.schema.createTable('products', function (table) {
                    table.increments();
                    table.string('vendor');
                    table.string('alternative_vendor');
                    table.string('image_url');
                    table.string('description');
                    table.string('price');
                    table.string('category_id');
                    table.string('fabricator_id');
                })];
            case 1:
                _a.sent();
                mockProducts = products_1.products.map(function (product) { return ({
                    vendor: product.vendor,
                    description: product.description,
                    price: product.price,
                    category_id: product.categoryId,
                    fabricator_id: product.fabricatorId,
                    alternative_vendor: product.alternativeVendor,
                    image_url: product.imageUrl
                }); });
                return [4 /*yield*/, knex.insert(mockProducts).into('products')];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var migrationAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createCategoriesTable()];
            case 1:
                _a.sent();
                return [4 /*yield*/, createFabricatorsTable()];
            case 2:
                _a.sent();
                return [4 /*yield*/, createProductsTable()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
void migrationAll();
