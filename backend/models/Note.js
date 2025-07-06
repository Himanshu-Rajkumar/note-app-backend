const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please add content"],
    },
    category: {
      type: String,
      enum: ["personal", "work", "finance", "shopping", "other"],
      default: "personal",
    },
    tags: [
      {
        type: String,
      },
    ],
    isFinancial: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
    transactionType: {
      type: String,
      enum: ["income", "expense"],
      default: "expense",
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Note", noteSchema)
