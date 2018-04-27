'use strict';
console.log('hi')

//Displaying list of books as home page
page('/', () => {
  console.log('in', app)
  app.Book.fetchAll(app.bookView.initIndexPage)
});

//Displaying single book
page('/books/:id', (ctx, next) => {
  console.log('in here', ctx);
  
  app.Book.fetchOne(ctx, app.bookView.initBookPage)
});

//Displaying form
page('/add', (ctx, next) => app.bookView.initAddPage);

page();