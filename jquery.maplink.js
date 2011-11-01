(function ($) {
    'use strict';
    $.fn.maplink = function (settings) {
        var map = null,
            config = {
                latitude: -23.5489433,
                longitude: -46.6388182,
                zoom: 4,
                infoWindowHtml: ''
            };
        if (settings) {
            $.extend(config, settings);
        }

        return this.each(function () {
            map = new MMap2(document.getElementById(this.id));
            map.addControl(new MMapControls());
            map.addControl(new GLargeMapControl());

            var marker = new MMarker(new MPoint(config.longitude, config.latitude));
            LBS.Event.addListener(marker, "click",
                function (e) {
                    marker.openInfoWindowHtml(config.infoWindowHtml);
                    LBS.Event.stop(e);
                });
            map.addMarker(marker);
            map.setCenter(new MPoint(config.longitude, config.latitude), config.zoom);
        });
    };
}(jQuery));