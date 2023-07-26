const express = require('express');
const app = express();
const port = 3001;
const merchant_model = require('./merchanttask_model');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,UPDATE,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
}); 

app.get('/NewTask', (req, res) => { // Update the route to /NewTask
  merchant_model.getMerchants()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.post('/NewTask', (req, res) => {
  merchant_model.createMerchant(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.delete('/NewTask/:id', (req, res) => {
    merchant_model.deleteMerchant(req.params.id)
      .then(() => {
        res.sendStatus(200); // or res.sendStatus(204)
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });
  

app.put('/NewTask/:id', (req, res) => {
    const taskId = req.params.id;
    const newStatus = req.body.status;
  
    // Call the updateTaskStatus method from the merchant_model module
    merchant_model.updateTaskStatus(taskId, newStatus)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        res.status(500).send(error);
      });
  });

  

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});