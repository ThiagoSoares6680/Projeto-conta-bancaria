
type User = {

    id?: string,
    username: string,
    password: string,
    accountid: string,
    balance: number,
    value?: number,
    creditedAccountid?: string,
    debitedAccountid?: string,
}

export default User;