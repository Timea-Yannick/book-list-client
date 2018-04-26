'use strict'

var bookView = {};

// Define a method on bookView called initIndexPage which hides any element with a class of container, shows any element with a class of book-view, and maps over the Book instances stored in Book.all to render each and append them to an element with the id of book-list.
// Using jQuery's Document.ready functionality, invoke Book.fetchAll when the DOM has loaded, and pass bookView.initIndexPage as it's argument.