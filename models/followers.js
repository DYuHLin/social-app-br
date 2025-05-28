const pool = require('../db/Pool')

const followers = {}

followers.getAll = async () => {
    const {rows} = await pool.query(`SELECT * FROM followers;`)
    return rows
}

followers.findFollowing = async (current, other) => {
    const {rows} = await pool.query(`SELECT * FROM followers WHERE follower = ${current} AND following = ${other};`)
    return rows
}

followers.getFollower = async (id) => {
    const {rows} = await pool.query(`SELECT users.username, users.image, users.id AS user_id FROM followers FULL OUTER JOIN users ON followers.follower = users.id 
        WHERE followers.following = ${id};`)
    return rows
}

followers.getFollowing = async (id) => {
    const {rows} = await pool.query(`SELECT users.username, users.image, users.id AS user_id FROM followers FULL OUTER JOIN users ON followers.following = users.id 
        WHERE followers.follower = ${id};`)
    return rows
}

followers.create = async (follower, following) => {
    await pool.query(`INSERT INTO followers (follower, following) VALUES($1, $2);`, [follower, following])
}

followers.delete = async (follower, following) => {
    await pool.query(`DELETE FROM followers WHERE follower = ${follower} AND following = ${following};`)
}

module.exports = followers