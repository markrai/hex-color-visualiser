'use strict';

(function startVisualiser() {
    /*
     * Start visualiser
     *
     * Gets an array of hex codes to be displayed
     */
    $('.btn-primary').on('click', function(e) {
        e.preventDefault();

        var $tilesContainer = $('.tiles'),
            $toggleDetails = $('<button class="btn btn-default">Toggle details</button>'),
            $lines = $('textarea').val().split(/\n/),
            arrayOfColorObjects = [];

        for (var i=0; i < $lines.length; i++) {
          // only push this line if it contains a non whitespace character.
          if (/\S/.test($lines[i])) {
              arrayOfColorObjects.push({
                  hex: $.trim($lines[i])
              });
          }
        }

        // Empty first
        $tilesContainer.empty();

        $.each(arrayOfColorObjects, function(index, value) {
            var rgb = hexToRgb(value.hex);
            if (!rgb) {
                return;
            }

            var red = rgb.r,
                green = rgb.g,
                blue = rgb.b,
                tile = '<li class="tile" style="background-color:' + value.hex + ';">' +
                           '<div class="tile-details">' +
                               '<p class="tile-hex">Hex: <code>' + value.hex + '</code></p>' +
                               '<p class="tile-rgb">RGB: <code class="red">' + red + '</code> <code class="green">' + green + '</code> <code class="blue">' + blue + '</code></p>' +
                           '<div>' +
                       '</li>';

            $tilesContainer.append(tile);
        });

        // Make the tiles sortable manually
        $tilesContainer.sortable();
        $tilesContainer.disableSelection();

        // Update button text
        $(this).text('Update...');

        if($('.btn-default').length === 0) {
            $(this).after($toggleDetails);
        }

        $toggleDetails.on('click', function(e) {
            e.preventDefault();

            $tilesContainer.toggleClass('tile-details-visible');
        });
    });
})();

function hexToRgb(hex) {
    /*
     * Hex to RGB
     *
     * Convert hex to rgb
     *
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     */
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
