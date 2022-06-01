"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reportSchema = new mongoose_1.default.Schema({
    reason: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        ref: 'Post',
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    },
    timestamps: true,
});
reportSchema.statics.build = (attrs) => {
    return new Report(attrs);
};
const Report = mongoose_1.default.model('Report', reportSchema);
exports.Report = Report;
