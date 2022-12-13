import db from "../db";
import User from "../model/user.model";


class UserRepository {
    
    async findAllUsers(): Promise<User[]> {
        const query = `
            SELECT username, uuid, balance
            FROM aplication_user
        `;

        const { rows } = await db.query<User>(query)
        return rows || []
    }
    
    async findById(uuid: string): Promise<User> {
        const query = `
            SELECT username, uuid, balance
            FROM aplication_user
            WHERE uuid = $1
        `;

        const values = [uuid];

        const { rows} = await db.query<User>(query,values)
        const [ user ] = rows;

        return user
    }

    async findByUsername(username: string): Promise<User> {
        const query = `
            SELECT username, uuid, balance
            FROM aplication_user
            WHERE username = $1
        `;

        const values = [username];

        const { rows} = await db.query<User>(query,values)
        const [ user ] = rows;

        return user
    }


    


    async create(user: User): Promise<string>{
        const script = `
        INSERT INTO aplication_user (
            username,
            password,
            balance
        )
        VALUES ($1, crypt($2, 'my_salt'),$3)
        RETURNING uuid
        `;
        const values = [user.username, user.password, user.balance];

        const {rows} =  await db.query<{uuid: string}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }
    async update(user:User): Promise<void>{
        const script = `
        UPDATE aplication_user
        SET 
            username = $1,
            password =  crypt($2, 'my_salt')
        WHERE uuid = $3
        `;
        const values = [user.username, user.password, user.uuid];
        await db.query(script, values)
    }

    async delete(uuid: string): Promise<void>{
        const script = `
        DELETE FROM aplication_user
        WHERE uuid = $1
        `
        const values = [uuid]
        await db.query(script, values)
    }


}

export default new UserRepository