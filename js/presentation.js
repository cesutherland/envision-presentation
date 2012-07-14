var envisionPresentation = {};
$(function () {
  var
    demos = envisionPresentation,
    $envision = $('#envision');

  // Slide 1
  (function () {
    var
      graph;
    $('#envision-1').one('impress:stepenter', function () {
      var
        $graph = $envision.find('.graph');
      $envision.find('li.one').fadeIn();
      $graph.fadeIn();
      graph = demos.finance($graph);
    });
    $('#envision-2').one('impress:stepenter', function () {
      var
        offset = 0;
      setTimeout(function () {
      $('#envision li.two').fadeIn();
      function animate () {

        var n = Math.cos(offset);

        graph.summary.trigger('select', {
          data : {
            x : {
              min : 100,
              max : 300 - n * 100
            }
          }
        });

        offset += .1;

        if (offset < Math.PI) {
          setTimeout(animate, 20);
        }
      }

      animate();
      }, 350);
    });
    $('#envision-3').one('impress:stepenter', function () {
      $('#envision li.three').fadeIn();
    });
  })();

  $('#finance').one('impress:stepenter', function () {
    demos.finance($(this).find('.graph'));
  });

  // Million
  $('#million').one('impress:stepenter', function () {
    demos.million($(this).find('.graph'));
    $('#million').one('click', function () {
      $(this).find('pre').fadeIn();
    });
  });
  $('#crazy').one('impress:stepenter', function () {
    demos.million($(this).find('.graph'), true);
    $('#crazy').one('click', function () {
      $(this).find('pre').fadeIn();
    });
  });
  $('#minmax').one('impress:stepenter', function () {
    demos.million($(this).find('.graph'), true, true);
  });

  // Weierstrass
  $('#weierstrass').one('impress:stepenter', function () {
    demos.weierstrass($(this).find('.graph'));
  });
  $('#generator').one('impress:stepenter', function () {
    demos.weierstrass($(this).find('.graph'), true);
  });

  // Fractal
  $('#fractal').one('impress:stepenter', function () {
    demos.fractal($(this).find('.graph'), true);
  });

});
