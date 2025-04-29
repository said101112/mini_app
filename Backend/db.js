// en premier en import pg pool 
const {Pool}=require('pg');
const pool=new Pool({
   user:'postgres',
   host:"localhost",
   database:'',
   password:'',
   port:'5432'
});
pool.connect()
  .then(() => console.log("connexion OK "))

module.exports=pool;