function getFlickrImages(){var r="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=480beb3dcefd33c24129735289d66cae&text=New+Delhi&lat=28.6139&lon=77.2090&format=json&nojsoncallback=1&api_sig=7eed25c66b61e8f589641a36aa83f1aa";$.ajax({url:r,dataType:"json",jsonp:"nojsoncallback",success:function(r){var e=r.photos.photo;flickrJSON=e},error:function(){$(".flickr-image-container").append('<h1 style="text-align: center;">Sorry!</h1><br><h2 style="text-align: center;">Flickr Images Could Not Be Loaded</h2>'),$("#right-arrow").hide(),$("#left-arrow").hide()}})}function setFlickrImages(){if(imagesAreSet===!1)for(var r=0;25>r;r++){var e=Math.floor(10*Math.random()+1),c="https://farm"+flickrJSON[e].farm+".staticflickr.com/"+flickrJSON[e].server+"/"+flickrJSON[e].id+"_"+flickrJSON[e].secret+".jpg";flickrPhotoArray.push(c),$(".flickr-image-container").append('<img id="flickr-image'+r+'" src="'+c+'" alt="'+flickrJSON[e].title+' Flickr Image">'),$("#flickr-image"+r).hide(),1>r&&$("#flickr-image"+r).show()}else $("#flickr-image"+counter).show()}function scrollForward(){$("#flickr-image"+counter).hide(),counter+=1,counter>=24&&(counter=0),$("#flickr-image"+counter).fadeIn(300)}function scrollBackWard(){$("#flickr-image"+counter).hide(),counter-=1,0>counter&&(counter=24),$("#flickr-image"+counter).fadeIn(300)}var flickrJSON;$("#flickr").click(function(){$(".modal").css("z-index","3"),$(".modal").show()}),$("#exit-modal").click(function(){$(".modal").css("z-index","0"),$(".modal").hide(),$(".flickr-image-container img").hide(),imagesAreSet=!0}),getFlickrImages();var flickrPhotoArray=[],counter=0,imagesAreSet=!1;$("#flickr").click(setFlickrImages),$("#right-arrow").click(scrollForward),$("#left-arrow").click(scrollBackWard);