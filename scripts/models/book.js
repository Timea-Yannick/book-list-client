'use strict'

var app = app ||  {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://herokuapp.com/ya-th';
ENV.developmenApiUrl = 'https://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmenApiUrl;

(function(module){
  function errorcallback(error) {
    console.error(error);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Boook.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback => 
  $.get(`${ENV.apiUrl}/api/v1/books`)
  .then(Book.loadAll)
  .then(callback)
  .then(errorcallback);
})