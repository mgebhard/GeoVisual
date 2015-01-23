$(document).ready(function() {
    var all_markers = []
    var autocomplete;
    var searchRadius = 5;
    var map;

    function Entity (typ, lat, lon, nam) {
      this.typ = typ;
      this.lat = lat;
      this.lon = lon;
      this.nam = nam
    }     

    var data = [new Entity("Account", 37.7944988, -122.3947445999999, "Salesforce"), 
                new Entity("Account", 37.555, -122.296, "Intel"),
                new Entity("Contact", 37.55, -122.399, "Tripti"), 
                new Entity("Contact", 37.66, -122.452, "Derek"), 
                new Entity("Contact", 37.65, -122.419, "Rebecca"), 
                new Entity("Contact", 37.59, -122.412, "Nick"),
                new Entity("Lead", 37.43, -122.41, "Daunish"), 
                new Entity("Lead", 37.493, -122.421, "Megan"),];

    function populate(map) {
        for (var i = 0; i < data.length; i++) {
          var entity = data[i];
          if (entity.typ == "Account") {
            var image = {
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              };
          } else if (entity.typ == "Contact") {
              var image = {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              };
          } else {
            var image = {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            };
          }
          var entityLatLong = new google.maps.LatLng(entity.lat,entity.lon);
          var marker = new google.maps.Marker({
            position: entityLatLong,
            map: map,
            animation: google.maps.Animation.DROP,
            title: entity.typ + ": " + entity.nam,
            icon: image
          });
          all_markers.push(marker);
        }
      }

      function findEntitiesBasedOnAddress() {
        var place = autocomplete.getPlace();
        if (place == null) {
            return false;
        }
        // If the input in radius is an int update the search radius default
        if (document.getElementById("radius").value % 1 === 0) {
          searchRadius = document.getElementById("radius").value;
        }
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
        // alert("LAT:" + latitude + "  LON:   " + longitude);
        updateMap(latitude, longitude);
        return false;
      }

      function findEntitiesBasedOnLatLon(form) {
        var latitude = (form.latitude.value);
        var longitude = (form.longitude.value);
        updateMap(latitude, longitude);

        form.longitude.value = "";
        form.latitude.value = "";
        return false;
      }

      function updateMap(latitude, longitude) {
        document.getElementById("closeResults").innerHTML = "";
        for (var i = 0; i < all_markers.length; i++) {
          var mark = all_markers[i];
          var geoDistanceInMiles = distanceInMilesBetweenTwoGeoPoints(latitude, longitude, 
                                    mark.position.lat(), mark.position.lng());
          if (geoDistanceInMiles < searchRadius) {
            var newSpan = document.createElement("span");
            newSpan.innerHTML = mark.getTitle() + " <br> " + geoDistanceInMiles.toFixed(2) + "miles away<br><br>";
            document.getElementById("closeResults").appendChild(newSpan);
            mark.setAnimation(google.maps.Animation.BOUNCE);

          } else {
            mark.setAnimation(null);
          }
        }
        updateMapZoom(latitude, longitude);
      }

      function updateMapZoom(lat, lon){
        map.setCenter(new google.maps.LatLng(lat,lon));
        var myLatLng = new google.maps.LatLng(lat,lon);
        var circleOptions = {
          center: myLatLng,
          fillOpacity: 0,
          strokeOpacity:0,
          map: map,
          radius: searchRadius * 1609.36,
        }
      var myCircle = new google.maps.Circle(circleOptions);
      map.fitBounds(myCircle.getBounds());
      }

      function toRad(Value) {
        return Value * Math.PI / 180;
      }


      // Haversine Formula to calculate miles between to Geo Points
      function distanceInMilesBetweenTwoGeoPoints(lat1, lon1, lat2, lon2){
        var R = 3963.1676
        // Earth's radius in miles
        var d1 = toRad(lat1);
        var d2 = toRad(lat2);
        var a1 = toRad((lat2-lat1));
        var a2 = toRad((lon2-lon1));
        var a = Math.sin(a1/2) * Math.sin(a1/2) +
                Math.cos(d1) * Math.cos(d2) *
                Math.sin(a2/2) * Math.sin(a2/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d
      }

      function initialize() {
        var mapOptions = {
          center: { lat: 37.794192, lng: -122.394884},
          zoom: 9,
          // mapTypeId: 'satellite'
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('place'));
        autocomplete.bindTo('bounds', map);
        populate(map);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
});
