import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        default: null,
    },
    order: {
        type: Number,
        required: true,
    },
    isStarred: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toObject: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            return ret;
        },
    },
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            return ret;
        },
    }
});

export const TodoModel = mongoose.model("Todo", todoSchema);