const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const pool = require('./db/Pool')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: process.env.CALLBACK,
  },
  async (accessToken, refreshToken, profile, done) => {
    const account = profile._json
    let user = {}
    try{
      const currentUserQuery = await pool.query(`SELECT * FROM users WHERE google_id LIKE '${account.sub}';`)
      if (currentUserQuery.rows.length > 0){
        user = {
          id: currentUserQuery.rows[0].id,
          google_id: currentUserQuery.rows[0].google_id,
          username: currentUserQuery.rows[0].username,
          image: currentUserQuery.rows[0].image
        } 
      } else {
          await pool.query(`INSERT INTO users (username, password, description, image, google_id) VALUES ($1, $2, $3, $4, $5);`, 
          [account.name, null, null, account.picture, account.sub])
          const newUserQuery = await pool.query(`SELECT * FROM users WHERE google_id LIKE '${account.sub}';`)
          user = {
            id: newUserQuery.rows[0].id,
            google_id: account.sub,
            username: account.name,
            image: account.picture
          } 
      }
      done(null, user);
    }catch(err){
      done(err, false, err.message)
    }
  }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})