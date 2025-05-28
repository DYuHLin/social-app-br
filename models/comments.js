const pool = require('../db/Pool')

const comments = {}

comments.getAll = async (id) => {
    const {rows} = await pool.query(`select comments.id, comments.text, comments.video, comments.link, comments.youtube, comments.date, comments.post, users.username, 
        users.id AS userId from comments INNER JOIN users ON comments.poster = users.id;`)
    return rows
}

comments.get = async (id) => {
    const {rows} = await pool.query(`select comments.id, comments.text, comments.video, comments.link, comments.youtube, comments.date, comments.post, users.username, 
        users.id AS userId from comments INNER JOIN users ON comments.poster = users.id WHERE comments.post = ${id};`)
    return rows
}

comments.getCC = async (id) => {
    const {rows} = await pool.query(`select comments.id, comments.text, comments.video, comments.link, comments.youtube, comments.date, comments.post, users.username, 
        users.id AS userId from comments INNER JOIN users ON comments.poster = users.id WHERE comments.comment = ${id};`)
    return rows
}

comments.single = async (id) => {
    const {rows} = await pool.query(`SELECT comments.id, comments.text, comments.video, comments.link, comments.youtube, comments.date, comments.post, users.username, 
        users.id AS userId FROM comments INNER JOIN users ON comments.poster = users.id WHERE comments.id = ${id};`)
    return rows
}

comments.create = async (text, video, link, date, poster, post, youtube, comment) => {
    await pool.query(`INSERT INTO comments (text, video, link, date, poster, post, youtube, comment) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`, 
        [text, video, link, date, poster, post, youtube, comment])
}

comments.delete = async (id) => {
    await pool.query(`DELETE FROM comments WHERE id = ${id};`)
}

comments.update = async (text, video, link, date, poster, post, youtube, comment, id) => {
    await pool.query(`UPDATE comments SET text = $1, video = $2, link = $3, date = $4, poster = $5, post = $6, youtube = $7, comment = $8 WHERE id = $9;`, 
        [text, video, link, date, poster, post, youtube, comment, id])
}

comments.updateCC = async (text, video, link, date, poster, post, youtube, comment, id) => {
    await pool.query(`UPDATE comments SET text = $1, video = $2, link = $3 date = $4, poster = $5, post = $6, youtube = $7, comment = $8 WHERE id = $9;`, 
        [text, video, link, date, poster, comment, post, youtube, id])
}

module.exports = comments