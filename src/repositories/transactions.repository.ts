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

    async findCashIn(debitedAccountid: string): Promise<Transaction[]> {
        const query = `
        SELECT * FROM transactions
        WHERE debitedAccountid = $1
        `;
        const values = [debitedAccountid];

        const { rows } = await db.query<Transaction>(query, values)
        return rows 
    }

    async findCashOut(creditedAccountid: string): Promise<Transaction[]> {
        const query = `
        SELECT * FROM transactions
        WHERE creditedAccountid = $1
        `;
        const values = [creditedAccountid];

        const { rows } = await db.query<Transaction>(query, values)
        return rows 
    }

    async dateTransaction(dataAccount: string): Promise<Transaction[]> {
        const query = `
        SELECT * FROM transactions
        WHERE creditedAccountid = $1
        ORDER BY createdat ASC
        `
        const values = [dataAccount];
        const { rows } = await db.query<Transaction>(query, values)
        return rows 
    }
    
}

export default new Transactions
