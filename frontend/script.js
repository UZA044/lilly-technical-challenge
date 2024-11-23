document.addEventListener('DOMContentLoaded', () => {
    // These constants  will be used to handle user interactions including
    //creating, deleting, updating, retrieving, and calculating the average price of validmedicines.

    const list_medicines = document.getElementById('medicine-table').getElementsByTagName('tbody')[0];
    const create_medicine = document.getElementById('create');
    const delete_medicine = document.getElementById('delete');
    const update_medicine = document.getElementById('update');
    const retrieve_medicine = document.getElementById('retrieve')
    const average_medicine = document.getElementById('average_medicine')


    // This is a function which communicated with backend fetching all the medicines and displaying,
    // it in a table for the user to see
    async function fetch_medicines() {
        try {
            const response = await fetch('http://localhost:8000/medicines');
            if (!response.ok) {
                throw new Error('UNABLE TO FETCH MEDICINES');
            }
            const result = await response.json();
            //checks if there is any medicines which have been retrieved if so,
            //then display medicines is called which displays all the medicines.
            //otheriwse a error is returned and handled.
            if (result.medicines) {
                display_medicines(result.medicines); 
            } else {
                console.error('Medicines not found in the response:', result);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //This function is used to display the medicines to the form of a table row
    function display_medicines(medicines) {
        //clear the current table of medicine to prevent duplication.
        list_medicines.innerHTML = ''; 

        //loop through medicines checking if there is any null price or no names for medicines,
        //replace them with useful names to handle invalid and missing properties.
        medicines.forEach(item => {
            const name = item.name !="" ? item.name: 'Name is Unknown'
            const price = item.price != null ? item.price : 'Price is Unknown';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${price}</td>
            `;
            // adding row to the table
            list_medicines.appendChild(row);
        });
    }

    // Event listener waiting for the add medicine button click 
    create_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();

        //retrieves the name and price of medicine to be added and stores as constants
        const name_medicine = document.getElementById('medicine_name_create').value;
        const price_medicine = parseFloat(document.getElementById('medicine_price_create').value);
        
        //checking if price is valid and is positive
        if (isNaN(price_medicine) || price_medicine <= 0) {
            alert('Please enter a vaid price which is a number and greater than 0!');
            return;
        }
        // Creates form data with said constants to communicate with backend.
        const new_medicine_form = new FormData(); 
        new_medicine_form.append('name',name_medicine);
        new_medicine_form.append('price',price_medicine);
                
        try {
            const response = await fetch('http://localhost:8000/create', {
                method: 'POST',
                body: new_medicine_form 
            });
    
            
            if (!response.ok) {
                throw new Error("Medicine was NOT added successfully!");
            }
            
            // Displays a message on webpage if successfully added medicine.
            if (result.message) {
                alert(result.message); 
            }
            await fetch_medicines();
            


                
            
        }catch (error) {
            console.error('Error:', error);
        

    }});

     // Event listener waiting for the delete medicine button click 
    delete_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();

        //retrieves the name of medicine to be added and stores as a constant.

        const name_medicine = document.getElementById('medicine_name_delete').value;

        // Creates form data to communicate with backedn to remove medicine if present.
        const medicine = new FormData();
        medicine.append('name', name_medicine);

                
        try {
            // Method is DELETE because deletion is occuring instead of fetch for example.
            const response = await fetch('http://localhost:8000/delete', {
                method: 'DELETE',
                body: medicine
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error("Medicine was NOT deleted successfully!");
            }
            // Lets User know in the form of a message if medicine deleted
            //otherwise error is displayed in case the medicine wasnt already present.
            if (result.message) {
                alert(result.message);
            }else{
                alert(result.error);
            }

            // The list of medicines is refreshed.
            await fetch_medicines();                
            
        } catch (error) {
            console.error('Error:', error);
        

    }});
    // Event listener waiting for the update medicine button click 
    update_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();

        //retrieves the name of medicine to be updated and the new price stores all this as constants.
        const name_medicine = document.getElementById('medicine_name_update').value;
        const new_price_medicine = parseFloat(document.getElementById('medicine_price_update').value);

        //checking if price is valid and is positive
        if (isNaN(new_price_medicine) || new_price_medicine <= 0) {
            alert('Please enter a vaid price which is a number and greater than 0!');
            return;
        }
        // Creates form data with said constants to communicate with backend.
        const medicine = new FormData();
        medicine.append('name', name_medicine);
        medicine.append('price', new_price_medicine)

                
        try {
            //Communicates with backend sending medicin form data as part of the body.
            const response = await fetch('http://localhost:8000/update', {
                method: 'POST',
                body: medicine 
            });
    
            
            const result = await response.json();

            if (!response.ok) {
                throw new Error("Medicine was NOT updated successfully!");
            }

            // Lets User know in the form of a message if medicine updated
            //otherwise error is displayed in case the medicine is not present and so can't be updated.
            if (result.message) {
                alert(result.message); 
            }else{
                alert(result.error);
            }
            // The list of medicines is refreshed.
            await fetch_medicines();

                
            
        } catch (error) {
            console.error('Error:', error);

    }});

    // Event listener waiting for the "retrieve a medicine" button click 
    retrieve_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();
                
        //retrieves the name of medicine to be retrieved
        const name_medicine = document.getElementById('medicine_name_retrieve').value;

        try {
            //Communicates with backend through the medicines/{name} route
            const response = await fetch(`http://localhost:8000/medicines/${name_medicine}`, {
                method: 'GET',
            });
            
            //result is stored from the response which is parsed as json.
            const result = await response.json();
            if (!response.ok) {
                throw new Error("Medicine was NOT retrieved successfully!");
            }

            // if error is returned for example if medicine not present it is displayed to user.
            // otherwise the medicine is shown in the table as only 1 row so all the medicines,
            //are cleared.
            if (result.error){
                alert(result.error);
            }   
            else{
                alert('Found Medicine');
                // clears the medicine table
                list_medicines.innerHTML = ''; 
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.name}</td>
                    <td>${result.price}</td>
                `;
                list_medicines.appendChild(row);
            }
        } catch (error) {
            console.error('Error:', error);

    }});

    //This event listener is called when user wants to work out average of medicine prices.
    average_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/average', {
                method: 'GET',
            });
            

            const result = await response.json();

            if (!response.ok) {
                throw new Error("Could not fetch the average price!");
            }
            //displays the average in the form of a alert/message to the user.
            if (result.message) {
                alert(result.message); 
            }else{
                alert(result.error);
            }

            await fetch_medicines();

        }catch(error){
            console.error('Error:', error);

        }

    });




    fetch_medicines();
});