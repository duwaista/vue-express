const express = require('Express')
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb')
const url = 'mongodb+srv://tester:test@cluster0-xctsm.mongodb.net/test'

const router = express.Router()

//Get posts
router.get('/', async (req, res)=> {
    try {
    const posts = await loadPostCollection()
    res.send(await posts.find({}).toArray())
    } catch(e) {
        console.log(e)
        res.send(e)
    }
})

//Add posts
router.post('/', async (req, res)=> {
    const posts = await loadPostCollection()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
})

//Delete posts
router.delete('/:id', async (req, res)=>{
    const posts = await loadPostCollection()
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

async function loadPostCollection() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

    return client.db('fuck').collection('FuckMe')
}

module.exports = router