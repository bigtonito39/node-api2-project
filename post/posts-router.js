const express = require("express")
//importing data from database
const post = require("../data/db")

const router = express.Router()

//---------------------------------------------------------------------[Returns an array of all the post objects contained in the database.]
//we no longer have to definite the route prefix as "/api/posts" is already being called on the use method in index.js
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
            message: "The posts information could not be retrieved."
        })
    })

})

//...............Returns the post object with the specified id.

router.get("/:id", (req, res)=> {

    post.findById(req.params.id)
    .then ((post) => {
        if (post){
            res.status(200).json(post)
        }else {
            res.status(404).json ({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "The post information could not be retrieved."
        })
    })

    
})


//------Returns an array of all the comment objects associated with the post
// with the specified id.

router.get("/:id/comments", (req, res) => {
    post.findCommentById(req.params.id)

    .then((comments)=> {
      if ( comments) {
        res.status(200).json(comments)
      }else{
          res.status(404).json({
              message: "The post with the specified ID does not exist."
          })
      }

        
    })

    .catch((error) => {
        res.status(404).json({
            message:"The comments information could not be retrieved." 
        })
    })
})


module.exports = router