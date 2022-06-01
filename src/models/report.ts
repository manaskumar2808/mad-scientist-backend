import mongoose from 'mongoose';

interface ReportAttr {
    reason: string;
    post: string;
}

interface ReportModel extends mongoose.Model<ReportDoc> {
    build(attrs: ReportAttr): ReportDoc;
}

interface ReportDoc extends mongoose.Document {
    reason: string;
    post: string;
}

const reportSchema = new mongoose.Schema({
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

reportSchema.statics.build = (attrs: ReportAttr) => {
    return new Report(attrs);
}

const Report = mongoose.model<ReportDoc, ReportModel>('Report', reportSchema);

export { Report, ReportDoc };