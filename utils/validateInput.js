module.exports = {
  validateRegisterInput: ({ username, email, password }) => {
    if (!username || !email || !password) return 'All fields are required';

    // Email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format';

    // Password length validation
    if (password.length < 8) return 'Password must be at least 8 characters long';

    return null;
  },

  validateExpenseInput: ({ title, amount, category }) => {
    if (!title || !amount || !category) return 'All fields are required';
    if (amount <= 0) return 'Amount must be positive';
    return null;
  }
};

