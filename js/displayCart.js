
// Check if anything is in the cart when page loads
window.onload = displayCart;

function displayCart(){
    document.querySelectorAll('.line-item').forEach(e => e.remove());
    if (sessionStorage.getItem('products') && sessionStorage.getItem('products') != "{}" ){
        document.getElementById('empty-cart').style.visibility = 'hidden';
        let subtotal = sessionStorage.getItem('totalPrice');
        updateSubtotal(subtotal);
        let products = JSON.parse(sessionStorage.getItem('products'));
        for([SKU, product] of Object.entries(products)) {
            createLineItem(SKU, product);
        }
    }else{
        document.getElementById('empty-cart').style.visibility = 'visible';
        updateSubtotal(0);
    }
}

function updateSubtotal(total){
    document.getElementById('subtotal').textContent = "$" + parseFloat(total).toFixed(2);
}

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


function minusButton(e){


    let SKU = e.parentNode.parentNode.id;
    console.log(SKU);
    var products = JSON.parse(sessionStorage.getItem('products'));

    if (products[SKU].qty == 1){
        updateQtyAndTotal( -1, -parseFloat(products[SKU].price) );
        delete products[SKU];
        sessionStorage.setItem('products', JSON.stringify(products));
        
        displayCart();
        // e.parentNode.parentNode.remove();

    } else {

        products[SKU].totalPrice = parseFloat(products[SKU].totalPrice) - parseFloat(products[SKU].price); 
        updateQtyAndTotal( -1, -parseFloat(products[SKU].price));
        products[SKU].qty = parseInt(products[SKU].qty) - 1;
        sessionStorage.setItem('products', JSON.stringify(products));
    
        //Update QTY and Price
        displayCart();
        // e.parentNode.childNodes[4] = products[SKU].qty;
        // e.parentNode.parentNode.childNodes[4].childNodes[1].textContent = products[SKU].totalPrice;
    }
   
}


function plusButton(e){

    let SKU = e.parentNode.parentNode.id;
    var products = JSON.parse(sessionStorage.getItem('products'));

    products[SKU].totalPrice = parseFloat(products[SKU].totalPrice) + parseFloat(products[SKU].price); 
    updateQtyAndTotal( 1, parseFloat(products[SKU].price)) ;
    products[SKU].qty = parseInt(products[SKU].qty) + 1;
    sessionStorage.setItem('products', JSON.stringify(products));

    //Update QTY and Price
    displayCart();
    // e.parentNode.childNodes[4] = products[SKU].qty;
    // e.parentNode.parentNode.childNodes[4].childNodes[1].textContent = products[SKU].totalPrice;
    
   
}

function removeItem(e){
    let SKU = e.parentNode.parentNode.id;
    var products = JSON.parse(sessionStorage.getItem('products'));
    

    updateQtyAndTotal( -parseInt(products[SKU].qty) , -parseFloat(products[SKU].totalPrice));
    
    
    
    delete products[SKU];
    sessionStorage.setItem('products', JSON.stringify(products));

    displayCart();
    // e.parentNode.parentNode.remove();

}



function createLineItem(SKU, product){
    var lineItem = document.createElement("div");
    lineItem.classList.add('line-item');
    lineItem.id = SKU;

    lineItem.innerHTML = "<div class='item-details'>\
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
    document.getElementById("cart").insertBefore(lineItem, subtotal);
}

function resetLineItems(){
    document.getElementsByClassName("line-item").forEach(e => e.remove());

}