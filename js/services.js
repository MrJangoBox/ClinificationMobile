angular.module('clinifApp.services', [])

.factory('API', function ($rootScope, $http, $ionicLoading, $window) {
    
// Connection to the app server: 1) Local 2) Hosted by Heroku services
//    var base = "http://localhost:9804";
    var base = "http://clinificationappserver.herokuapp.com"
//    var base = "http://clinificationmobileserver.herokuapp.com";
    $rootScope.show = function (text) {
        $rootScope.loading = $ionicLoading.show({
            content: text ? text : 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    };

    $rootScope.hide = function () {
        $ionicLoading.hide();
    };

    $rootScope.logout = function () {
        $rootScope.setToken("");
        $window.location.href = '#/auth/signin';
    };

    $rootScope.notify = function(text){
        $rootScope.show(text);
        $window.setTimeout(function () {
          $rootScope.hide();
        }, 1999);
    };

    $rootScope.doRefresh = function (tab) {
        if(tab == 1)
            $rootScope.$broadcast('fetchAll');
        else
            $rootScope.$broadcast('fetchCompleted');

        $rootScope.$broadcast('scroll.refreshComplete');
    };

    $rootScope.setToken = function (token) {
        return $window.localStorage.token = token;
    }

    $rootScope.getToken = function () {
        return $window.localStorage.token;
    }

    $rootScope.isSessionActive = function () {
        return $window.localStorage.token ? true : false;
    }

    return {
        signin: function (form) {
            return $http.post(base+'/api/v1/clinifApp/auth/login', form);
        },
        signupPatient: function (form) {
            return $http.post(base+'/api/v1/clinifApp/auth/registerPatient', form);
        },
        signupAccount: function (form) {
            return $http.post(base+'/api/v1/clinifApp/auth/registerAccount', form);
        },
        getProfileInfo: function (username) {
            return $http.get(base+'/api/v1/clinifApp/auth/profile', {
                method: 'GET',
                params: {
                    token: username
                }
            });
        },
        putProfile: function (form, username) {
            return $http.put(base+'/api/v1/clinifApp/auth/updateProfile', form, {
                method: 'PUT',
                params: {
                    token: username
                }
            });
        },
        getContactInfo: function (username) {
            return $http.get(base+'/api/v1/clinifApp/auth/contact', {
                method: 'GET',
                params: {
                    token: username
                }
            });
        },
        putContact: function (form, username) {
            return $http.put(base+'/api/v1/clinifApp/auth/updateContact', form, {
                method: 'PUT',
                params: {
                    token: username
                }
            });
        },
        getAccountInfo: function (username) {
            return $http.get(base+'/api/v1/clinifApp/account/info', {
                method: 'GET',
                params: {
                    token: username
                }
            });
        },
        getDoctorInfo: function (username) {
            return $http.get(base+'/api/v1/clinifApp/doctor/info', {
                method: 'GET',
                params: {
                    token: username,
//                    doctorId: doctorId
                }
            });
        },
        getAllAppointments: function (username, patientid) {
            return $http.get(base+'/api/v1/clinifApp/data/list', {
                method: 'GET',
                params: {
                    token: username,
                    patientId: patientid
                }
            });
        },
        getOne: function (id, username) {
            return $http.get(base+'/api/v1/clinifApp/data/item/' + id, {
                method: 'GET',
                params: {
                    token: username
                }
            });
        },
        saveItem: function (form, username) {
            return $http.post(base+'/api/v1/clinifApp/data/item', form, {
                method: 'POST',
                params: {
                    token: username
                }
            });
        },
        putItem: function (id, form, username) {
            return $http.put(base+'/api/v1/clinifApp/data/item/' + id, form, {
                method: 'PUT',
                params: {
                    token: username
                }
            });
        },
        deleteItem: function (id, username) {
            return $http.delete(base+'/api/v1/clinifApp/data/item/' + id, {
                method: 'DELETE',
                params: {
                    token: username
                }
            });
        }
    }
});