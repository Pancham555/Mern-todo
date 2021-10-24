const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db/connection')
const Model = require('./db/database')
const port = 5500

app.use(cors({
    origin: "*"
}))
app.use(express.json())

app.use(express.static('./view/build/'))

app.get('/data', (req, res) => {


    Model.find((err, resp) => {
        if (err || !resp) {
            res.send("Something went wrong")
        } else {
            res.send(resp)
        }
    });

})
app.post('/data', (req, res) => {
    const { note } = req.body
    const postData = async () => {
        await new Model({ note }).save((err, resp) => {
            if (err || !resp) {
                res.send("Something went wrong")
            } else {
                res.send("sended")
            }
        })

    }
    postData()
})

app.put('/data', (req, res) => {
    const { _id, note } = req.body
    const updateData = async () => {
        await Model.findByIdAndUpdate({ _id }, { note }).exec((err, resp) => {
            if (err || !resp) {
                res.send("Something went wrong")
            } else {
                res.send("updated")
            }
        })

    }
    updateData()
})

app.post('/datadel', (req, res) => {
    const { _id } = req.body
    const deleteData = async () => {
        await Model.findByIdAndDelete({ _id }).exec((err, resp) => {
            if (err || !resp) {
                res.send("Something went wrong")
            } else {
                res.send("deleted")
            }
        })
    }
    deleteData()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))