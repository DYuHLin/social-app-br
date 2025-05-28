const pool = require('../db/Pool')

const images = {}

images.getPost = async () => {
    const {rows} = await pool.query('SELECT * FROM images WHERE post IS NOT NULL;')
    return rows
}

images.getSinglePost = async (id) => {
    const {rows} = await pool.query(`SELECT * FROM images WHERE post = ${id};`)
    return rows
}

images.getComments = async () => {
    const {rows} = await pool.query('SELECT * FROM images WHERE comment IS NOT NULL;')
    return rows
}

images.create = async (image, post, comment) => {
    await pool.query(`INSERT INTO images (image, post, comment) VALUES($1, $2, $3);`, [image, post, comment])
}

images.deletePostImages = async (id) => {
    await pool.query(`DELETE FROM images WHERE post = ${id};`)
}

images.deleteCommentImages = async (id) => {
    await pool.query(`DELETE FROM images WHERE comment = ${id};`)
}

module.exports = images