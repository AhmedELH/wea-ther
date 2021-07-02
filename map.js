navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;


    var mymap = L.map('mapid').setView([lat, long], 9);
    const myKey = "9fd7e84f84626f28199be3bc384da8f9";


    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);


    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("Weather at " + e.latlng.toString())
            .openOn(mymap);
        latitude = e.latlng.lat;
        longitude = e.latlng.lng;

        api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${myKey}`;
        apix = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${myKey}`;


        weatherUpdate();
        
    }

    mymap.on('click', onMapClick);
});


