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
myApp.controller('Demo',function($scope) {  
    $scope.name="Prashanth";
   $scope.hello=[
   'John',
   'Jason',
   'Jared'
   ];
    
});

//$parse service allows you to 
//You can read out of the scope using Watch and write using parse.
myApp.directive('demoGreet',function($parse) {  
//Rarely compileFn is used. It has no access to scope. Used for compiling the template. Nothing else
//All if not any DOM manipulation should be happening in the Directives. Directive is the glue between DOM and scope
return{
    //restrict by Attribute or Class. This is if you want to use directive declaration as a class attribute in the div tag like <div class="demo-greet:name">
    //You'll probably want to do this if you want to use bootstrap css. Bootstrap CSS class will give the design and the angular will give behavior.
       restrict: 'AC',
    link: function LinkFn(scope,lElement,attrs){
        
        scope.$watch(attrs.demoGreet,function(name){
              lElement.text('Hello World'+' '+name);
        });
        lElement.bind('click',function(){
            console.log('click');
            
             scope.$apply(function(){
                 
                 $parse(attrs.demoGreet).assign(scope,'abc');
             });
        }
   
);
        
    }
};
    
});