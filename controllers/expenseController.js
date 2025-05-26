const Expense = require('../models/Expense');
const { validateExpenseInput } = require('../utils/validateInput');
const { format } = require('date-fns');


exports.createExpense = async (req, res) => {
  try {
    const error = validateExpenseInput(req.body);
    if (error) return res.status(400).json({ message: error });

    const { title, amount, category, date } = req.body;
    const formattedDate = date ? format(new Date(date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

    const expense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date: formattedDate  
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, amount, category, date },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getAllExpenses = async (req, res) => {
    const expenses = await Expense.find().populate('user', 'username email');
    res.json(expenses);
};