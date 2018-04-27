'use strict';

var app = app ||  {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://herokuapp.com/ya-th';
ENV.developmenApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmenApiUrl;

(function(module){

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }
  
  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }
  
  Book.prototype.toSingleHtml = function() {
    let template = Handlebars.compile($('#book-detail-template').text());
    return template(this);
  }
  
  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
    .then(Book.loadAll)
    .then(callback)
    .catch(errorcallback);
  }
  
  Book.fetchOne = (ctx, callback) => {
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
    .then(results => ctx.book = results[0])
    .then(callback)
    .catch(errorcallback)
  }
  
  //Creates a book from a book instance and then redirects user to the homepage
  Book.create = book => {
    $.post(`${ENV.apiUrl}/api/v1/books`, book)
    .then(() => page('/'))
    .catch(errorcallback);
  }

  //Ajax call: Updates a book and redirects user to the updated book
  Book.update = (book, bookId) => {
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/books/${bookId}`,
      method: 'PUT',
      data: book,
    })
    .then(() => page(`/books/${bookId}`))
    .catch(errorcallback);
  }

  //Ajax call: Deletes book at id and redirects user to homepage
  Book.delete = bookId => {
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/books/${bookId}`,
      method: 'DELETE',
    })
    .then(() => page('/'))
    .catch(errorcallback);
  }

  function errorcallback(error) {
    console.error(error);
    module.errorView.initErrorPage(error);
  }

  module.Book = Book;

})(app)