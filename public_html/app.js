window.onload=function(){
    var $rootElement = angular.element(window.document);
    var modules=[
        //Main module of Angular
        'ng',
        //Module for this application declared down belo (around line 19 var myapp=...
        'myApp',
        //Basically tells the module system where the root element 
        function($provide){
            $provide.value('$rootElement',$rootElement);
        }
    ];
    //Everything in angular is DI'ed.  Create only one inject per app!
    var $injector = angular.injector(modules);   
    //From the inject we get a hold of the compile service. It traverses the DOM starting at the root element and
    // it looks for directives. It then executes the directives' compile function.
    var $compile = $injector.get('$compile');
    //Collection of all the linking functions in the system. Idea is similar to that of compiling and linking object
    //in C language.
    //In the first phase, we are looking for directives.. i.e the compile phase.
    //Once we locate all the directives, we have a linking phase which attaches it to the $scope
    var compositeLinkFn = $compile($rootElement);
    // We get a hold of the root scope. Every app has one root scope.
    var $rootScope = $injector.get('$rootScope');
    // We call the the compositeLinkFn with the root scope
    compositeLinkFn($rootScope);
    // And we kick off Angular.
    $rootScope.$apply();
};
var myApp = angular.module('myApp',[]);
myApp.controller('Demo',function($rootScope) {  
   $rootScope.hello='hello world';
    $rootScope.bollo='pollo';
});