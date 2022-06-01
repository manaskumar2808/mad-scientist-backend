import mongoose from 'mongoose';

interface UserAttr {
    email: string;
    userName: string;
    image: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttr): UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string;
    userName: string;
    image: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String, 
        required: true,
    },
    image: {
        type: String,
        required: false,
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

userSchema.statics.build = (attrs: UserAttr) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserDoc };