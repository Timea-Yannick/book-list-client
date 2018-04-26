'use strict';
console.log('hi')

//Displaying list of books as home page
page('/', () => {
  console.log('in', app)
  app.Book.fetchAll(app.bookView.initIndexPage)
});

//Displaying single book
page('/book/:id', () => {
  app.Book.fetchOne(ctx, app.bookView.initBookPage)
});

//Displaying form
page('/add', () => app.booksView.initAddPage);

page();