document.addEventListener('DOMContentLoaded', () => {
    const list_medicines = document.getElementById('medicine-table').getElementsByTagName('tbody')[0];
    const create_medicine = document.getElementById('create');

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

        const name_medicine = document.getElementById('medicine_name').value;
        const price_medicine = parseFloat(document.getElementById('medicine_price').value);

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
    








    
    



    fetch_medicines();
});