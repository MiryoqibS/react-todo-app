import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    deadline: {
        type: Date,
        default: null,
        validate: {
            validator: (value) => value === null || value > new Date(),
            message: "Дедлайн должен быть в будущем"
        },
    },
    order: {
        type: Number,
        required: true,
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