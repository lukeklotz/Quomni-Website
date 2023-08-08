var updateBtns = document.getElementsByClassName('product-button')

for(var i = 0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
            console.log('productId:', productId, 'action:', action)
            console.log('USER:', user)
            if(user === "AnonymousUser"){
                addCookieItem(productId, action)
            } else {
                updateUserOrder(productId, action)
            }
    })
}

function isEmpty(){

    var i = 0;

    while(i <= 19){
        if(cart[productId[i]]['quantity'] <= 0){
            console.log("cart is empty!")
            ++i;
        }
    }
}

function addCookieItem(productId, action) {
    console.log('User is not authenticated')

    if(action == 'add'){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        } else {
            alert('Only one of this item may be purchased!');
        }
    }

    if(action == 'remove'){
            cart[productId]['quantity'] -= 1

            if(cart[productId]['quantity'] <= 0){
                console.log('Remove Item')
                    delete cart[productId]
                }
            }
        document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
        location.reload()
    }


function updateUserOrder(productId, action){
    console.log('User is authenticated, sending data...')

    var url = '/update_item/'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId': productId, 'action':action})
    })

    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        console.log('data:',data)
        location.reload()
    })
}