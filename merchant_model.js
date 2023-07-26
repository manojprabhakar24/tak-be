const Pool = require('pg').Pool
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'my_database',
password: 'root',
port: 5432,
});

const getMerchants = () => {
    return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ', (error, results) => {
    if (error) {
    reject(error)
    }
    resolve(results.rows);
    })
    })
    }
    const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
    const { name,email,phone_no,course,status,referredby} = body
    pool.query('INSERT INTO merchants ( name,email,phone_no,course,status,referredby) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [ name,email,phone_no,course,status,referredby], (error, results) => {
    if (error) {
    reject(error)
    }
    resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
    })
    }
    const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.name)
    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
    
    if (error) {
    reject(error)
    }
    resolve(`Merchant deleted with name: ${id}`)
    })
    })
    }
    module.exports = {
    getMerchants,
    createMerchant,
    deleteMerchant,
  }      