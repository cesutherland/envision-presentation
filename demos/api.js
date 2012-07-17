envisionPresentation.api = function (container) {

  var options = {
    container : container,
    data : {
      detail : financeData.price,
      summary : financeData.price
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

  return new envision.templates.TimeSeries(options);

  return vis;
}
