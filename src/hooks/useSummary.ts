import { TransactionsContext } from "../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"

export function useSummary() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    // { income: 0, outcome: 0, total: 0}
    const summary = transactions.reduce(
        (accumulator, transaction) => {
            if(transaction.type === 'income') {
                accumulator.income += transaction.price
                accumulator.total += transaction.price
            } else {
                accumulator.outcome += transaction.price
                accumulator.total -= transaction.price
            }

            return accumulator
        }, 
        { 
            income: 0, 
            outcome: 0, 
            total: 0
        }
    )
    
    return summary
}