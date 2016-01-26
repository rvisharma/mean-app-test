var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

function isAuthenticated(req,res,next){
    if(req.method === "GET"){
        return next();
    }
    if(req.isAuthenticated()){
        return next();
    }
    
    // not authentivated
    return res.send('NotAuthenticated');
}

router.use('/posts',isAuthenticated);

router.route('/posts')
    .post(function(req, res){
        var post = new Post();
        post.text = req.body.text;
        post.created_by = req.body.created_by;
        post.username = req.body.username;
        post.save(function(err, post){
            if(err){
                return res.send(500,err);
            }
            return res.json(post);
        });
    })
    
    //gets all posts
    .get(function(req, res){
        Post.find(function(err, posts){
            if(err){
                return res.send(500, err);
            }
            return res.send(posts);
        });
    });
    
// For specific posts
router.route('/posts/:id')
    //updates specified post
    .put(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);

            post.created_by = req.body.created_by;
            post.text = req.body.text;

            post.save(function(err, post){
                if(err)
                    res.send(err);

                res.json(post);
            });
        });
    })

    .get(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);
            res.json(post);
        });
    })

    //deletes the post
    .delete(function(req, res) {
        Post.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    });


module.exports = router;