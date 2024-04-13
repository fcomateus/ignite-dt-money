import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { SearchForm } from "./components/SearchForm"

import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles'

interface Transactions {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

export function Transactions() {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    useEffect(() => {
        async function loadTransactions() {
            const response = await fetch('http://localhost:3333/transactions')
            const data = await response.json()
            setTransactions(data)
        }

        loadTransactions()
        // fetch('http://localhost:3333/transactions')
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })

    }, [])


    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SearchForm />

                <TransactionsTable>
                    <tbody>
                        {
                            transactions.map(transaction => {
                                return (
                                    <tr key={transaction.id}>
                                        <td width="50%">{transaction.description}</td>
                                        <td>
                                            <PriceHighlight
                                                variant={transaction.type}
                                            >
                                                {transaction.price}
                                            </PriceHighlight>
                                        </td>
                                        <td>{transaction.category}</td>
                                        <td>{transaction.createdAt}</td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    )
}