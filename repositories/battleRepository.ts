import db from "../database.js";

async function select(username: string) {
    return db.query('SELECT * FROM fighters WHERE username = $1', [username]);
}

async function insertWinner(username: string) {
    return db.query('INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4) ', [username, 1, 0, 0]);
}

async function insertLoser(username: string) {
    return db.query('INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4) ', [username, 0, 1, 0]);
}

async function insertDraw(username: string) {
    return db.query('INSERT INTO fighters (username, wins, losses, draws) VALUES ($1, $2, $3, $4) ', [username, 0, 0, 1]);
}

async function update(columnName: string, username: string) {
    return db.query(`UPDATE fighters SET ${columnName} = ${columnName} + 1 WHERE username = $1`, [username]);
}

export const battleRepository = {
    select,
    insertWinner,
    insertLoser,
    insertDraw,
    update
}