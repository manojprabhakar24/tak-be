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
    pool.query('SELECT * FROM NewTask ', (error, results) => {
    if (error) {
    reject(error)
    }
    resolve(results.rows);
    })
    })
    }
    const createMerchant = (body) => {
        return new Promise(function(resolve, reject) {
          const { id, taskname, status, taskdetails, assignedto } = body;
      
          // Check if the ID already exists
          pool.query('SELECT * FROM NewTask WHERE id = $1', [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              if (results.rowCount > 0) {
                reject(new Error('Task with the same ID already exists. Please enter a unique ID.'));
              } else {
                pool.query(
                  'INSERT INTO NewTask (id, taskname, status, taskdetails, assignedto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  [id, taskname, status, taskdetails, assignedto],
                  (error, results) => {
                    if (error) {
                      reject(error);
                    }
                    resolve(`A new task has been added: ${results.rows[0]}`);
                  }
                );
              }
            }
          });
        });
      };

      const updateTaskStatus = (taskId, newStatus) => {
        return new Promise(function(resolve, reject) {
          pool.query(
            'UPDATE NewTask SET status = $1 WHERE id = $2 RETURNING *',
            [newStatus, taskId],
            (error, results) => {
              if (error) {
                reject(error);
              }
              resolve(`Task with ID ${taskId} has been updated: ${results.rows[0]}`);
            }
          );
        });
      };

      const deleteMerchant = (id) => {
        return new Promise(function(resolve, reject) {
          pool.query('SELECT * FROM NewTask WHERE id = $1', [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              console.log('Fetched Task:', results.rows[0]); // Add this line to log the fetched task
              if (results.rowCount === 0) {
                reject(new Error('Task not found. Please provide a valid task ID.'));
              } else {
                const task = results.rows[0];
                if (task.status === 'Completed') {
                  pool.query('DELETE FROM NewTask WHERE id = $1', [id], (error, deleteResult) => {
                    if (error) {
                      reject(error);
                    } else {
                      console.log('Delete Result:', deleteResult); // Add this line to log the delete result
                      resolve(deleteResult.rowCount);
                    }
                  });
                } else {
                  reject(new Error('Only completed tasks can be deleted.'));
                }
              }
            }
          });
        });
      };
    
    module.exports = {
        getMerchants,
        createMerchant,
        updateTaskStatus,
        deleteMerchant,
      };