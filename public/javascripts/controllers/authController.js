angular.module('meanApp')
    .controller('authController', function($rootScope,$http){
        var _this = this;
        this.user = {
            isAuthenticated : false,
            id:'',
            username:'',
            password:'',
            formPassword:''
        };
        $rootScope.currentUser = this.user;
        
        this.signup = function(){
            var signupObject = {
                username: _this.user.username,
                password:_this.user.formPassword
            };
            $http.post('/auth/signup', signupObject)
                .success(function(res){
                    if(res.user){
                        _this.user.isAuthenticated = true;
                        _this.user.id = res.user._id;
                        _this.user.password = res.user.password;
                        _this.user.formPassword = '';
                        return;                        
                    }
                    alert('Signup Failed!');
                    console.log(res);
                })
                .error(function(err){
                    alert('Signup Failed');
                });
        };
        
        this.login = function(){
            var loginObject = {
                username: _this.user.username,
                password:_this.user.formPassword
            };
            $http.post('/auth/login', loginObject)
                .success(function(res){
                    if(res.user){
                        _this.user.isAuthenticated = true;
                        _this.user.id = res.user._id;
                        _this.user.password = res.user.password;
                        _this.user.formPassword = '';
                        return;                        
                    }
                    alert('Login Failed!');
                    console.log(res);
                })
                .error(function(err){
                    alert('Login Failed');
                });
        };
        
        this.logout = function(){
            $http.get('/auth/signout')
                .success(function(res){
                    _this.user.isAuthenticated = false;
                    _this.user.password = '';
                    _this.user.username = '';
                    _this.user.id = '';
                });
        };
        
    });