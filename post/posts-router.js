const express = require("express")
const post = require("../data/db")

const router = express.Router()


router.get("/", (req, res) => {
    const opts = {
        sortBy: req.query.sortBy,
        limit: req.query.limit,
    
    }

    post.find(opts)
    .then ((posts) => {
        res.status(200).json(posts)
    })

    .catch((error) => {
        res.status(500).json({
            message: "error retreiving posts"
        })
    })

})


module.exports = router