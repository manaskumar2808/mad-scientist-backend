import mongoose from 'mongoose';

interface PostAttr {
    title: string;
    description: string;
    gallery: string;
    creator: string;
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttr): PostDoc;
}

interface PostDoc extends mongoose.Document {
    title: string;
    description: string;
    gallery: string;
    creator: string;
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    gallery: {
        type: String,
        required: false,
    },
    creator: {
        type: String,
        ref: 'User',
        required: true,
    }
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

postSchema.statics.build = (attrs: PostAttr) => {
    return new Post(attrs);
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post, PostDoc };