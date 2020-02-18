const express = require("express");

const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = 3000

server.use(express.json())

server.use("/",welcomeRouter )



server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})

