import db from "../database.js";

async function select() {
    return db.query('SELECT * FROM fighters ORDER BY wins DESC, draws DESC');
}

export const rankingRepository = {
    select
}