// Gettting the checkbox element
const checkbox = document.getElementById('checkbox');

// Getting the tables section
const tablesSection = document.querySelector('.tablesSection');

// Array for storing inventory items
const inventoryItems = [];

// Adding event listener to the table to handle clicks on quantity
document.querySelector('table').addEventListener('click', function(e) {
    // Check if the clicked element is a table data element
    if (e.target && e.target.nodeName == 'TD') {
        // Get the clicked table data element
        const clickedTd = e.target;

        // Check if the clicked table data element is in the Quantity column
        if (clickedTd.cellIndex === 1) {
            // Get the quantity value
            const quantityValue = clickedTd.textContent.trim();

            // Hide the table
            tablesSection.style.display = 'none';

            // Show the edit form
            editForm.style.display = 'block';

            // Set the current quantity value in the input field of the edit form
            document.getElementById('newText').value = quantityValue;

            // Add event listener to the edit form for submission
            editForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get the new quantity value from the form
                const newQuantity = document.getElementById('newText').value;

                // Update the quantity value in the table
                clickedTd.textContent = newQuantity;

                // Hide the edit form
                editForm.style.display = 'none';

                // Show the table
                tablesSection.style.display = 'block';

                // Remove the event listener after submission
                editForm.removeEventListener('submit', arguments.callee);
            });
        }
    }
});

// Function for checking if an item exists already
function checkIfExists(item, inventoryItems) {
	for (var i = 0; i < inventoryItems.length; i++) {
		if(item == inventoryItems[i]) {
			return true;
		}
	}
}


// Function for adding new item in the inventory
inputForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Getting the item from the input field
	const item = document.getElementById('item').value;

	// Getting the quantity from the input field
	const quantity = document.getElementById('quantity').value;

	// We can't let an input field be empty
	if(item.length == 0 || quantity.length == 0) {
		alert("Fill out the form first");
	}

	// If all input fields are not empty, go here
	else {

		// Check if item already exists
		if (checkIfExists(item, inventoryItems)) {
			alert('Item already taken');
		}

		// If it doesn't exist yet, go here
		else {

			// push to the inventoryItems list
			inventoryItems.push(item);
			console.log(inventoryItems)

			// create the table row element for storing items
			const trElement = document.createElement('tr');

			// create table data for storing item name
			const tdElementForItemName = document.createElement('td');

			// create table data for storing quantity 
			const tdElementForQty = document.createElement('td');

			// setting the text content of the item name and quantity
			tdElementForItemName.textContent = item;
			tdElementForQty.textContent = quantity;

			// adding to the table data element to the table row
			trElement.appendChild(tdElementForItemName);
			trElement.appendChild(tdElementForQty);

			// adding table row element to the table
			document.querySelector('table').appendChild(trElement);
		}

	}

})

checkbox.addEventListener('change', function(e) {
	e.preventDefault();
	if(checkbox.checked == true) {
		tablesSection.style.display = "block";
	}
	else {
		tablesSection.style.display = "none";
	}

})
