'use strict'
var app = app || {};
console.log('in book view');


(function(module){
  const bookView = {};

  bookView.initIndexPage = () => {
    console.log('firing');
    
    $('.container').hide();
    $('#book-view').show();
    module.Book.all.forEach(book => $('#book-list').append(book.toHtml()));
    console.log(module.Book.all);
  }

  // bookView.setTeasers = () => {


  bookView.initBookPage = (ctx) => {
    $('.container').hide();
    $('#detail-view').show();
    module.Book.all.forEach(book => {
      if(parseInt(book.book_id) === parseInt(ctx.params.id)) {
        $('.book-detail').append(book.toSingleHtml());
      }
    }); 
  } 

  bookView.initAddPage = () => {
    console.log('i have been clicked')
    $('.container').hide();
    $('#new-book').show();
  }
  module.bookView = bookView;
})(app)
