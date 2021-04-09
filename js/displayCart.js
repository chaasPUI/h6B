
// Check if anything is in the cart when page loads
window.onload = displayCart;

function displayCart(){
    //Delete all Line-Items on the Page
    document.querySelectorAll('.line-item').forEach(e => e.remove());
    //Check if cart is initialized and not empty
    if (sessionStorage.getItem('products') && sessionStorage.getItem('products') != "{}" ){
        // Hide Empty Cart Message
        document.getElementById('empty-cart').style.visibility = 'hidden';
        //Update Cart Subtotal
        let subtotal = sessionStorage.getItem('totalPrice');
        updateSubtotal(subtotal);

        //Loop through items in cart and add lineItems
        let products = JSON.parse(sessionStorage.getItem('products'));
        for([SKU, product] of Object.entries(products)) {
            createLineItem(SKU, product);
        }
    }else{
        //Display empty cart message and update subtotal of empty cart to 0
        document.getElementById('empty-cart').style.visibility = 'visible';
        updateSubtotal(0);
    }
}

//Updates the subtotal at the bottom of the Cart.html Page
function updateSubtotal(total){
    document.getElementById('subtotal').textContent = "$" + parseFloat(total).toFixed(2);
}

//Updates the totalQty and Price in the seessionStorage
function updateQtyAndTotal(deltaQty, deltaTotal){
    var prevQty = sessionStorage.getItem('totalQty');
    var prevTotal = sessionStorage.getItem('totalPrice');

    console.log(prevQty);
    console.log(prevTotal);
    var newQty = parseInt(prevQty) + parseInt(deltaQty);
    var newTotal = parseFloat(prevTotal) + parseFloat(deltaTotal);

    sessionStorage.setItem('totalQty', JSON.stringify(newQty));
    sessionStorage.setItem('totalPrice', JSON.stringify(newTotal));
    
}

//Subtracts (or deletes) Product Quantity and resets cart
function minusButton(e){
    let SKU = e.parentNode.parentNode.id;
    console.log(SKU);
    var products = JSON.parse(sessionStorage.getItem('products'));

    if (products[SKU].qty == 1){
        
        // Update total Qty & Price
        updateQtyAndTotal( -1, -parseFloat(products[SKU].price) );

        //Delete the Product because qty = 0
        delete products[SKU];

        sessionStorage.setItem('products', JSON.stringify(products));
        
        //Update Cart Display
        displayCart(); // Somewhat excessive but reuses existing logic


    } else {
        //Decrease Product Price & Qty
        products[SKU].totalPrice = parseFloat(products[SKU].totalPrice) - parseFloat(products[SKU].price); 
        products[SKU].qty = parseInt(products[SKU].qty) - 1;

        // Update total Qty & Price
        updateQtyAndTotal( -1, -parseFloat(products[SKU].price));
       
        sessionStorage.setItem('products', JSON.stringify(products));
    
        //Update Cart Display
        displayCart();
     
    }
   
}

//Adds to Product Quantity and resets cart
function plusButton(e){

    //Get Product SKU
    let SKU = e.parentNode.parentNode.id;
    var products = JSON.parse(sessionStorage.getItem('products'));

    //Increase Price & QTY
    products[SKU].totalPrice = parseFloat(products[SKU].totalPrice) + parseFloat(products[SKU].price); 
    products[SKU].qty = parseInt(products[SKU].qty) + 1;

    // Update total Qty & Price
    updateQtyAndTotal( 1, parseFloat(products[SKU].price)) ;
  
    sessionStorage.setItem('products', JSON.stringify(products));

    //Update Cart Display
    displayCart();

    
   
}

// Removes all of this Product from cart
function removeItem(e){

    let SKU = e.parentNode.parentNode.id;
    var products = JSON.parse(sessionStorage.getItem('products'));
    
    //Update sessionStorage Counts
    updateQtyAndTotal( -parseInt(products[SKU].qty) , -parseFloat(products[SKU].totalPrice));
    
    //Delete the product from the cart
    delete products[SKU];
    sessionStorage.setItem('products', JSON.stringify(products));

    displayCart();

}


//Creates and adds the Line Item div to cart.html and populates with relevant info
function createLineItem(SKU, product){

    //Create the Line Item
    var lineItem = document.createElement("div");

    lineItem.classList.add('line-item');
    //Set the ID as SKU to keep track 
    lineItem.id = SKU;

    //A workaround Partial of the line-item 
    lineItem.innerHTML = 
    "<div class='item-details'>\
        <img src='imgs/" + product.imgURL + "' alt='Cat Harness'>\
        <div class='details'>\
            <h2 class='item-title'>Cat Harness</h2>\
            <h3>Color: <span class='color-variant'>"+product.color+"</span> // Size: <span class='size-variant'>"+product.size+"</span> </h3>\
        </div>\
    </div>\
    <div class='quantity'>\
        <h4>QTY</h4>\
        <button onclick='minusButton(this)'>-</button>\
        <h2 class='d-inline' > "+product.qty+" </h2>\
        <button onclick='plusButton(this)'>+</button>\
    </div>\
    <div class='price'>\
        <h4 class='item-price'>$"+parseFloat(product.totalPrice).toFixed(2)+"</h4>\
    </div>\
    <div class='clear-button'>\
        <button onclick='removeItem(this)' class='button'>x</button>\
    </div>";


    var subtotal = document.getElementById("total");
    //Add to the page
    document.getElementById("cart").insertBefore(lineItem, subtotal);
}
