const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const PORT = 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload({}));
app.use('/api/v1/files', require('./router/router_v1'))


app.listen(PORT, () => {
    console.log(`Server working on port ${PORT}`)
})

