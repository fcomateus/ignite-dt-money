import { useState, useEffect, ReactNode, createContext } from "react";

interface Transactions {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

interface TransactionContextType {
    transactions: Transactions[],
    fetchTransactions: (query?: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionsProviderProps {
    children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {

    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function fetchTransactions(query?: string) {
        const url = new URL('http://localhost:3333/transactions')

        if(query) {
            url.searchParams.append('q', query)
        }

        const response = await fetch(url)
        const data = await response.json()
        setTransactions(data)
    }

    useEffect(() => {
        fetchTransactions()
        // fetch('http://localhost:3333/transactions')
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })

    }, [])

    return (
        <TransactionsContext.Provider
            value={{ 
                transactions, 
                fetchTransactions 
            }}
        >
            { children }
        </TransactionsContext.Provider>
    )
}