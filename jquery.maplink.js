(function ($) {
    $.fn.maplink = function (settings) {
        var map = null,
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
                    var point = new MPoint(config.markers[i].longitude, config.markers[i].latitude);

                    var icon = new MIcon();
                    icon.image = config.markers[i].icon.image;
                    icon.iconSize = new MSize(config.markers[i].icon.dimensions.x, config.markers[i].icon.dimensions.y);
                    icon.infoWindowAnchor = new MIconPoint(5, 5);

                    var marker = new MMarker(point, icon);
                    LBS.Event.addListener(marker, "click", function (i) {
                        return function (e) {
                            marker.openInfoWindowHtml(config.markers[i].html);
                            LBS.Event.stop(e);
                        }
                    }(i));
                    map.addMarker(marker);
                }
            }
        });
    };
}(jQuery));