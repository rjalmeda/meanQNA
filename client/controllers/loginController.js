app.controller('loginController', function($scope, $location, loginFactory){
    $scope.login = function(){
        if (!$scope.user){
            return alert('please enter a name');
        } else {
            loginFactory.login($scope.user, function(data){
                if(data.data.success){
                    $location.url('/board')
                } else {
                    $scope.user = {};
                    return alert('error adding to db, please try a different name')
                }
            })
        }
    };
    
    $scope.logout = function(){
        loginFactory.logout(function(data){
            if(data.data.success){
                $location.url('/login');
            }
        })
    }
});