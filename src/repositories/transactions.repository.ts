import db from "../db";
import User from "../model/user.model";
import Account from "../model/account.motel"


class UserTransactions{

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

    async update(user: User): Promise<void>{
        const script = `
        UPDATE Accounts
        SET
            balance = $1
        where id = $2
        `;
        const values = [user.balance, user.id];
        await db.query(script, values)
    }
    
    
}

export default new UserTransactions
