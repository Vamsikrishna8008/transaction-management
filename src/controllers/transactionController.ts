import { Request, Response, Router } from "express";
import Transaction from "../models/transactionModel";
import logger from "../utils/logger";

const router = Router();

// POST /transactions - Add a new transaction
router.post("/", async (req: Request, res: Response) => {
  try {
    const { type, category, amount, description, date } = req.body;

    const transaction = new Transaction({
      type,
      category,
      amount,
      description,
      date,
    });

    const savedTransaction = await transaction.save();
    logger.info(`Transaction added: ${JSON.stringify(savedTransaction)}`);
    res.status(201).json(savedTransaction);
  } catch (error: any) {
    logger.error(`Failed to add transaction: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /transactions - Get all transactions
router.get("/", async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().populate("category");
    logger.info(`Fetched ${transactions.length} transactions`);
    res.status(200).json(transactions);
  } catch (error: any) {
    logger.error(`Failed to fetch transactions: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /transactions/:id - Get a transaction by ID
router.get("/:id", async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate("category");

    if (!transaction) {
      logger.warn(`Transaction not found with ID: ${id}`);
      return res.status(404).json({ message: "Transaction not found" });
    }

    logger.info(`Fetched transaction with ID: ${id}`);
    res.status(200).json(transaction);
  } catch (error: any) {
    logger.error(`Failed to fetch transaction by ID: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

// PUT /transactions/:id - Update a transaction by ID
router.put("/:id", async (req: Request, res: any) => {
  try {
    const { id } = req.params;
    const { type, category, amount, description, date } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { type, category, amount, description, date },
      { new: true }
    );

    if (!updatedTransaction) {
      logger.warn(`Transaction not found for update with ID: ${id}`);
      return res.status(404).json({ message: "Transaction not found" });
    }

    logger.info(`Updated transaction with ID: ${id}`);
    res.status(200).json(updatedTransaction);
  } catch (error: any) {
    logger.error(`Failed to update transaction: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE /transactions/:id - Delete a transaction by ID
router.delete("/:id", async (req: Request, res: any) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      logger.warn(`Transaction not found for deletion with ID: ${id}`);
      return res.status(404).json({ message: "Transaction not found" });
    }

    logger.info(`Deleted transaction with ID: ${id}`);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error: any) {
    logger.error(`Failed to delete transaction: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /summary - Get transaction summary (total income, expenses, and balance)
router.get("/summary", async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, category } = req.query;

    const filter: any = {};
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate as string);
      if (endDate) filter.date.$lte = new Date(endDate as string);
    }

    if (category) {
      filter.category = category;
    }

    const transactions = await Transaction.find(filter);

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    logger.info(
      `Summary generated: Income=${totalIncome}, Expenses=${totalExpenses}, Balance=${balance}`
    );
    res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error: any) {
    logger.error(`Failed to generate summary: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /transactions/report - Generate monthly spending report
router.get("/report", async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;

    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const transactions = await Transaction.find({
      user: req.body.userId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    const report = transactions.reduce((acc: any, transaction: any) => {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    res.status(200).json(report);
  } catch (error: any) {
    logger.error(`Failed to generate report: ${error.message}`);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
