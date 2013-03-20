(function ($) {
    var map = null;
    $.fn.removeAllMarkers = function () {
      map.removeAllMarkers();
    };
    $.fn.addMarker = function (marker) {
      addMarker(marker);
    };
    $.fn.maplink = function (settings) {
            config = {
                latitude: -23.5505233,
                longitude: -46.6342982,
                zoom: 10,
                infoWindowHtml: '',
                showMarker: true,
                markers: null
            };
        if (settings) {
            $.extend(config, settings);
        }

        return this.each(function () {
            map = new MMap2(document.getElementById(this.id));
            map.addControl(new MMapControls());
            map.addControl(new GLargeMapControl());
            if (config.showMarker === true) {
                var marker = new MMarker(new MPoint(config.longitude, config.latitude));
                LBS.Event.addListener(marker, "click", function (e) {
                    marker.openInfoWindowHtml(config.infoWindowHtml);
                    LBS.Event.stop(e);
                });
                map.addMarker(marker);
            }
            map.setCenter(new MPoint(config.longitude, config.latitude), config.zoom);
            if (config.markers !== null) {
                for (var i in config.markers) {
                  addMarker(config.markers[i]);
                }
            }
        });
    };

    addMarker = function (marker) {
      var point = new MPoint(marker.longitude, marker.latitude);

      var icon = new MIcon();
      icon.image = marker.icon.image;
      icon.iconSize = new MSize(marker.icon.dimensions.x, marker.icon.dimensions.y);
      icon.infoWindowAnchor = new MIconPoint(5, 5);

      var mmarker = new MMarker(point, icon);
      LBS.Event.addListener(mmarker, "click", function (e) {
        mmarker.openInfoWindowHtml(marker.html);
        LBS.Event.stop(e);
      });
      map.addMarker(mmarker);
    }
}(jQuery));
