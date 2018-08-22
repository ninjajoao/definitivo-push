const express = require("express")
const app = express()

app.use(express.static('public'))

app.get('/users/:id', function (req, res) {
    res.sendStatus(404)
})

app.listen(process.env.PORT || 8080, () => console.log("All good. Take a breath."))