//Book Constructor.

function Book( title, author, isbn ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor.
function UI() {}

UI.prototype.addBookToList = function( book ) {

    const list = document.getElementById( 'book-list' );
    //Create tr element

    const row = document.createElement('tr');

    //Insert cols
    row.innerHTML = `
    <td> ${book.title}</td>
    <td> ${book.author}</td>
    <td> ${book.isbn}</td>
    <td><a href="#" class="delete">Delete<a></td>
    `;
    list.appendChild( row );
}

//show allert
UI.prototype.showAlert = function( message, className ) {
    //Create Div
    const div = document.createElement( 'div');
    //Add Classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild( document.createTextNode( message ));
    //Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form' );
    //Insert alert
    container.insertBefore(div, form);

    //timeout after 3 seconds
    setTimeout( function() {
document.querySelector('.alert' ).remove();
    }, 3000);
}


//Delete book
UI.prototype.deleteBook = function( target ) {
    if( target.className === 'delete' ) {
        target.parentElement.parentElement.remove();
    }
}
//Clear fields
UI.prototype.clearFields = function() {
    document.getElementById( 'title' ).value = ' ';
    document.getElementById( 'author' ).value = ' ';
    document.getElementById( 'isbn' ).value = ' ';
}


//Event Listeners for add book
document.getElementById( 'book-form' ).addEventListener( 'submit',
function( e ) {
    //Get form values.
const title = document.getElementById( 'title' ).value,
    author = document.getElementById('author' ).value,
    isbn = document.getElementById( 'isbn' ).value
    console.log(title, author,isbn);

//Instantiate a book
const book = new Book( title , author , isbn );

//Intanstiate a UI object
const ui = new UI();


//Validate

if( title  === '' || author === '' || isbn === '' ) {
 //Error allert

 ui.showAlert( 'Please fill in all fields', 'error' );
} else {
    //Add book to list
ui.addBookToList(book);

//Show the success
ui.showAlert('Book Added!', 'success' );

//Clear fields
ui.clearFields();

}
e.preventDefault();
});

//Event listener for delete.


document.getElementById('book-list').addEventListener('click', function(e) {
const ui = new UI();

//Delete book.
    ui.deleteBook(e.target);

    //Show alert message

    ui.showAlert('Book Removed!' , 'success' );
e.preventDefault();
});
