$(function () {

  function example (container) {

    var
      V = envision,
      summaryTicks = financeData.summaryTicks,
      options, vis;

    container = container || document.getElementById('demo');

    options = {
      container : container,
      data : {
        price : financeData.price,
        volume : financeData.volume,
        summary : financeData.price
      },
      trackFormatter : function (o) {

        var
          data = o.series.data,
          index = data[o.index][0],
          value;

        value = summaryTicks[index].date + ': $' + summaryTicks[index].close + ", Vol: " + summaryTicks[index].volume;

        return value;
      },
      xTickFormatter : function (index) {
        var date = new Date(financeData.summaryTicks[index].date);
        return date.getFullYear() + '';
      },
      // An initial selection
      selection : {
        data : {
          x : {
            min : 100,
            max : 200
          }
        }
      }
    };

    vis = new envision.templates.Finance(options);

    return vis;
  }

  var
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
      graph = example($graph);
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

  $('#step2').one('impress:stepenter', function () {


    example($(this).find('.graph'));
  });
});
