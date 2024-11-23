document.addEventListener('DOMContentLoaded', () => {
    const list_medicines = document.getElementById('medicine-table').getElementsByTagName('tbody')[0];
    const create_medicine = document.getElementById('create');
    const delete_medicine = document.getElementById('delete');

    async function fetch_medicines() {
        try {
            const response = await fetch('http://localhost:8000/medicines');
            if (!response.ok) {
                throw new Error('UNABLE TO FETCH MEDICINES');
            }
            const data = await response.json(); 
            console.log(data);
            if (data.medicines) {
                display_medicines(data.medicines); 
            } else {
                console.error('Medicines not found in the response:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function display_medicines(medicines) {
        list_medicines.innerHTML = ''; 

        medicines.forEach(item => {
            const name = item.name !="" ? item.name: 'Name is Unknown'
            const price = item.price != null ? item.price : 'Price is Unknown';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${price}</td>
            `;
            list_medicines.appendChild(row);
        });
    }

    create_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();

        const name_medicine = document.getElementById('medicine_name_create').value;
        const price_medicine = parseFloat(document.getElementById('medicine_price_create').value);

        if (isNaN(price_medicine) || price_medicine <= 0) {
            alert('Please enter a vaid price which is a number and greater than 0!');
            return;
        }
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

            await fetch_medicines();

            alert('Medicine added successfully!');

                
            
        } catch (error) {
            console.error('Error:', error);
        

    }});

    delete_medicine.addEventListener('submit',async(event) =>{
        event.preventDefault();
        const name_medicine = document.getElementById('medicine_name_delete').value;
        const medicine = new FormData();
        medicine.append('name', name_medicine);

                
        try {
            const response = await fetch('http://localhost:8000/delete', {
                method: 'DELETE',
                body: medicine
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error("Medicine was NOT deleted successfully!");
            }else{
                if (result.message) {
                    alert(result.message); 
                } else {
                    alert('Medicine not found so was not deleted.');
                }
            }


            await fetch_medicines();


                
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete medicine. Please try again.');
        

    }});
    








    
    



    fetch_medicines();
});