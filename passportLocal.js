const passport = require('passport')
const {Strategy} = require('passport-local')
const pool = require('./db/Pool')
const bcrypt = require('bcryptjs')
const userModel = require('./models/users')

passport.use(
    new Strategy( async (username, password, done) => {
        console.log(username + ' ' + password)
        const user = await userModel.exist(username)
        try{
            if(user.length == 0){
                throw new Error('user not found')
            } else{
                const match = await bcrypt.compare(password, user[0].password)
                if(!match){
                    throw new Error('invalid password')
                }
            }

            done(null, user[0])
        } catch(err){
            console.log(err)
            done(err, null)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try{
        const user = await userModel.byId(id)
        console.log(user)
        if(user.length == 0){
            throw new Error('user not found')
        }
        done(null, user[0])
    }catch(err){
        done(err, null)
    }
})
