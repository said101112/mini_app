// en premier en import pg pool
require('dotenv').config()
console.log(process.env)

const {Pool}=require('pg');
const pool=new Pool({
   user:process.env.DB_USER,
   host:process.env.DB_HOST,
   database:process.env.DB_DATABASE,
   password:process.env.DB_PASSWORD,
   port:process.env.DB_PORT
});
pool.connect()
  .then(() => console.log("connexion OK "))

module.exports=pool;