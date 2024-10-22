import { Schema, model, Document } from "mongoose";

// Define the Category interface
interface ICategory extends Document {
  name: string;
  type: "income" | "expense";
}

// Create the Category schema
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
});

// Export the Category model
const Category = model<ICategory>("Category", categorySchema);
export default Category;
