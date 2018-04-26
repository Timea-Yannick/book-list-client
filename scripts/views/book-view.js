'use strict'
var app = app || {};


(function(module){
  const bookView = {};

  bookView.initIndexPage = () => {
    $('.book-view').show();
    $('#book-list').empty();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initDetailPage = () => {

  }

  module.bookView = bookView;
})(app)
