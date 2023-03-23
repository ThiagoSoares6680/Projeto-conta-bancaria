import db from "../db";
import User from "../model/user.model";
import Transaction from "../model/transaction.model";


class Transactions{

    async create(transaction: Transaction): Promise<Transaction>{
        const script = `
        INSERT INTO Transactions (
            debitedAccountid,
            creditedAccountid,
            value,
            createdAt
        )
        VALUES ($1, $2, $3, $4)
        RETURNING debitedAccountid, creditedAccountid, value, createdAt
        `;
        const values = [
            transaction.debitedAccountid, 
            transaction.creditedAccountid, 
            transaction.value, 
            transaction.createdAt
        ];

        const {rows} =  await db.query<Transaction>(script, values);
        const [newTransaction] = rows;
        return newTransaction;
    }
    
}

export default new Transactions
