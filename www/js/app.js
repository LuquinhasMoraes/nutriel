// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.config(function($ionicConfigProvider){
  $ionicConfigProvider.views.transition('android');
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.icon('ion-chevron-left');
  $ionicConfigProvider.backButton.text('Voltar');
  $ionicConfigProvider.form.checkbox('circle');
  $ionicConfigProvider.tabs.style('striped');
  $ionicConfigProvider.navBar.alignTitle('center');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })

  .state('cliente', {
      url: '/cliente/:chatId',
      templateUrl: 'templates/view-cliente.html',
      controller: 'ClienteCtrl'
  })

  .state('ajuda', {
      url: '/ajuda',
      templateUrl: 'templates/ajuda.html',
      controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      cache: false,
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

      .state('tab.chat-diet', {
        url: '/chats/diet/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-diet.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

        .state('tab.chat-diet-itens', {
          url: '/chats/diet/itens/:chatId',
          views: {
            'tab-chats': {
              templateUrl: 'templates/chat-diet-itens.html',
              controller: 'DietaItens'
            }
          }
        })

        .state('tab.chat-diet-confirm', {
          url: '/chats/diet/confirm/:chatId/:alimentoId/:alimentoDes',
          views: {
            'tab-chats': {
              templateUrl: 'templates/chat-diet-confirm.html',
              controller: 'ChatDetailCtrl'
            }
          }
        })

  .state('tab.account', {
    url: '/account',
    cache: false,
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-edit', {
    url: '/account/edit/:alimentoId',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-edit-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
