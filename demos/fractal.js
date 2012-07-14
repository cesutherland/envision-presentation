envisionPresentation.fractal = function (container) {

  Flotr.addType('fractal', {
    options: {
      show: false // => setting to true will show lines, false will hide
    },
    /**
     * Draws lines series in the canvas element.
     * @param {Object} series - Series with options.lines.show = true.
     */
    draw : function (options) {

      if (!options.context.getImageData) return;

      var
        context   = options.context,
        width     = options.width,
        height    = options.height,
        range     = options.data,
        xScale    = options.xScale,
        yScale    = options.yScale,
        xMin      = range[0][0],
        xMax      = range[1][0],
        yMin      = range[0][1],
        yMax      = range[1][1],
        xPMin     = xScale(xMin),
        xPMax     = xScale(xMax),
        yPMin     = yScale(yMin),
        yPMax     = yScale(yMax),
        // Scale bounds based upon initial data:
        minRe     = (xMax - xMin) * (-xPMin) / (xPMax - xPMin) + xMin,
        maxRe     = (xMax - xMin) * (-xPMin + width) / (xPMax - xPMin) + xMin,
        minIm     = (yMax - yMin) * (-yPMin + height) / (yPMax - yPMin) + yMin,
        maxIm     = (yMax - yMin) * (-yPMin) / (yPMax - yPMin) + yMin,
        reFactor  = (maxRe - minRe) / (width - 1),
        imFactor  = (maxIm - minIm) / (height - 1),
        max       = 50,
        image     = context.getImageData(0, 0, width, height),
        data      = image.data,
        row, column, n, index,
        c_r, c_i, 
        z_r, z_i,
        z_r2, z_i2,
        inside, ratio;

      for (row = 0; row < height; row++) {

        c_i = maxIm - row * imFactor;

        for (column = 0; column < width; column++) {

          c_r = minRe + column * reFactor;
          z_r = c_r;
          z_i = c_i;
          inside = true;

          for (n = 0; n < max; n++) {
            z_r2 = z_r * z_r;
            z_i2 = z_i * z_i;
            if (z_r2 + z_i2 > 4) {
              inside = false;
              break;
            }

            z_i = 2 * z_r * z_i + c_i;
            z_r = z_r2 - z_i2 + c_r;
          }

          index = row * width * 4 + column * 4;
          ratio = n / max;
          data[index + 3] = 255;
          if (!inside) {
              data[index + 0] = 255 - 255 * ratio;
              data[index + 1] = 255 - 255 * ratio;
              data[index + 2] = 255;
          } else {
            data[index + 2] = 80;
          }
        }
      }

      context.putImageData(image, 0, 0);
    }
  });

  var
    E = Flotr.EventAdapter,
    fractalOptions = {
      name : 'fractal',
      data : [[-2, 1.2], [1, -1.2]],
      config : {
        fractal : {
          show : true
        },
        selection : {
          mode : 'xy'
        }
      },
      skipPreprocess : true
    },
    vis, zoom, zoomConfig;

  vis = new envision.Visualization();
  fractal = new envision.Component(fractalOptions);
  zoom = new envision.Interaction();

  vis
    .add(fractal)
    .render(container);

  zoom
    .group([fractal])
    .add(envision.actions.zoom, zoomConfig);

  console.log('here');
  return vis;
};
