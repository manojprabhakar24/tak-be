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
    pool.query('SELECT * FROM profile_data ', (error, results) => {
    if (error) {
    reject(error)
    }
    resolve(results.rows)
    })
    })
    }
    const createMerchant = (body) => {
    return new Promise(function(resolve, reject) {
    const { name,
        email,
        designation,
        performancestatus,
        experience
    } = body
    pool.query('INSERT INTO profile_data (name,email,designation,performancestatus,experience) VALUES ($1, $2 ,$3,$4,$5) RETURNING *', [
        name,email,designation,performancestatus,experience], (error, results) => {
    if (error) {
    reject(error)
    }
    resolve(`A new merchant has been added added: ${results.rows[0]}`)
    })
    })
    }
    const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
            reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
            })
            })
            }
            module.exports = {
            getMerchants,
            createMerchant,
            deleteMerchant,
            }