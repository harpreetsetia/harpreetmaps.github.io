var flickrJSON;

//Binds click handler to flickr image to open modal
$("#flickr").click(function() {
    $(".modal").css("z-index", "3");
    $(".modal").show();
});

//Binds click handler to x button to close modal
$("#exit-modal").click(function() {
    $(".modal").css("z-index", "0");
    $(".modal").hide();
    $('.flickr-image-container img').hide();
    imagesAreSet = true;
});

//GET JSON from flickr
//Display message if error getting flickr JSON
function getFlickrImages() {
    var flickrUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=480beb3dcefd33c24129735289d66cae&text=New+Delhi&lat=28.6139&lon=77.2090&format=json&nojsoncallback=1&api_sig=7eed25c66b61e8f589641a36aa83f1aa';
    $.ajax({
        url: flickrUrl,
        dataType: 'json',
        jsonp: 'nojsoncallback',
        success: function(data) {
            var photo = data.photos.photo;
            flickrJSON = photo;
        },
        error: function() {
            $('.flickr-image-container').append('<h1 style="text-align: center;">Sorry!</h1><br><h2 style="text-align: center;">Flickr Images Could Not Be Loaded</h2>');
            $("#right-arrow").hide();
            $("#left-arrow").hide();

        }
    });
}
getFlickrImages();

var flickrPhotoArray = [];
var counter = 0;
var imagesAreSet = false;

//Get 25 random images from flickr JSON
//Store image data in flickrPhotoArray
//Hide all images except the first
function setFlickrImages() {
    if (imagesAreSet === false) {
        for (var i = 0; i < 25; i++) {
            var number = Math.floor((Math.random() * 10) + 1);
            var photo = 'https://farm' + flickrJSON[number].farm + '.staticflickr.com/' + flickrJSON[number].server + '/' + flickrJSON[number].id + '_' + flickrJSON[number].secret + '.jpg';
            flickrPhotoArray.push(photo);
            $('.flickr-image-container').append('<img id="flickr-image' + i + '" src="' + photo + '" alt="' + flickrJSON[number].title + ' Flickr Image">');
            $("#flickr-image" + i).hide();
            if (i < 1) {
                $("#flickr-image" + i).show();
            }
        }
    } else {
        $("#flickr-image" + counter).show();
    }
}
$("#flickr").click(setFlickrImages);

//Bind click handler to arrow button to view next image
function scrollForward() {
    $('#flickr-image' + counter).hide();
    counter += 1;
    if (counter >= 24) {
        counter = 0;
    }
    $('#flickr-image' + counter).fadeIn(300);
}

//Bind click handler to arrow button to view previous image
function scrollBackWard() {
    $('#flickr-image' + counter).hide();
    counter -= 1;
    if (counter < 0) {
        counter = 24;
    }
    $('#flickr-image' + counter).fadeIn(300);
}

$("#right-arrow").click(scrollForward);
$("#left-arrow").click(scrollBackWard);