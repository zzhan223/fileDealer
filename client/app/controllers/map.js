angular.module('treasureHunt.map', ['ngMap', 'ui.router'])
.controller('MapCtrl', ['$scope', '$location','$state', function($scope, $location, $state){
  $scope.geoCoords;

  $scope.initializeMap = function(){
    if(navigator&&navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(pos){
        var coords = pos.coords;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: coords.latitude, lng: coords.longitude},
            scrollwheel: true,
            zoom: 15
          });
        var myMarker;
        function placeMarker(location) {
          if ( myMarker ) {
            myMarker.setPosition(location);
          } else {
            myMarker = new google.maps.Marker({
              position: location,
              map: map,
              draggable: true
            });
          }
        };//placeMarker()
        placeMarker({lat: coords.latitude, lng: coords.longitude});

        myMarker.setPosition(map.getCenter());

        google.maps.event.addListener(map, 'click', function(event) {
              console.log(event.latLng);
              placeMarker(event.latLng);
            }); 
        // google.maps.event.addListener(myMarker, 'dragend', function (evt) {
        //       $scope.geoCoords.latitude = evt.latLng.lat().toFixed(3);
        //       $scope.geoCoords.latitude = evt.latLng.long().toFixed(3);
        //         // document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
        //     });
        // google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
        //       console.log("working")
        //       $scope.geoCoords.latitude = evt.latLng.lat();
        //       $scope.geoCoords.latitude = evt.latLng.long();
        //         // document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
        //     });
        map.setCenter(myMarker.position);
        myMarker.setMap(map);
        $scope.map = map;
        $scope.watchPosition = navigator.geolocation.watchPosition(function(loc){
          console.log('new position');
          if($scope.map && !$scope.$parent.mapShow){
            console.log('set position');
            $scope.map.setCenter(new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude));
          }
        });
      });//getCurrentPosition
      
    }//if
  };//initializeMap()

  $scope.setCoordinates = function(){
    $scope.$parent.mapShow = !$scope.$parent.mapShow;
  }

}]);