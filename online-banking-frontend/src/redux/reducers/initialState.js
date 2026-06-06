export default {
  currentAccount: { account_name: "Checking", account_id: 1, account_number: "123456789", balance: 5000 },
  accounts: [
    { account_id: 1, account_name: "Checking", account_number: "123456789", account_type: "Checking", user_id: 1, updated_at: [2026, 6, 6], balance: 5000 },
    { account_id: 2, account_name: "Savings", account_number: "987654321", account_type: "Savings", user_id: 1, updated_at: [2026, 6, 6], balance: 12000 }
  ],
  totalBalance: "17000",
  transactionHistory: [
    { transaction_id: 101, account_id: 1, transaction_type: "Transfer", amount: 200, source: "Web", status: "Success", reason_code: "N/A", created_at: [2026, 6, 5, 14, 30, 0] },
    { transaction_id: 102, account_id: 2, transaction_type: "Deposit", amount: 500, source: "ATM", status: "Success", reason_code: "N/A", created_at: [2026, 6, 6, 9, 15, 0] }
  ]
};

