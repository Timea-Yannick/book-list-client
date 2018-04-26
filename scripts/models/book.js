'use strict';

var app = app ||  {};

const ENV = {};

console.log('please show me')
ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://herokuapp.com/ya-th';
ENV.developmenApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmenApiUrl;

(function(module){
  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }
  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  
  
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.prototype.toSingleHtml = function() {
    let template = Handlebars.compile($('#book-detail-template').text());
    return template(this);
  };
  
  Book.fetchAll = callback => {
    console.log('in book');

    $.get(`${ENV.apiUrl}/api/v1/books`)
    .then(Book.loadAll)
    .then(callback)
    .catch(errorcallback);
  };

  Book.fetchOne = (ctx, callback) => {
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
    .then(results => ctx.book = results[0])
    .then(callback)
    .catch(errorcallback)
  }

  Book.add = book => {
    $.post(`${ENV.apiUrl}/books/add`, book)
    .then(() => page('/'))
    .catch(errorcallback);
  };

  function errorcallback(error) {
    console.error(error);
    module.errorView.initErrorPage(error);
  }

  module.Book = Book;
})(app)