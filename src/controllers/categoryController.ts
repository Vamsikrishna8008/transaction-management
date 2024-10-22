import { Request, Response, Router } from "express";
import Category from "../models/categoryModel";

const router = Router();

// POST /categories - Add a new category
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    const category = new Category({
      name,
      type,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /categories - Retrieve all categories
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /categories/:id - Retrieve a category by ID
router.get("/:id", async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// PUT /categories/:id - Update a category by ID
router.put("/:id", async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, type },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE /categories/:id - Delete a category by ID
router.delete("/:id", async (req: Request, res: any) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
