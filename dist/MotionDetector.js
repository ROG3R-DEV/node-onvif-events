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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotionDetector = void 0;
const onvif_1 = require("onvif");
const TOPIC = /RuleEngine\/CellMotionDetector\/Motion$/;
class MotionDetector {
    constructor(cam, id) {
        this.cam = cam;
        this.id = id;
        this.lastIsMotion = false;
    }
    static create(id, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const cam = new onvif_1.Cam(options, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const monitor = new MotionDetector(cam, id);
                        resolve(monitor);
                    }
                });
            });
        });
    }
    listen(onMotion) {
        this.cam.on('event', (message) => {
            var _a, _b;
            if ((_b = (_a = message === null || message === void 0 ? void 0 : message.topic) === null || _a === void 0 ? void 0 : _a._) === null || _b === void 0 ? void 0 : _b.match(TOPIC)) {
                const motion = message.message.message.data.simpleItem.$.Value;
                if (motion !== this.lastIsMotion) {
                    this.lastIsMotion = motion;
                    onMotion(motion, this.id);
                }
            }
        });
    }
    close() {
        this.cam.removeAllListeners('event');
    }
}
exports.MotionDetector = MotionDetector;
