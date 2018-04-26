'use strict';
let app = app || {};

(function(module){
  var errorView = {};

  let err = {
    status: 404,
    message: "Page not found"
  }

  errorView.initErrorPage = error => {
    $('.container').hide()
    $('.error-view').show();
    $('#error-message').empty();
  }

  //Ask maddie about this handlebar template
  var template = Handlebars.compile($('#error-template').text());

  $('#error-message').append(template(error));

  errorView.errorCallback = error => {
    console.error(error);
  }

  module.errorView = errorView;
})(app)