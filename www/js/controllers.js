angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $location) {

  $scope.login = {usuario: '', senha: '', tipo: false};

  $scope.config = {
    // url_base: 'http://localhost/nutriel/restful/'
    url_base: 'http://bandmaker.esy.es/DeadCube/restful/'
  }

  $scope.logar = function() {

    LoginService.loginUser($scope.login, $scope.config.url_base).success( function(data) {
        
        if($scope.login.tipo === true)
          $state.go('tab.dash');
        else {
          console.log(data);
          localStorage.setItem("CliCod", data[0].CliCod);
          $state.go('cliente');
        }
        
        localStorage.setItem("UserLog", 1);

    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
          title: 'Acesso Negado!',
          template: data
      });
    });
  }

})

.controller('DashCtrl', function($scope) {})

.controller('ClienteCtrl', function($scope, $stateParams, Chats) {
 
  $scope.config = {
    // url_base: 'http://localhost/nutriel/restful/'
    url_base: 'http://bandmaker.esy.es/DeadCube/restful/'
  }

  $scope.loadItens = function(){
    Chats.getItens(localStorage.getItem("CliCod"), $scope.config.url_base).success(function(data){
      $scope.itens = data;
      console.log(data);
    });
  }

  $scope.loadItens();

})

.controller('ChatsCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $location, $stateParams, $ionicModal, Chats) {

  $scope.config = {
    // url_base: 'http://localhost/nutriel/restful/'
    url_base: 'http://bandmaker.esy.es/DeadCube/restful/'
  }

  $scope.clientes = {};

  $ionicLoading.show({
    template: '<p class="item-icon-center"><ion-spinner class="spinner-energized"></ion-spinner></p> Carregando...'
  })
  

  $scope.remove = function(id) {
    Chats.remove(id, $scope.config.url_base).success( function(data){
      if(data == 'OK') {
        $scope.loadClientes();
      } else {
        var alertPopup = $ionicPopup.alert({
      
          title: 'Ops ;(',
          template: 'Algo deu errado ao deletar este cliente.'
      
        });
      }
    });
  };

  $scope.loadClientes = function(){
    Chats.all($scope.config.url_base).success( function(data){
        $scope.chats = data;
        console.log(data);
        $ionicLoading.hide();
      });
  };

  $scope.loadClientes();
  
  $ionicModal.fromTemplateUrl('templates/modal-clientes.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  

  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.openModalClientes = function(CliCod) {
    $(document).ready(function(){
      $('.date').mask('00-00-0000');
    });
    $scope.modal.show();
  }

  $scope.alertPopup = function(msg) {
    var alertPopup = $ionicPopup.alert({
      
      title: 'Ops ;(',
      template: msg
  
    });
  }

  $scope.validarCliente = function() {

    var check = true;

    if($scope.clientes.nome == null || $scope.clientes.nome == '') {
      $scope.alertPopup('Campo Nome é obrigatório.');
      check = false;
    } else if($scope.clientes.cpf == null || $scope.clientes.cpf == '') {
      $scope.alertPopup('Campo CPF é obrigatório.');
      check = false;
    } else if($scope.clientes.genero == null || $scope.clientes.genero == '') {
      $scope.alertPopup('Campo Gênero é obrigatório.');
      check = false;
    } else if($scope.clientes.email == null || $scope.clientes.email == '') {
      $scope.alertPopup('Campo E-mail é obrigatório.');
      check = false;
    }

    return check;

  }

  $scope.salvarCliente = function() {

    if( $scope.validarCliente()) {
      console.log($scope.clientes);
      Chats.set($scope.clientes, $scope.config.url_base).success( function( data){
        console.log(data);
        if(data == 'false') {
        
          // $scope.closeModal();
          $scope.loadClientes();

          var alertPopup = $ionicPopup.alert({
        
            title: 'Sucesso!',
            template: 'Cliente cadastrado com sucesso.'
        
          });

          $scope.clientes = {};

        }
      });

    }
    

  }

})

.controller('ChatDetailCtrl', function($scope, $stateParams, $location, $ionicLoading, $ionicModal, $ionicPopup, Chats, Alimentos, DataDieta) {
  
  $(document).ready(function(){
    $('.time').mask('00:00');
    $('.date').mask('00-00-0000');

  });

  $scope.config = {
    // url_base: 'http://localhost/nutriel/restful/'
    url_base: 'http://bandmaker.esy.es/DeadCube/restful/'
  }

  $scope.dieta = {};

  $scope.itensDieta = {
    horario: null,
    qtd: null,
    obs: null, 
    CliCod: $stateParams.chatId,
    AliCod: $stateParams.alimentoId,
    AliDes: $stateParams.alimentoDes
  };

  $ionicLoading.show({
    template: '<p class="item-icon-center"><ion-spinner class="spinner-energized"></ion-spinner></p> Carregando...'
  })

  $ionicModal.fromTemplateUrl('templates/modal-editar-cliente.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/modal-itens-dieta.html', {
    scope: $scope,
    backdropClickToClose: false,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalItensDieta = modal;
  });


  $scope.openModalItensDieta = function(itensDieta) {


    DataDieta.set($scope.itensDieta);
    $scope.Itens = DataDieta.get();
    $scope.modalItensDieta.show();

    $scope.createDieta = function() {
      DataDieta.createDieta($scope.Itens, $scope.config.url_base);
      $location.path("/tab/chats/" + $stateParams.chatId);
      $scope.Itens = DataDieta.clearData();
      $scope.closeModalItens();
    }

    console.log($scope.Itens);
  }

  $scope.closeModalItens = function() {
    $scope.modalItensDieta.hide();
  }

  $scope.cancelItensDieta = function() {
    $scope.modalItensDieta.hide();
    $scope.Itens = DataDieta.clearData();
    // $location.path("/tab/chats/diet/" + $stateParams.chatId);
  }

  $scope.removeItemDieta = function(item) {
    DataDieta.itemRemove(item);
  }
  
  $scope.openModalEdit = function(CliCod) {
    $(document).ready(function(){
      $('.date').mask('00-00-0000');
    });

    $scope.modal.show();
  }
  $scope.closeModal = function() {
    $scope.modal.hide();
  }

  $scope.loadAlimentos = function(){
    Alimentos.all($scope.config.url_base).success( function(data){
      $scope.alimentos = data;
      $ionicLoading.hide();
    });
  };

  $scope.loadAlimentos();

  Chats.get($stateParams.chatId, $scope.config.url_base).success(function(data){
    $scope.chat = data;
    console.log(data);
  });

  $scope.editCliente = function() {

    console.log($scope.chat);
    Chats.edit($scope.chat, $scope.config.url_base).success( function( data){
      console.log(data);
      if(data == 'false') {
      
        var alertPopup = $ionicPopup.alert({
      
          title: 'Sucesso!',
          template: 'Cliente atualizado com sucesso.'
      
        });

      }
    })
  }


})

.controller('DietaItens', function($scope, $ionicPopup, $ionicLoading, $ionicModal, $stateParams, Chats) {
  $scope.config = {
    // url_base: 'http://localhost/nutriel/restful/'
    url_base: 'http://bandmaker.esy.es/DeadCube/restful/'
  }
  
  $ionicLoading.show({
    template: '<p class="item-icon-center"><ion-spinner class="spinner-energized"></ion-spinner></p> Carregando...'
  })

  $scope.remove = function(id) {
    Chats.removeItem(id, $scope.config.url_base).success( function(data){
      if(data == 'OK') {
        $scope.loadItens();
      } else {
        var alertPopup = $ionicPopup.alert({
      
          title: 'Ops ;(',
          template: 'Algo deu errado ao deletar este alimento.'
      
        });
      }
    });
  };

  $scope.loadItens = function(){
    Chats.getItens($stateParams.chatId, $scope.config.url_base).success(function(data){
      $scope.itens = data;
      $ionicLoading.hide();
      console.log(data);
    });
  }

  $scope.loadItens();

  

})

.controller('AccountCtrl', function($scope, $ionicPopup, $ionicLoading, $ionicModal, $stateParams, Alimentos) {
  
  $scope.config = {
    // url_base: 'http://localhost/nutriel/restful/'
    url_base: 'http://bandmaker.esy.es/DeadCube/restful/'
  }

  $scope.alimentos = {};

  $ionicLoading.show({
    template: '<p class="item-icon-center"><ion-spinner class="spinner-energized"></ion-spinner></p> Carregando...'
  })

  $scope.remove = function(id) {
    Alimentos.remove(id, $scope.config.url_base).success( function(data){
      if(data == 'OK') {
        $scope.loadAlimentos();
      } else {
        var alertPopup = $ionicPopup.alert({
      
          title: 'Ops ;(',
          template: 'Algo deu errado ao deletar este alimento.'
      
        });
      }
    });
  };

  $scope.checkObject = function(obj){
      return angular.equals({}, obj);
  };

  $scope.loadAlimentos = function(){
    Alimentos.all($scope.config.url_base).success( function(data){
      $scope.dataAlimentos = data;
      console.log(data);
      $ionicLoading.hide();
    });
  };

  $scope.getAlimentoById = function(id){
    Alimentos.get(id, $scope.config.url_base).success( function(data){
      $scope.alimento = data;
      console.log(data);
    });
  }

  $scope.getAlimentoById($stateParams.alimentoId);

  console.log($scope.alimento);


  $scope.loadAlimentos();

  $ionicModal.fromTemplateUrl('templates/modal-alimentos.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModalAlimentos = function() {
    $scope.modal.show();
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  }

  $scope.alertPopup = function(msg) {
    var alertPopup = $ionicPopup.alert({
      
      title: 'Ops ;(',
      template: msg
  
    });
  }

  $scope.validarAlimento = function() {

    var check = true;

    if($scope.alimentos.descricao == null || $scope.alimentos.descricao == '') {
      $scope.alertPopup('Campo Alimento é obrigatório.');
      check = false;
    } else if($scope.alimentos.tipo == null || $scope.alimentos.tipo == '') {
      $scope.alertPopup('Campo Tipo é obrigatório.');
      check = false;
    }

    return check;

  }

  $scope.salvarAlimento = function() {

    console.log($scope.alimentos);

    if($scope.validarAlimento() ) {
      Alimentos.set($scope.alimentos, $scope.config.url_base).success( function( data){
      
        if(data == 'false') {
        
          var alertPopup = $ionicPopup.alert({
        
            title: 'Sucesso!',
            template: 'Alimento cadastrado com sucesso.'
        
          });

          $scope.alimentos = {};
          $scope.loadAlimentos();
        }
      });
    }
    

  }

  $scope.editAlimento = function() {

    Alimentos.edit($scope.alimento, $scope.config.url_base).success( function( data){
      
      if(data == 'false') {
      
        var alertPopup = $ionicPopup.alert({
          title: 'Sucesso!',
          template: 'Alimento atualizado com sucesso.'  
        });

        $scope.loadAlimentos();
      }
    });
  }

  $scope.settings = {
    enableFriends: true
  };
});