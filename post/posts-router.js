const express = require("express")
//importing data from database
const post = require("../data/db")

const router = express.Router()

//--------------[Returns an array of all the post objects contained in the database.]
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

//...............Returns a post object with the specified id.

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

// ------------Updates the post with the specified id 
//using data from the request body. Returns the modified document, NOT the original.

router.put("/:id", (req, res) => {

    if(!req.body.title || !req.body.contents ) {
   return res.status(400).json({
       message: "Please provide title and contents for the post."
   })
    }
   post.update(req.params.id, req.body)
   .then(updatedPost => {
       if(updatedPost) {
           res.status(200).json(updatedPost)
       }
       else{
           res.status(404).json({
               message:"The post with the specified ID does not exist."
           })
       }
   })
   .catch( error => {
       res.status(500).json({
           message: "The post information could not be modified."
       })
   })
   

})

//----------Creates a post using the information sent inside the request body.

router.post("/", (req, res) => {
   if (!req.body.title || !req.body.contents){
   return res.status(400).json({
       message: "Please provide title and contents for the post."
   }) 
} 
     post.insert(req.body)
     .then(createdPost => {
     res.status(201).json(createdPost)
      }) 

      .catch( error => {
          res.status(500).json({
              message: "There was an error while saving the post to the database"
          })
      })

})

//-----------------Removes the post with the specified id and returns the deleted post object. 

router.delete("/:id", (req,res) => {

    post.remove(req.params.id)

    .then(post => {
        console.log(post)
        if (post > 0) {
            res.status(200).json({
                message: "Post been deleted"
            })
        }
        else{
          res.status(404).json({
              message: "The Post with specified ID does not exist"
          })
        }
    })
    .catch( error => {
        res.status(500).json({
            message: "The post could not be removed"
        })
    })

})

//--------------Creates a comment for 
//the post with the specified id using information sent inside of the request body.

router.post("/:id/comments", (req, res) => {
      if(!req.body.text) {
         return  res.status(400).json({
              message: "Please provide text for the comment."
          })
      }
      post.insertComment(req.body)
       .then(comment => {
           if (comment) {
               res.status(201).json(comment)
           }
           else {
               res.status(404).json({
                   message: "The post with the specified ID does not exist."
               })
           }
       })

       .catch( error => {
           res.status(500).json({
               message: "There was an error while saving the comment to the database"
           })
       })


})


module.exports = router