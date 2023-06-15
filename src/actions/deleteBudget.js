//library
import { toast } from "react-toastify";

//helper
import { deleteItem, getAllMatchingItems } from "../helper";

//rrd imports
import { redirect } from "react-router-dom";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });
    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
  } catch (error) {
    throw new Error("There was aproblem deleting your budget.");
  }
  return redirect("/");
}
