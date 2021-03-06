requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    animatedGif: 'Animated_GIF/src/Animated_GIF',
    getUserMedia: 'getUserMedia/getusermedia.bundle',
    imagesloaded: 'imagesloaded/imagesloaded',
    jade: 'jade/runtime',
    jquery: 'jquery/jquery',
    jqueryui: 'jquery-ui/ui/jquery-ui',
    js: '../_fe/js',
    json: '../_fe/json',
    komponent: 'komponent/komponent',
    lodash: 'lodash/lodash',
    main: '../_fe/js/main',
    neuquant: 'Animated_GIF/src/NeuQuant',
    omggif: 'Animated_GIF/src/omggif',
    uuid: 'node-uuid/uuid',
    templates: '../_fe/compiled/jade-templates',
    text: 'text/text',
    config: '../_fe/js/config'
  }
});

require([
  'js/device',
  'jquery',
  'js/tiles',
  'js/database',
  'js/localstrings',
  'js/render'
], function (device, $, tiles, db, localStrings, render) {
  var servicesToLoad = 2;
  var servicesLoaded = 0;

  function initUI() {
    if (servicesLoaded === servicesToLoad) {
      var $body = $('body');
      var $tileContainer = $(render('tile-container'));

      $body.append(render('header', {
        avatarSrc: db.get('avatarSrc'),
        name: db.get('realName'),
        username: db.get('username')
      }));

      $body.append($tileContainer);

      tiles.init($tileContainer);
      tiles.render(db.get('makes'));
    }
  }

  // Set up device characteristics and feature detection
  device.init();

  // Initialize UI after localization strings load
  localStrings.on('load', function () {
    servicesLoaded++;
    initUI();
  });

  // TODO - Sniff locale instead of hard coding
  localStrings.init('en-us');

  // Initialize database
  db.on('load', function () {
    servicesLoaded++;
    initUI();
  });

  // TODO - Sniff username from subdomain instead of hardcoding
  db.init('reanimator');
});
