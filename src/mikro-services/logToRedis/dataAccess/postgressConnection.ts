import {Pool} from 'pg'
const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'mendi824',
    port: 5432,
  })
export default pool