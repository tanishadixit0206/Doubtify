import pg from 'pg';

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "doubtify",
    password: "new_password",
    port: 5432,
})

export {db}