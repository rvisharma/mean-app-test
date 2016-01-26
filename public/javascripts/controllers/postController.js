angular.module('meanApp')
    .controller('postController', function($rootScope,$http){
        var _this = this;
        this.posts = [];
        this.post = {
            username:'',
            created_by:'',
            text:''
        };
        this.getAllPosts = function getAllPosts(){
            $http.get('/api/posts')
                .then(function(res){
                    console.log(res.data);
                    _this.posts = res.data;
                });
        }
        
        this.addPost = function(){
            var postObject = {
                created_by : $rootScope.currentUser.id,
                text : _this.post.text,
                username: $rootScope.currentUser.username
            };
            
            $http.post('/api/posts',postObject)
                .success(function(res){
                    console.log(res);
                    _this.post.text = '';
                    _this.getAllPosts();
                })
                .error(function(res){
                    alert("Posting Failed, Please try again :(");
                });            
        };
        
        this.getAllPosts();
        
        this.deletePost = function(id){
            $http.delete('/api/posts/'+id)
                .success(function(res){
                    console.log(res);
                    _this.getAllPosts();
                })
                .error(function(res){
                    console.log(res);
                    alert('Post Deletion Failed');
                });
        };
        
        this.checkAuthor = function(userId){
          return userId === $rootScope.currentUser.id;  
        };
        
    });