//rrd imports
import { useLoaderData } from "react-router-dom";

//helpers
import { deleteItem, fetchData } from "../helper";

//component imports
import Table from "../components/Table";
import { toast } from "react-toastify";

//loader
export async function expensesLoader() {

    //see for await if not using localStorage
    const expenses = await fetchData("expenses");
    return { expenses };
}
//action
export async function expensesAction({request}){
    const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

    //delete expense
  if (_action === "deleteExpense") {
    try {
        //delete an expense
        deleteItem({
            key: "expenses",
            id: values.expenseId
        })
      return toast.success("Expense deleted!");
    } catch (e) {
        console.log(e);
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
    const {expenses} = useLoaderData()
    return ( 
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length > 0
                ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses} />
                    </div>
                )
                : <p>No Expenses to show</p>
            }
        </div>
     );
}
 
export default ExpensesPage;