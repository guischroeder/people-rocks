"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldController = exports.app = void 0;
const express_1 = require("@decorators/express");
const express_2 = __importDefault(require("express"));
exports.app = express_2.default();
let HelloWorldController = class HelloWorldController {
    sayHello(res) {
        res.send('Hello World');
    }
};
__decorate([
    express_1.Get('/'),
    __param(0, express_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HelloWorldController.prototype, "sayHello", null);
HelloWorldController = __decorate([
    express_1.Controller('/')
], HelloWorldController);
exports.HelloWorldController = HelloWorldController;
express_1.attachControllers(exports.app, [HelloWorldController]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFLNkI7QUFDN0Isc0RBQThCO0FBRWpCLFFBQUEsR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUc3QixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUV4QixRQUFRLENBQWEsR0FBcUI7UUFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsYUFBRyxDQUFDLEdBQUcsQ0FBQztJQUNRLFdBQUEsa0JBQVEsRUFBRSxDQUFBOzs7O29EQUUxQjtBQUpVLG9CQUFvQjtJQURoQyxvQkFBVSxDQUFDLEdBQUcsQ0FBQztHQUNILG9CQUFvQixDQUtoQztBQUxZLG9EQUFvQjtBQU9qQywyQkFBaUIsQ0FBQyxXQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMifQ==