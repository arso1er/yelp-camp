$(document).ready(function() {
	var $grid = $('.grid').imagesLoaded( function() {
  		// init Masonry after all images have loaded
  		$grid.masonry({
    		// options...
    		itemSelector: '.grid-item', // use a separate class for itemSelector, other than .col-
  			columnWidth: '.grid-item'
  		});
	});
});

