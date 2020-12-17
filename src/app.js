
const express = require('express');
const app = express()
const subscriberModel = require('./models/subscribers')

// Your code goes here

app.get('/subscribers', async (req, res) => {
    res.send(await subscriberModel.find());
})

app.get('/subscribers/names', async (req, res) => {
    const fullResults = await subscriberModel.find();
    const mappedResults = fullResults.map(doc => {
        return {
            name: doc.name,
            subscribedChannel: doc.subscribedChannel
        }
    })
    res.send(mappedResults);
})

app.get('/subscribers/:id', async (req, res) => {
    const idTosearch = req.params.id;
    console.log(idTosearch);
    try{const doc = await subscriberModel.findOne({_id: idTosearch});
        if(doc == null){
            res.status(400).send({message: 'Id not found'});
        }
        else{
            res.send(doc);
        }
    }
    catch(e){
        res.status(400).send({message: e.message});
    }
})



















module.exports = app;
