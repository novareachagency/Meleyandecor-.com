document.addEventListener('DOMContentLoaded', function() {
    const materialsContainer = document.getElementById('materialsContainer');
    const addMaterialBtn = document.getElementById('addMaterialBtn');
    const materialsHeader = document.querySelector('.materials-header h2');
    const materialCounter = document.querySelector('.material-counter');
    let materialCount = 1;
    
    // Add material functionality
    addMaterialBtn.addEventListener('click', function() {
        if (materialCount >= 10) {
            alert('Maximum 10 materials allowed');
            return;
        }
        
        materialCount++;
        const newMaterial = document.createElement('div');
        newMaterial.className = 'material-item';
        newMaterial.setAttribute('data-index', materialCount);
        newMaterial.innerHTML = `
            <div class="form-group">
                <label>Material Name</label>
                <input type="text" placeholder="e.g., Cement, Steel, Ladder" class="material-name" name="material_name" required>
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" placeholder="Quantity" class="material-quantity" name="quantity" min="1" required>
            </div>
            <div class="form-group">
                <label>Price per Unit ($)</label>
                <input type="number" placeholder="Price" class="material-price" name="price" min="0" step="0.01" required>
            </div>
            <div class="form-group">
                <label>Rental Period (masyashya)</label>
                <input type="number" placeholder="masyashya" class="material-rent" name="rent_period" min="1" required>
            </div>
            <button type="button" class="remove-btn"><i class="fas fa-times"></i></button>
        `;
        materialsContainer.appendChild(newMaterial);
        materialCounter.textContent = `${materialCount}/10 Materials`;
        
        // Add event listener to the new remove button
        const removeBtn = newMaterial.querySelector('.remove-btn');
        removeBtn.addEventListener('click', removeMaterial);
    });
    
    // Remove material functionality
    function removeMaterial(e) {
        const materialItem = e.target.closest('.material-item');
        if (materialItem) {
            materialItem.remove();
            materialCount = document.querySelectorAll('.material-item').length;
            materialCounter.textContent = `${materialCount}/10 Materials`;
        }
    }
    
    // Add event listeners to existing remove buttons (for dynamically added ones)
    materialsContainer.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            removeMaterial(e);
        }
    });
    
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentAmountBox = document.getElementById('paymentAmountBox');
    const paymentMethodValue = document.getElementById('paymentMethodValue');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store the selected payment method in the hidden field
            const method = this.getAttribute('data-method');
            paymentMethodValue.value = method;
            
            // Show payment amount box when Cash or CBE is selected
            if (method === 'cash' || method === 'cbe') {
                paymentAmountBox.style.display = 'block';
            } else {
                paymentAmountBox.style.display = 'none';
            }
        });
    });
    
    // Initialize with Cash selected
    document.querySelector('.payment-option[data-method="cash"]').classList.add('selected');
    paymentMethodValue.value = 'cash'; 
    paymentAmountBox.style.display = 'block';
});