import * as Dialog from '@radix-ui/react-dialog'
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const newTransactionFormSchema = zod.object({
    description: zod.string(),
    price: zod.number(),
    category: zod.string(),
    type: zod.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {

    const {
        control,
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000))

        console.log(data);
    }

    const iconSize = 24
    return (
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                    <CloseButton>
                        <X size={iconSize}/>
                    </CloseButton>

                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input 
                            type="text" 
                            placeholder='Descrição' 
                            required
                            {...register('description')}
                        />
                        <input 
                            type="number" 
                            placeholder='Preço' 
                            required
                            {...register('price', { valueAsNumber: true })}
                        />
                        <input 
                            type="text" 
                            placeholder='Categoria' 
                            required
                            {...register('category')}
                        />

                        <Controller 
                            control={control}
                            name='type'
                            render={({ field }) => {
                                return (
                                    <TransactionType
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <TransactionTypeButton
                                            value='income'
                                            variant='income'
                                        >
                                            <ArrowCircleUp size={iconSize}/>
                                            Entrada
                                        </TransactionTypeButton>

                                        <TransactionTypeButton
                                            value='outcome'
                                            variant='outcome'
                                        >
                                            <ArrowCircleDown size={iconSize}/>
                                            Saída
                                        </TransactionTypeButton>
                                    </TransactionType>
                                )
                            }}
                        />

                        <button 
                            type='submit'
                            disabled={isSubmitting}
                        >
                            Cadastrar
                        </button>
                    </form>

            </Content>
        </Dialog.Portal>
    )
}