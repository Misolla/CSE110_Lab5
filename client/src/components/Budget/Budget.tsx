import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { createExpense } from "../../utils/expense-utils"
import { fetchBudget, updateBudget } from "../../utils/budget-utils";


const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [budgetUpdated, setBudgetUpdated] = useState(budget);

  // Fetch expenses on component mount
  useEffect(() => {
    loadBudget();
  }, []);

  // Function to load expenses and handle errors
  const loadBudget = async () => {
    try {
      const budget = await fetchBudget();
      setBudget(budget);
      setBudgetUpdated(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const onSaveBudget = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBudget(budgetUpdated)
    updateBudget(budgetUpdated);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: <input
            required
            className="form-control"
            id="budget"
            placeholder="budget"
            type="number"
            value={budgetUpdated}
            onChange={(event) => setBudgetUpdated(Number(event.target.value))}
          ></input></div>
      <button onClick={(event) => onSaveBudget(event)} className="btn btn-primary mt-3">
        Save
      </button>
    </div>
  );
};

export default Budget;

// const Budget = () => {
//   return (
//     <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
//       <div>Budget: $1000</div>
//     </div>
//   );
// };

// export default Budget;

