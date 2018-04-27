'use strict'
var app = app || {};

(function(module){

  const bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('#book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml()));
  }

  // bookView.setTeasers = () => {

  bookView.initBookPage = () => {
    $('.container').hide();
    $('#detail-view').show();
    $('.book-detail').empty();
    
    module.Book.all.forEach(book => {
      if(parseInt(book.book_id) === parseInt(ctx.params.id)) {
        $('.book-detail').append(book.toSingleHtml());
      }
    }); 
  }
  
  bookView.initAddPage = () => {
    $('.container').hide();
    $('#new-book').show();
  }

  module.bookView = bookView;

})(app)
