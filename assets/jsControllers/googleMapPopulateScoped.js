window.gmd = {
	interactMap: {
		panToPosition: function(latMap, lngMap){
			var jacksonCounty = new google.maps.LatLng(latMap, lngMap);
			var marker = new google.maps.Marker({
			    position: jacksonCounty,
			    icon: '../images/icon-map-new-small.png',
			    map: window.map,
			    title: 'Hello World!'
			});
			window.map.panTo(jacksonCounty);
		}
	},
	populateMap : function (latMap, lngMap){
		var poly;
		window.map;
		var marker;
		var markers = [];
		var initialMakerPoint;
		var masterCount = 0;
		var masterLatLng;
		var infowindow = null;
		var jacksonCounty = new google.maps.LatLng(latMap, lngMap);


	    setTimeout(function(){
	    	window.map = new google.maps.Map(document.getElementById('map-canvas'), {
				center: jacksonCounty,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.HYBRID
			});

			var marker = new google.maps.Marker({
			    position: jacksonCounty,
			    map: window.map,
			    icon: '../images/icon-map-new-small.png',
			    title: 'Hello World!'
			});

	    	populateMap();
	   
		    var hasLoadedOnce = false;
		    google.maps.event.addListener(window.map, 'idle', function() {
		    	if (!hasLoadedOnce){
		    		setTimeout(function(){
			    		$( ".dash-left-inter-margin" ).slideDown( "slow", function() {
						    	//google.maps.event.trigger(map, 'resize');
						    	$( ".dash-center" ).show();
						    	google.maps.event.trigger(map, 'resize');
						    	$( ".dash-right-inter-margin" ).slideDown( "slow", function() {
								    $( ".options-inter-margin" ).show();
								});
							
						});
		    		},300);
		    	}
		    	hasLoadedOnce = true;
			});
		},1300);

	    function populateMap(){
		    layer = new google.maps.FusionTablesLayer({
		    query: {
		      select: 'geometry',
		      from: '1w27IrwI0eK0nr9_dXm70L56EnzGpb6t_4HC1XZ_a'
		    },
		    styles: [{
		      polygonOptions: {
		      	strokeColor: '#0d6a92',
		      	strokeOpacity: 1,
    			strokeWeight: 1,
		        fillColor: '#0d6a92',
		        fillOpacity: 0.5
		      }
		    }]
		  });
		  layer.setMap(window.map);

		  google.maps.event.addListener(layer, 'click', function(e) {

		    if (e.row['FEEOWNER'].value){
		    	var feeOwner = e.row['FEEOWNER'].value;
		    } else {
		    	var feeOwner = 'unavailable';
		    }
		    if (e.row['ACREAGE'].value){
		    	var acreage = e.row['ACREAGE'].value;
		    } else {
		    	var acreage = 'unavailable';
		    }
		    if (e.row['LANDVALUE'].value){
		    	var landValue = e.row['LANDVALUE'].value;
		    } else {
		    	var landValue= 'unavailable';
		    }

		    e.infoWindowHtml = "<div style='width:300px;'><h5>Fee Owner: " + feeOwner + "</h5>";
		    e.infoWindowHtml += "<hr/><a href='javascript:void(0);' data-result-index='288' class='btn btn-primary pull-right left-open'>Full Information</a>";
      		e.infoWindowHtml += "<div style='pull-left'><b>Acreage: </b>" + acreage + "<br/>";
      		e.infoWindowHtml += "<b>Value: </b>$" + landValue + "</div><br/><br/><div style='clear:both;'></div>";
      		e.infoWindowHtml += "</div>";
		    
		    console.log(e.row);
		    window.g.mapRowData = e.row;
		   
		  });
		}
	}
};