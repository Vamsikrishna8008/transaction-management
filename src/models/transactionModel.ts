import { Schema, model, Types, Document } from "mongoose";

// Define the Transaction interface
interface ITransaction extends Document {
  type: "income" | "expense";
  category: Types.ObjectId; // Reference to Category model
  amount: number;
  date: Date;
  description: string;
}

// Create the Transaction schema
const transactionSchema = new Schema<ITransaction>({
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
});

// Export the Transaction model
const Transaction = model<ITransaction>("Transaction", transactionSchema);
export default Transaction;
