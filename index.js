let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [32, 42],
    iconAnchor: [0, 0]
  });

let marker = L.marker([51.505,-0.09], {icon: customIcon}).addTo(map);


$('#input-text').keypress((event) =>{
    if(event.keyCode === 13){
        $('#submit').click();
    }
});

$('#submit').click(() => {
    let address = $('#input-text').val();
    $.ajax({
        url: 'https://geo.ipify.org/api/v2/country,city?apiKey=at_dmKvPKiqp8lsWtSMJjRl72bZSu35S&ipAddress=' + address,
        method: 'GET',
        dataType: 'json',
        success: (response) => {

            lat = response.location.lat;
            lng = response.location.lng;
            map.setView([lat, lng], 13);
            marker.setLatLng([lat,lng]);
            $('#ip-text').text(response.ip);
            $('#location-text').text(response.location.city + ', ' + response.location.region + ' ' + response.location.postalCode);
            $('#timezone-text').text('UTC' + response.location.timezone);
            $('#isp-text').text(response.isp);
        },
        error: (xhr, status, error) => {
            $('#ip-text').text('Error, please input a valid IP address');
            $('#location-text').text('Error, please input a valid IP address');
            $('#timezone-text').text('Error, please input a valid IP address');
            $('#isp-text').text('Error, please input a valid IP address');
        }
      });
});