import db from "../db";
import User from "../model/user.model";
import Transaction from "../model/transection.model";


class Transactions{

    async findTransectionsId(id: string): Promise<User> {
        const query = `
        SELECT u.username, p.id, p.balance
        FROM users as u
        JOIN Accounts as p ON u.accountid = p.id
        WHERE p.id = $1
        `;

        const values = [id];

        const { rows} = await db.query<User>(query,values)
        const [ user ] = rows;
        return user
    }

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
