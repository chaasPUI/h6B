// Check if anything is in the cart when page loads
window.onload = checkCart;


// Check if anything is in the cart
function checkCart() {
    if (sessionStorage.getItem('totalQty') && parseInt(sessionStorage.getItem('totalQty'))>= 1){
        // Something in cart
        visibility(true);
        updateCartCount( sessionStorage.getItem('totalQty') );
    } else {
        // Nothing in the cart
        visibility(false);
        updateCartCount( "" );
    }
}

// Change Cart Badge Quantity
function updateCartCount( count ) {
    var cartQuantity = document.getElementById('cart-quantity');
    cartQuantity.innerHTML = count;
}


// Change the Visibility of Cart Badge
function visibility( bool ) {
    var cartQuantity = document.getElementById('cart-quantity');
    
    if( bool ) {
        cartQuantity.style.visibility = 'visible';
   } else{
        cartQuantity.style.visibility = 'hidden';
   }
}




// Function Called when Add to Cart Button is Pressed
function addToCart(){
    var quantity = document.getElementById('quantity-input').value;
    if (quantity >= 1 && quantity <= 100){
        // Get Item Details
        var name = document.getElementById('item').value;
        var price = document.getElementById('item-price').value;
        var size = document.getElementById('size').value;
        var color = document.getElementById('color').value;
        var imgURL = document.getElementById('imgURL').value;

        // Create Item SKU
        var SKU = name + '-' + size + '-' +color;

        // Create Product
        var product = createProduct(name, price, size, color, imgURL, quantity);

        // Add product to cart w/ SKU as Key
        addToSession( SKU, product);
    }

    //Update Cart Badge Count
    checkCart();

}

function createProduct(name, price, size, color, imgURL, qty){
    var product = {

        name: name,
        qty: qty,
        price: price,
        totalPrice: parseFloat(price) * parseFloat(qty),
        size: size,
        color: color,
        imgURL: imgURL

    }

    return product;
}

function addToSession( SKU, product){
    
    // Check if Cart is initialized
    if (sessionStorage.getItem('products') && sessionStorage.getItem('products') != "{}" ){
        var products = JSON.parse(sessionStorage.getItem('products'));
        // Check if already in Cart
        if (products[SKU]){
            // Add to QTY & Price
            var existingProduct = products[SKU];
            products[SKU].qty =  parseInt(products[SKU].qty) + parseInt(product.qty);
            products[SKU].totalPrice = parseInt(products[SKU].totalPrice) + parseInt(product.totalPrice);
            
            //Set New Product
            sessionStorage.setItem('products', JSON.stringify(products));
    
        } else{
            // Add to Cart
            products[SKU] = product;
            sessionStorage.setItem('products', JSON.stringify(products));
        }
    
    } else{
        var products = {};
        products[SKU] = product;

        sessionStorage.setItem('products', JSON.stringify(products) );
    }
    


    // Add to Total Cart Count 
    if (sessionStorage.getItem('totalQty')){
        //Update Total QTY
        var prevQty = sessionStorage.getItem('totalQty');
        let totalQty = parseInt(product.qty) + parseInt(prevQty);
        sessionStorage.setItem('totalQty', totalQty); 

        //Update Subtotal
        var prevPrice= sessionStorage.getItem('totalPrice');
        let totalPrice = parseFloat(product.totalPrice) + parseFloat(prevPrice);
        sessionStorage.setItem('totalPrice', totalPrice); 

    } else{
        //Create totalQty and totalPrice
        sessionStorage.setItem('totalQty', product.qty);
        sessionStorage.setItem('totalPrice', product.totalPrice);
    }

}