var test=angular.module('myApp',[])
.directive('ezClock',function(){
  return {
    restrict:'AEC',
    replace:true,
    templateUrl:'ezClock.html',
    link:function(scope,element,attrs){
       setInterval(function(){
         var date= new Date();
         element.text(date.toString());
       },1000);
    }
  }
})
