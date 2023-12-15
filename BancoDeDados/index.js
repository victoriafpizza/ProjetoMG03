const {Sequelize, DataTypes} = require("sequelize");
const Express = require("express");
const Cors = require("cors");

var db = new Sequelize({
    dialect: "sqlite",
    storage: './database.sqlite'
});

var columns = 
{
    date: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING},
    description:{type: DataTypes.STRING}
}

var notes = db.define("Notes", columns);
db.sync();

var api = new Express();
api.use(Cors());
api.use(Express.json());
api.use(Express.urlencoded());

api.get('/notes', async (requisition, response) =>
{
    var data = await notes.findAll();
    response.json(data);
});

api.post('/notes', async (requisition, response) =>
{
    await notes.create(requisition.body);
    response.send();
});

api.delete('/notes', async (requisition, response) => 
{
    await notes.destroy(
        { where: { id: requisition.body.id}}
    );
    response.send();
});

api.post('/login', (requisition, response) =>
{
    if (requisition.body.password =="meu"){
        response.json({success:true});

    }
    else{
        response.json({success:false});
    }
    
});



api.listen(3000);
