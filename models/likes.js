const pool = require('../db/Pool')

const likes = {}

likes.getAllLikes = async () => {
    const {rows} = await pool.query(`SELECT * FROM likes;`)
    return rows
}

likes.getLikes = async (id) => {
    const {rows} = await pool.query(`SELECT * FROM likes WHERE liker = ${id};`)
    return rows
}

likes.findPostLike = async (id, commId) => {
    const {rows} = await pool.query(`SELECT * FROM likes WHERE liker = ${id} AND post = ${commId};`)
    return rows
}

likes.findCommentLike = async (id, commId) => {
    const {rows} = await pool.query(`SELECT * FROM likes WHERE liker = ${id} AND comment = ${commId};`)
    return rows
}

likes.create = async (post, comment, liker) => {
    await pool.query(`INSERT INTO likes (post, comment, liker) VALUES($1, $2, $3);`, [post, comment, liker])
}

likes.deletePostLike = async (id, user) => {
    await pool.query(`DELETE FROM likes WHERE post = ${id} AND liker = ${user};`)
}

likes.deletecommentLike = async (id, user) => {
    await pool.query(`DELETE FROM likes WHERE comment = ${id} AND liker = ${user};`)
}

module.exports = likes