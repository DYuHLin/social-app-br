const pool = require('../db/Pool')

const users = {}

users.get = async () => {
    const {rows} = await pool.query('select * from users;')
    return rows
}

users.exist = async (id) => {
    const {rows} = await pool.query(`SELECT * FROM users WHERE username LIKE '${id}';`)
    return rows
}

users.single = async (id) => {
    const {rows} = await pool.query(`SELECT * FROM users WHERE id = ${id};`)
    return rows
}

users.create = async (username, password, description, image) => {
    await pool.query(`INSERT INTO users (username, password, description, image) VALUES($1, $2, $3, $4);`, [username, password, description, image])
}

users.delete = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = ${id};`)
}

users.update = async (username, password, description, image, id) => {
    await pool.query(`UPDATE users SET username = $1, password = $2, description = $3, image = $4 WHERE id = $5;`, [username, password, description, image, id])
}

module.exports = users