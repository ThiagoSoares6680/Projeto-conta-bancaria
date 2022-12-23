import db from "../db";
import Account from "../model/account.motel";

class AccountRepository{

    async create(account: Account): Promise<string>{
        const script = `
        INSERT INTO Accounts (
            balance
        )
        VALUES ($1)
        RETURNING id
        `;
        const values = [account.balance];

        const {rows} =  await db.query<{id: string}>(script, values);
        const [newAccount] = rows;
        return newAccount.id;
    }

    async deleteAccount(id: string): Promise<void>{
        const script = `
        DELETE FROM Accounts
        WHERE id = $1
        `
        const values = [id]
        await db.query(script, values)
    }
}   

export default new AccountRepository
