/**
 * @container Element
 */
function example (container) {

  // Configuraiton
  var
    priceOptions = {
      name    : 'price',
      data    : financeData.price,
      flotr   : {
        'lite-lines' : {
          lineWidth : 1,
          show : true,
          fill : true,
          fillOpacity : 0.2
        },
        mouse : {
          track: true,
          trackY: false,
          trackAll: true,
          sensibility: 1,
          trackDecimals: 4,
          trackFormatter: function (o) {
            var data = financeData.summaryTicks[o.nearest.x];
            return data.date + " Price: " + data.close + " Vol: " + data.volume;
          },
          position: 'ne'
        },
        yaxis : { 
          noTicks : 3,
          showLabels : true,
          min : 0,
          tickFormatter : function (n) {
            return (n == this.max ? false : '$'+n);
          }
        }
      }
    },

    volumeOptions = {
      name    : 'volume',
      data    : financeData.volume,
      flotr   : {
        whiskers : {
          show : true 
        },
        mouse: {
          track: true,
          trackY: false,
          trackAll: true,
          position: 'ne',
          trackDecimals: 0
        }
      }
    },

    summaryOptions = {
      name    : 'summary',
      data    : financeData.price,
      flotr   : {
        'lite-lines' : {
          show : true,
          lineWidth : 1,
          fill : true,
          fillOpacity : 0.2,
          fillBorder : true
        },
        xaxis : {
          noTicks: 5,
          showLabels : true,
          tickFormatter : function (n) {
            return financeData.summaryTicks[n].date.split(' ')[2];
          }
        },
        yaxis : {
          autoscale : true,
          autoscaleMargin : 0.1
        },
        handles   : { show : true },
        selection : { mode : 'x'},
        grid : {
          verticalLines : false
        }
      }
    },

    connectionOptions = {
      name : 'connection',
      drawing : envision.QuadraticDrawing
    };

  // Application
  var
    vis         = new envision.Visualization(),
    price       = new envision.Component(priceOptions),
    volume      = new envision.Component(volumeOptions),
    connection  = new envision.Component(connectionOptions),
    summary     = new envision.Component(summaryOptions),
    selection   = new envision.Interaction(),
    hit         = new envision.Interaction();

  // Build Visualization
  vis
    .add(price)
    .add(volume)
    .add(connection)
    .add(summary)
    .render(container);

  // Wire up selection
  selection
    .follower(price)
    .follower(volume)
    .follower(connection)
    .leader(summary)
    .add(envision.actions.selection);

  // Wire up hit
  hit
    .group([price, volume])
    .add(envision.action.hit);

  return vis;
}
