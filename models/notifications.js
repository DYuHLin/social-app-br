const pool = require('../db/Pool')

const notifications = {}

notifications.getNotifications = async (id) => {
    const {rows} = await pool.query(`SELECT notifications.id, notifications.following, users.username FROM notifications 
        INNER JOIN users ON notifications.c_user = users.id WHERE following = ${id};`)
    return rows
}

notifications.create = async (user, following) => {
    await pool.query(`INSERT INTO notifications (c_user, following) VALUES($1, $2);`, [user, following])
}

notifications.delete = async (id) => {
    await pool.query(`DELETE FROM notifications WHERE following = ${id};`)
}

module.exports = notifications