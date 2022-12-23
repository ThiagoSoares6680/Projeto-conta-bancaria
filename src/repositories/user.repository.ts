import db from "../db";
import User from "../model/user.model";


class UsersRepository {
    
    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT username, id 
            FROM Users
        `;

        const { rows } = await db.query<User>(query)
        return rows || []
    }
    
    
    async findById(id: string): Promise<User> {
        const query = `
            SELECT username, id, accountId
            FROM Users
            WHERE id = $1
        `;

        const values = [id];

        const { rows} = await db.query<User>(query,values)
        const [ user ] = rows;

        return user
    }

    async findUserNamePassword(username:string, password:string): Promise<User | null> {
        const query = `
            SELECT id, username
            FROM Users
            WHERE username = $1
            AND password = crypt($2, 'my_salt')
        `
        const value = [username, password]
        const {rows} = await db.query<User>(query,value)
        const [user] = rows
        return user || null;

    }


    async findByUsername(username: string): Promise<User> {
        const query = `
            SELECT username, id
            FROM Users
            WHERE username = $1
        `;

        const values = [username];

        const { rows} = await db.query<User>(query,values)
        const [ user ] = rows;

        return user
    }


    async create(user: User): Promise<User>{
        const script = `
        INSERT INTO Users (
            username,
            password,
            accountid
        )
        VALUES ($1, crypt($2, 'my_salt'), $3)
        RETURNING id,username, accountid
        `;
        const values = [user.username, user.password, user.accountid];

        const {rows} =  await db.query<User>(script, values);
        const [newUser] = rows;
        return newUser;
    }


    async update(user:User): Promise<void>{
        const script = `
        UPDATE Users
        SET 
            username = $1,
            password =  crypt($2, 'my_salt')
        WHERE id = $3
        `;
        const values = [user.username, user.password, user.id];
        await db.query(script, values)
    }


    async delete(id: string): Promise<void>{
        const script = `
        DELETE FROM Users
        WHERE id = $1
        `
        const values = [id]
        await db.query(script, values)
    }


}

export default new UsersRepository