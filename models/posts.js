const pool = require('../db/Pool')

const posts = {}

posts.get = async () => {
    const {rows} = await pool.query(`SELECT posts.id, posts.text, posts.video, posts.link, posts.date, posts.youtube, users.username, users.id AS user_id, 
        users.google_id FROM posts INNER JOIN users ON posts.poster = users.id;`)
    return rows
}

posts.single = async (id) => {
    const {rows} = await pool.query(`SELECT posts.id, posts.text, posts.video, posts.link, posts.date, posts.youtube, users.username, users.id AS user_id, 
        users.google_id FROM posts INNER JOIN users ON posts.poster = users.id WHERE posts.id = ${id};`)
    return rows
}

posts.create = async (text, video, link, date, poster, youtube) => {
    const {rows} = await pool.query(`INSERT INTO posts (text, video, link, date, poster, youtube) VALUES($1, $2, $3, $4, $5, $6) returning *;`, 
        [text, video, link, date, poster, youtube])
    return rows[0]
}

posts.delete = async (id) => {
    await pool.query(`DELETE FROM posts WHERE id = ${id};`)
}

posts.update = async (text, video, link, date, poster, youtube, id) => {
    await pool.query(`UPDATE posts SET text = $1, video = $2, link = $3, date = $4, poster = $5, youtube = $6 WHERE id = $7;`, 
        [text, video, link, date, poster, youtube, id])
}

module.exports = posts