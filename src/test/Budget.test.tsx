import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { MyBudgetTracker } from '../views/MyBudgetTracker';

describe("Budget", () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );
  });
  test('verifies that budget = remaining + total expenditure', () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Rent" } });
    fireEvent.change(costInput, { target: { value: "500" } });

    const submitButton = screen.getByText(/save/i);
    fireEvent.click(submitButton);

    const remainingText = screen.getByText(/remaining/i);
    const totalExpenditureText = screen.getByText(/spent so far/i);

    const remaining = parseInt(remainingText.textContent?.replace(/[^0-9]/g, '') || '0', 10);
    const totalExpenditure = parseInt(totalExpenditureText.textContent?.replace(/[^0-9]/g, '') || '0', 10);
    const budget = 1000; 

    // Ensure budget = remaining + total expenditure
    expect(remaining + totalExpenditure).toBe(budget);
  });
});