function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(index);
    } else {
        // get coordinates from address
        // then call index by using the coordinates

    }
}

function index(position) {
    var x = position.coords.latitude + "," + position.coords.longitude;
    var link = "https://maps.google.com/?q=" + x + "&z=13&output=embed";
    document.getElementById('map').setAttribute('src', link);

    /*
        var str = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + x + '&radius=20000&type=restaurant&key=' + key
    
        $.ajax({
            url: '/places',
            type: 'POST',
            data: {
                str,
            },
        }).done(function (ret) {
            console.log(ret)
        })
    */

}

$(document).ready(function () {
    getLocation();
})