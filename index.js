const express = require('express');

const port = 2298;
const app = express();  

app.set('view engine', 'ejs');

app.use(express.urlencoded());

let todolists=[
    {
        id: 1,
        category:"Meeting",
        title:"with client",
        reminder:"client need project in 2 weeks",
        
    },
    {
        id: 2,
        category:"Meeting",
        title:"office",
        reminder:"with bose for new project",
     
    },
    {
        id: 3,
        category:"Meeting",
        title:"with client",
        reminder:"client need project in 2 weeks",
       
    },
]

let completetask = []

app.get('/', (req, res) => {
    res.render('index', { todolists: todolists, completetask: completetask });
})


app.post("/addData", (req, res) => {
    let { id, category,title,reminder } = req.body;
    let newObj = {
        id,
        category,
        title,
        reminder,
    }
    todolists.push(newObj)
    return res.redirect("/")
})


app.get("/completedata/:id", (req, res) => {
    console.log(req.params.id);
    res.redirect("/")
    let result = todolists.filter((val, i) => {
        if (req.params.id == i) {
            return val
        }

    })
    todolists = todolists.filter((val, i) => {
        return i != req.params.id
    })
    console.log(result[0]);
    completetask.push(result[0])
})


app.get("/deleteData/:id", (req, res) => {
    let id = req.params.id;
    todolists.splice(id, 1)
    res.redirect("/")
})


app.get("/deletetask/:id", (req, res) => {
    let id = req.params.id;
    completetask.splice(id, 1)
    res.redirect("/")

})

app.listen(port, (err) => {
    if (err) {
        console.log('Server not start');
    } else {
        console.log(`Server start at http://localhost:${port}`);
    }
});