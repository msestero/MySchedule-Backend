const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json())

const { check_task_put, check_task_patch } = require('./schema_check');

var url = "https://data.mongodb-api.com/app/data-rbckn/endpoint/data/v1";

// The basic config to access the database
var config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'v07VbfsjvmaPFOfZnurd301in9mfxW76qrYzTUGUCJqDn2k6PNgXsnCFD6l9HXK3',
    }
};


// returns the tasks that match the filter
app.get('/tasks', (req, res) => {

    var data = JSON.stringify({
      "collection": "Tasks",
      "database": "UserInfo",
      "dataSource": "MySchedule",
      "filter": req.query
  });
    axios.post(url + "/action/find", data, config)
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.put('/tasks', (req, res) => {

  if (!check_task_put(req.body)){
    res.send("Invalid Json Schema");
    return;
  }
    
  var temp_config = JSON.parse(JSON.stringify(config));

  var data = {
    "collection": "Tasks",
    "database": "UserInfo",
    "dataSource": "MySchedule",
    "document": req.body
  };

  temp_config["data"] = data;
  
  axios.post(url + "/action/insertOne", data, config)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
})

app.patch('/tasks', (req, res) => {

  if (!check_task_put(req.body)){
    res.send("Invalid Json Schema");
    return;
  }

  var temp_config = JSON.parse(JSON.stringify(config));

  var data = {
    "collection": "Tasks",
    "database": "UserInfo",
    "dataSource": "MySchedule",
    "filter": req.body.filter,
    "update": req.body.update
  };

  temp_config["data"] = data;
  
  axios.post(url + "/action/updateOne", data, config)
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    console.log(error);
  });
})

app.listen(process.env.PORT || 3000, () => {
  console.log('REST API is listening');
});