
const myLibrary = [];
let isEditing = false; 
let editingIndex = null; 

// Test cases
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 218, true, 5);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false, 4);
addBookToLibrary("1984", "George Orwell", 328, true, 3);

function Book(title, author, pages, read, stars) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.stars = stars;
}

function filterByCategory(books, filterOption) {
  if (filterOption === "highToLow") {
    return [...books].sort((a, b) => b.pages - a.pages); // Sort by pages high to low
  } else if (filterOption === "lowToHigh") {
    return [...books].sort((a, b) => a.pages - b.pages); // Sort by pages low to high
  } else if (filterOption === "title") {
    return [...books].sort((a, b) => a.title.localeCompare(b.title)); // Sort by title alphabetically
  } else if (filterOption === "author") {
    return [...books].sort((a, b) => a.author.localeCompare(b.author)); // Sort by author alphabetically
  } else if (filterOption === "stars") {
    return [...books].sort((a, b) => b.stars - a.stars); // Sort by stars high to low
  }
  return books; // If 'none' is selected, return the books as is
}

// Add a book to the library
function addBookToLibrary(title, author, pages, read, stars) {
  const book = new Book(title, author, pages, read, stars);
  myLibrary.push(book);
  displayBooks(); // Update display after adding
}

// Display books in the library 
function displayBooks() {
  const libraryContainer = document.getElementById("library");
  libraryContainer.innerHTML = ""; // Clear previous display

  const filterOption = document.getElementById("filter").value;
  const booksToDisplay = filterByCategory(myLibrary, filterOption);

  booksToDisplay.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index", index); // Use index instead of actualIndex

    // Create a string to represent stars
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= book.stars ? '&#9733;' : '&#9734;'; // Filled or empty stars
    }

    // Book card html
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>by ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Stars: ${stars}</p>
      <p>Read: <span class="status">${book.read ? "Yes" : "No"}</span></p>
      <button class="remove-btn">Remove</button>
      <button class="toggle-read-btn">Toggle Read Status</button>
      <button class="edit-btn">Edit Button</button>
    `;

    // Add event listeners
    bookCard.querySelector(".remove-btn").addEventListener("click", function () {
      removeBook(index); // Use the correct index
    });

    bookCard.querySelector(".toggle-read-btn").addEventListener("click", function () {
      toggleReadStatus(index); // Use the correct index
    });

    bookCard.querySelector(".edit-btn").addEventListener("click", function () {
      editBook(index); // Use the correct index
    });

    // Add book to library to display after
    libraryContainer.appendChild(bookCard);
  });
}


// Remove Book
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Toggle Read Status
function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

// Edit Book
function editBook(index){
  const book = myLibrary[index];

  isEditing = true; // Activate editing mode
  editingIndex = index; // Store the index of the book being edited

  document.getElementById("book-title").value = book.title;
  document.getElementById("book-author").value = book.author;
  document.getElementById("book-pages").value = book.pages;
  document.getElementById("book-read").checked = book.read;
  document.querySelector(`input[name="rating"][value="${book.stars}"]`).checked = true;

  document.getElementById("book-form").style.display = "block"; // Show form

  // Scroll to the form 
  document.getElementById("book-form").scrollIntoView({ behavior: "smooth" });

}
// Listener to display form when new book button clicked
document.getElementById("button").addEventListener("click", function () {
  const form = document.getElementById("book-form");
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block"; // Show the form
  } else {
    form.style.display = "none"; // Hide the form
  }
});

// SUBMIT button to adding a book function 
document.getElementById("submit-button").addEventListener("click", function (event) {
  event.preventDefault();

  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const pages = parseInt(document.getElementById("book-pages").value.trim());
  const stars = parseInt(document.querySelector('input[name="rating"]:checked').value);
  const read = document.getElementById("book-read").checked;

  // To make sure all fields are completed
  if (!title || !author || isNaN(pages) || isNaN(stars)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (isEditing) {
    // Update the existing book
    myLibrary[editingIndex] = { title, author, pages, read, stars };
    isEditing = false; // Reset editing mode
    editingIndex = null; // Reset edit index
  } else {
    // Add a new book
    addBookToLibrary(title, author, pages, read, stars);
  }

  // Clear the form and hide it
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-pages").value = "";
  document.getElementById("book-read").checked = false;
  document.getElementById("book-form").style.display = "none";

  // Refresh the displayed list of books
  displayBooks();
});


document.getElementById("filter").addEventListener("change", displayBooks);


document.addEventListener('DOMContentLoaded', () => {
  // Get all the radio inputs and labels
  const stars = document.querySelectorAll('#stars input');
  const labels = document.querySelectorAll('#stars label');

  // Add event listeners to the radio buttons
  stars.forEach((star, index) => {
    star.addEventListener('change', () => {
      const selectedRating = parseInt(star.value);
      
      // Remove the 'selected' class from all labels
      labels.forEach((label) => label.classList.remove('selected'));
      
      // Add 'selected' to the appropriate labels
      for (let i = 0; i < selectedRating; i++) {
        labels[i].classList.add('selected');
      }
    });
  });
});

// Initial display of books
displayBooks();
