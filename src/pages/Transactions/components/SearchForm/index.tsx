import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

const searchFormSchema = zod.object({
    query: zod.string()
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

function SearchFormComponent() {
    const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.fetchTransactions
    })

    const { 
            register, 
            handleSubmit,
            formState: {
                isSubmitting
            } 
        } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: SearchFormInputs) {
        await fetchTransactions(data.query)      
        
        console.log(data);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações"
                {...register('query')} 
            />
            <button 
                type="submit"
                disabled={isSubmitting}
            >
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}

export const SearchForm = memo(SearchFormComponent)