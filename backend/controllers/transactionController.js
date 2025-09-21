import { db } from "../config/dbConnect.js";

export const addTransaction = async (req, res, next) => {
  try {
    const {
      amount,
      description,
      type,
      category,
      tax_type = "flat",
      tax_value = 0,
    } = req.body;
    const userId = req.user.userId;

    // Check required fields
    if (!amount || !description || !type || !category) {
      return res.status(400).json({
        message: "Amount, description, type and category are required",
      });
    }

    // Calculate total amount based on tax
    let total_amount = parseFloat(amount);
    if (tax_type === "percentage") {
      total_amount = parseFloat(amount) + (parseFloat(amount) * parseFloat(tax_value)) / 100;
    } else {
      total_amount = parseFloat(amount) + parseFloat(tax_value);
    }

    // Insert transaction into database
    const [result] = await db.execute(
      "INSERT INTO transactions (user_id, type, category, amount, tax_type, tax_value, total_amount, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        type,
        category,
        amount,
        tax_type,
        tax_value,
        total_amount,
        description,
      ]
    );

    res.status(201).json({
      message: "Transaction added successfully",
      transactionId: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

// Get all transactions for user with pagination and filters
export const getTransactions = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, category, type } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE clause with filters
    let whereClause = "WHERE user_id = ?";
    const queryParams = [userId];

    if (category && category.trim() !== "") {
      whereClause += " AND category = ?";
      queryParams.push(category);
    }

    if (type && type.trim() !== "") {
      whereClause += " AND type = ?";
      queryParams.push(type);
    }

    // Get total count for pagination
    const [countResult] = await db.execute(
      `SELECT COUNT(*) as total FROM transactions ${whereClause}`,
      queryParams
    );
    const total = countResult[0].total;

    // Get transactions with pagination
    const [transactions] = await db.execute(
      `SELECT * FROM transactions ${whereClause} ORDER BY created_at DESC LIMIT ${parseInt(
        limit
      )} OFFSET ${parseInt(offset)}`,
      queryParams
    );

    res.json({
      message: "Transactions retrieved successfully",
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update transaction
export const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updates = req.body;

    // Check if transaction exists
    const [existing] = await db.execute(
      "SELECT id FROM transactions WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Build dynamic update query
    const fields = [];
    const values = [];

    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    });

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    values.push(id, userId);

    await db.execute(
      `UPDATE transactions SET ${fields.join(
        ", "
      )} WHERE id = ? AND user_id = ?`,
      values
    );

    res.json({ message: "Transaction updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Check if transaction exists and belongs to user
    const [existing] = await db.execute(
      "SELECT id FROM transactions WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Delete transaction
    await db.execute("DELETE FROM transactions WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    next(error);
  }
};
