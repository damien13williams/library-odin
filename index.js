
// Array to store all the books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add a book to the library array
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks(); // Update display after adding
}

// Function to display books
function displayBooks() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = ""; // Clear the library before displaying

  myLibrary.forEach((book, index) => {
    // Create the book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index", index);

    // Add book details to the card
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>by ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: <span class="status">${book.read ? "Yes" : "No"}</span></p>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-btn">Toggle Read Status</button>
    `;

    // Add event listener for remove button
    bookCard.querySelector(".remove-btn").addEventListener("click", function() {
      removeBook(index);
    });

    // Add event listener for toggle read button
    bookCard.querySelector(".toggle-read-btn").addEventListener("click", function() {
      toggleReadStatus(index);
    });

    // Append the card to the library
    libraryContainer.appendChild(bookCard);
  });
}

// Remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1); // Remove book from array
  displayBooks(); // Update display
}

// Toggle the read status of a book
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks(); // Update display after toggling status
}

// Event listener for form submission
document.getElementById("book-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get input values
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = document.getElementById("book-read").checked;

  // Add book to the library
  addBookToLibrary(title, author, pages, read);

  // Reset and hide the form
  document.getElementById("book-form").reset();
  document.getElementById("book-form").style.display = "none";
});

// Show the form when "New Book" button is clicked
document.querySelector(".button").addEventListener("click", function() {
  document.getElementById("book-form").style.display = "block";
});

// Example: Manually add some books to the library for display
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);