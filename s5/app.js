const express = require('express');
const app = express();

const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const port = 3003;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//READ
app.get('/colors', (req, res) => {
    const data = fs.readFileSync('./Data/colors.json', 'utf8');
    res.json({
        colors: JSON.parse(data),
        message: 'OK'
    });
});

//CREATE
app.post('/colors', (req, res) => {
    let data = fs.readFileSync('./Data/colors.json', 'utf8');
    const id = uuidv4();
    const color = {...req.body.color, id };
    data = JSON.parse(data);
    data.push(color);
    data = JSON.stringify(data);
    fs.writeFileSync('./Data/colors.json', data);
    res.json({
        message: ['New color added', 'ok'],
    });
});

app.delete('/colors/:id', (req, res) => {
    let data = fs.readFileSync('./Data/colors.json', 'utf8');
    data = JSON.parse(data);
    data = data.filter(c => c.id !== req.params.id);
    data = JSON.stringify(data);
    fs.writeFileSync('./Data/colors.json', data);
    res.json({
        message: 'OK'
    });
});

app.put('/colors/:id', (req, res) => {

    let data = fs.readFileSync('./Data/colors.json', 'utf8');
    data = JSON.parse(data);

    data = data.map(c => c.id === req.params.id ? {...c, ...req.body.color, id: req.params.id } : {...c });

    data = JSON.stringify(data);
    fs.writeFileSync('./Data/colors.json', data);

    res.json({
        message: 'ok',
    });

});


// app.get('/', (req, res) => {
//   res.send(`<h1>${req.query.hello}, ${req.query.who} !</h1>`);
// });

// app.get('/animal/:a', (req, res) => {
//     // res.send(`<h1>Hello, ${req.params.a} !</h1>`);
//     res.json({text: req.params.a});
// });



// app.get('/clients', (req, res) => {

//   const data = fs.readFileSync('./Data/clients.json', 'utf8');

//   res.json({
//     clients: JSON.parse(data),
//     message: 'OK'
//   });

// });


// app.post('/clients', (req, res) => {

//   let data = fs.readFileSync('./Data/clients.json', 'utf8');
//   const id = uuidv4();
//   const client = {...req.body.client, id};
//   data = JSON.parse(data);
//   data.push(client);
//   data = JSON.stringify(data);
//   fs.writeFileSync('./Data/clients.json', data);

//   res.json({
//     message: 'ok',
//     promiseId: req.body.promiseId,
//     id
//   });

// });


// app.put('/clients/:id', (req, res) => {

//   let data = fs.readFileSync('./Data/clients.json', 'utf8');
//   data = JSON.parse(data);

//   data = data.map(c => c.id === req.params.id ? {...c, ...req.body.client, id: req.params.id} : {...c});

//   data = JSON.stringify(data);
//   fs.writeFileSync('./Data/clients.json', data);

//   res.json({
//     message: 'ok',
//     promiseId: req.body.promiseId,
//   });

// });


//   app.delete('/clients/:id', (req, res) => {

//     let data = fs.readFileSync('./Data/clients.json', 'utf8');
//     data = JSON.parse(data);
//     data = data.filter(c => c.id !== req.params.id);
//     data = JSON.stringify(data);
//     fs.writeFileSync('./Data/clients.json', data);

//     res.json({
//       message: 'OK'
//     });


// });


app.listen(port, () => {
    console.log(`COLOR server on port ${port}`);
});