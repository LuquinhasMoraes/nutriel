angular.module('starter.services', [])

.service('LoginService', function($q, $http, $state) {

    return {
        loginUser: function(login, url) {
            var deferred = $q.defer();
            var promise = deferred.promise;

             $http({
                url: url+'login.php',
                method: "POST",
                data: login,
                withCredentials: false,
                headers: {
                  'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                }
            })
            .success(function (data){
                console.log(data);
                if(data.length > 0){
                    deferred.resolve(data);
                    // localStorage.setItem("ColCod", data[0].ColCod);
                    // localStorage.setItem("ColNom", data[0].ColNom);
                } else {
                  deferred.reject('Desculpe, usuário ou senha inválidos...');
                }
            }).error(function (data){
                 deferred.reject('Não foi possível conectar no servidor. Verifique sua conexâo com a internet ou se você está utlizando a rede correta...');   
            });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        checkLogin: function(){
          if(!localStorage.getItem("UserLog")){
            $state.go('login');
            location.reload();
          }
        }
    }
})

.factory('DataDieta', function($http){
    var store = [];
    return {
      get: function() {
        return store;
      },
      set: function(value) {
        store.push(value);
      },
      clearData: function() {
        store = [];
      },
      itemRemove: function(item){
        store.splice(item, 1);
      },
      createDieta: function(dieta, url_base){

        $http({
          method:"POST",
          url: url_base + "setDieta.php",
          // url: "http://localhost/nutriel/restful/index1.php",
          data: dieta,
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).success(function(data){
          console.log(data);
        }).error(function(data) {
          console.log(data);
        });

      }
    }
})

.factory('Chats', function($q, $http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function(url_base) {
      return $http.get(url_base+'getClientes.php');
    },
    remove: function(id, url_base) {
      // chats.splice(chats.indexOf(chat), 1);
      return $http.get(url_base+'delCliente.php?id='+id);
    },
    removeItem: function(id, url_base) {
      // chats.splice(chats.indexOf(chat), 1);
      return $http.get(url_base+'delItemDieta.php?id='+id);
    },
    get: function(id, url_base) {
      console.log(id);
      return $http.get(url_base+'getClienteById.php?id='+id);
    },
    getItens: function(id, url_base) {
      console.log(id);
      return $http.get(url_base+'getDietaItens.php?id='+id);
    },
    edit: function(clientes, url_base) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      console.log(clientes);
      $http({
        method:"POST",
        url: url_base + "editCliente.php",
        data: clientes,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).success(function(data){
        
        if(data == 'false'){
            
            deferred.resolve(data);

        } else {

            deferred.reject('Houve um erro ao cadastrar este cliente.');

            console.log(data);

            return data;
        }

      }).error(function(data, status,headers,config) {
        
        deferred.reject('Não foi possível conectar no servidor. ' + status + headers);   

      });

      promise.success = function(fn) {
          promise.then(fn);
          return promise;
      }
      promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
      }
      return promise;
    },
    set: function(clientes, url_base) {
      
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method:"POST",
        url: url_base + "setClientes.php",
        data: clientes,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).success(function(data){
        
        if(data == 'false'){
            
            deferred.resolve(data);

        } else {

            deferred.reject('Houve um erro ao cadastrar este cliente.');

            console.log(data);

            return data;
        }

      }).error(function(data, status,headers,config) {
        
        deferred.reject('Não foi possível conectar no servidor. ' + status + headers);   

      });

      promise.success = function(fn) {
          promise.then(fn);
          return promise;
      }
      promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
      }
      return promise;

    }

  };
})

.factory('Alimentos', function($q, $http) {
  // Might use a resource here that returns a JSON array

  return {
    all: function(url_base) {
      return $http.get(url_base+'getAlimentos.php');
    },
    remove: function(id, url_base) {
      return $http.get(url_base+'delAlimentos.php?id='+id);
    },
    get: function(id, url_base) {
      console.log(id);
      return $http.get(url_base+'getAlimentoById.php?id='+id);
    },
    edit: function(alimento, url_base) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      console.log(alimento);
      $http({
        method:"POST",
        url: url_base + "editAlimentos.php",
        data: alimento,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).success(function(data){
        
        if(data == 'false'){
            
            deferred.resolve(data);

        } else {

            deferred.reject('Houve um erro ao editar este alimento.');

            console.log(data);

            return data;
        }

      }).error(function(data, status,headers,config) {
        
        deferred.reject('Não foi possível conectar no servidor. ' + status + headers);   

      });

      promise.success = function(fn) {
          promise.then(fn);
          return promise;
      }
      promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
      }
      return promise;
    },
    set: function(alimentos, url_base) {
      
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method:"POST",
        url: url_base + "setAlimentos.php",
        data: alimentos,
        headers: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }).success(function(data){
        
        if(data == 'false'){
            
            deferred.resolve(data);

        } else {

            deferred.reject('Houve um erro ao cadastrar este cliente.');

            console.log(data);

            return data;
        }

      }).error(function(data, status,headers,config) {
        
        deferred.reject('Não foi possível conectar no servidor. ' + status + headers);   

      });

      promise.success = function(fn) {
          promise.then(fn);
          return promise;
      }
      promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
      }
      return promise;

    }

  };
});
