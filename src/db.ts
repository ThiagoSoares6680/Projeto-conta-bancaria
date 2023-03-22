import { Pool } from 'pg'

const connectionString = 'postgres://ufpggiwx:9k7WmBjyYHfGFcxlypXZzbKgzoLC3RJp@kesavan.db.elephantsql.com/ufpggiwx'

const db =  new Pool({connectionString})

export default db;
