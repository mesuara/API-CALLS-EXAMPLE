'use strict';

const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image:'' },
  { title: 'A Farewell to Arms', author: 'Ernest Hemingway', image:'' },
  { title: 'Catch 22', author: 'Joseph Heller',image:'' }
];

function appendBooks(templateId) {
    const booksList = document.getElementById('books');
    const fragment = document.getElementById(templateId);
    
    // Clear out the content from the ul
    booksList.innerHTML = '';
    
    // Loop over the books and modify the given template
    books.forEach(book => {
      // Create an instance of the template content
      const instance = document.importNode(fragment.content, true);
      // Add relevant content to the template
      instance.querySelector('.title').innerHTML = book.title;
      instance.querySelector('.author').innerHTML = book.author;
      instance.querySelector('.images').src = book.image;
      // Append the instance ot the DOM
      booksList.appendChild(instance);
    });  
  }



  let xhr = new XMLHttpRequest();

// Setup our listener to process compeleted requests
xhr.onreadystatechange = function () {

	// Only run if the request is complete
	if (xhr.readyState !== 4) return;

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// What do when the request is successful
        console.log(JSON.parse(xhr.responseText));
        let element = JSON.parse(xhr.responseText)
        books.push(
            {
                title:element.message.slice(22,30),
                author: element.message.slice(30,45),
                image:element.message
            }

        )
        appendBooks('book-template')
	}

};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
xhr.send();
appendBooks('book-template')