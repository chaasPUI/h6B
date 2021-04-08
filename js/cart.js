function checkCart() {
    if (sessionStorage.getItem('totalQty')){
        visibility(true);
        updateCartCount( sessionStorage.getItem('totalQty') );
    } else {
        visibility(false);
        updateCartCount( "" );
    }
}


function updateCartCount( count ) {
    var cartQuantity = document.getElementById('cart-quantity');
    cartQuantity.innerHTML = count;
}


function visibility( bool ) {
    var cartQuantity = document.getElementById('cart-quantity');
    
    if( bool ) {
        cartQuantity.style.visibility = 'visible';
   } else{
        cartQuantity.style.visibility = 'hidden';
   }
}


window.onload = checkCart;

function addToCart(){
    var quantity = document.getElementById('quantity-input').value;
    if (quantity >= 1 && quantity <= 100){
        if (sessionStorage.getItem('totalQty')){
            var qty = sessionStorage.getItem('totalQty');
            let total = parseInt(quantity) + parseInt(qty);
            sessionStorage.setItem('totalQty', total); 

        } else{
            sessionStorage.setItem('totalQty', quantity);
        }
        
    }

    checkCart();
    
}