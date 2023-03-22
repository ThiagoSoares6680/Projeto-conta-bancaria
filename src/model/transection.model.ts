type Transaction = {
    id?: string
    debitedAccountid: string
    creditedAccountid: string
    value: number
    createdAt: string
}

export default Transaction;