// AddExpenseForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider } from '../context/AppContext';
import { MyBudgetTracker } from '../views/MyBudgetTracker';

describe("Expense", () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <MyBudgetTracker />
      </AppProvider>
    );
  });
  test("adds a new expense to the expense list", () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });

    const submitButton = screen.getByText(/save/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  test("updates remaining budget after adding an expense", () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });

    const submitButton = screen.getByText(/save/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/remaining/i)).toHaveTextContent("$900"); 
  });

  test("updates total spent after adding an expense", () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });

    const submitButton = screen.getByText(/save/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/spent so far/i)).toHaveTextContent("$100"); // Assuming budget is $1000
  });

  test("deletes an expense from the expense list", () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });

    fireEvent.click(screen.getByText(/save/i));

    expect(screen.getByText(/groceries/i)).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/x/i, { selector: 'button' }));

    expect(screen.queryByText(/groceries/i)).not.toBeInTheDocument();
    expect(screen.getByText(/remaining/i)).toHaveTextContent('$1000');
  });

  test("updates remaining budget after deleting an expense", () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });

    const submitButton = screen.getByText(/save/i);
    fireEvent.click(submitButton);
    expect(screen.getByText(/remaining/i)).toHaveTextContent("$900");
    
    fireEvent.click(screen.getByText(/x/i, { selector: 'button' }));
    expect(screen.getByText(/remaining/i)).toHaveTextContent("$1000");
  });

  test("updates total spent after deleting an expense", () => {
    const nameInput = screen.getByPlaceholderText(/name/i);
    const costInput = screen.getByPlaceholderText(/cost/i);
    fireEvent.change(nameInput, { target: { value: "Groceries" } });
    fireEvent.change(costInput, { target: { value: "100" } });

    const submitButton = screen.getByText(/save/i);
    fireEvent.click(submitButton);
    expect(screen.getByText(/spent so far/i)).toHaveTextContent("$100"); // Assuming budget is $1000
    
    fireEvent.click(screen.getByText(/x/i, { selector: 'button' }));
    expect(screen.getByText(/spent so far/i)).toHaveTextContent("$0"); // Assuming budget is $1000
  });
});

 