// definir le point de terminaison 
app.get('/',(req,res) => res.send('hey express 2 great !'))


// recuperer la liste complete des plantes
app.get('/api/plants',(req,res) => {
    const message = success(`you asked for all plants`);
    res.json(success(message,plants));
})

// recuperer le nombre de plantes en base 
app.get('/api/plants/total',(req,res) => {
    const total = plants.length;
    res.send(`Number of plants in the tight : <span style="color:#17B169;font-weight:bold;text-decoration:underline">${total}</span>`);
})

// recuperer la var contenue dans l'url grace a req.params.id de express
app.get('/api/plants/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const plant = plants.find(plant => plant.id === id);
    const message = success(`you asked for plant n°${id}`);
    res.json(success(message,plant));
})


// add endpoint to post plants 
// chaque modele sequelize possede une instance create

app.post('/api/plants',(req,res) => {
    const id = getUniqueId(plants);
    const plantCreated = sequelize.models.Plants.build({... req.body, ...{id : id, created : new Date()}});
    plantCreated.save();
    const message = success(`you created plant ${plantCreated.name} n°${id}`);
    res.json(success(message,plantCreated));
    // const plantCreated = {... req.body, ...{id : id, created : new Date()}};
    // plants.push(plantCreated)
    // const message = success(`you created plant ${plantCreated.name} n°${id}`);
    // res.json(success(message,plantCreated));
})

// add endpoint to edit a plant 
app.put('/api/plants/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const plantUpdated = {... req.body,id:id};
    plants = plants.map(plant => {
        return plant.id === id ? plantUpdated : plant
    });
    const message = success(`you edited ${plantUpdated.name} with id n°${id}`);
    res.json(success(message,plantUpdated));
})

// add endpoint to delete a plant 
app.delete('/api/plants/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const plantDeleted = plants.find(plant => plant.id === id);
    plants.filter(plant => plant.id !== id);
    const message = success(`you deleted ${plantDeleted.name} with id n°${id}`);
    res.json(success(message,plantDeleted));
})

// app.get('/api/plants/:id/:name',(req,res) => {
//     const id = req.params.id;
//     const name = req.params.name;
//     res.send(`you asked for plant n°${id} which label is ${name}`)
// })

// middleware de type logger 
// app.use((req,res,next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// })

// demarre l'api rest grace a la methode listen 
// app.listen(port,() => console.log(`notre app ${title} démarrée sur : http://localhost:${port}`))

// test insomnia 

// {
// 	"name":"monstera2",
// 	"hp":"29",
// 	"cp":"15",
// 	"picture":"https://www.ugaoo.com/cdn/shop/files/9_dac1c33d-00f2-469a-81f9-287d72f67a38.jpg?v=1710232846&width=1500",
// 	"types":["branches"]
// }