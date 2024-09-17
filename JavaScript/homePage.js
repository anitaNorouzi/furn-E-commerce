let productInfo = [
    {id : 1, productName : "Wooden chair", ImgSrc: "assets/images/collection/arrivals1.png", price : 65, status: false},
    {id : 2, productName : "Single armchair", ImgSrc: "assets/images/collection/arrivals2.png", price : 80, status: false},
    {id : 3, productName : "Wooden armchair", ImgSrc: "assets/images/collection/arrivals3.png", price : 40,  status: false},
    {id : 4, productName : "Stylish chair", ImgSrc: "assets/images/collection/arrivals4.png", price : 100,  status: false},
    {id : 5, productName : "Modern armchair", ImgSrc: "assets/images/collection/arrivals5.png", price : 120,  status: false},
    {id : 6, productName : "Mapple wood dinning table", ImgSrc: "assets/images/collection/arrivals6.png", price : 140,  status: false},
    {id : 7, productName : "Arm chair", ImgSrc: "assets/images/collection/arrivals7.png", price : 90,  status: false},
    {id : 8, productName : "Wooden bed", ImgSrc: "assets/images/collection/arrivals8.png", price : 140,  status: false},
]

let badge = document.querySelector('.badge')

let totalPrice = 0;  // total price of products in the cart
let newArrivalsRow = document.getElementById("new-arrivals-row") // container for displaying new arrivals
let cartList = document.querySelector(".cart-list") // container for displaying items in the cart
let totalPriceContent = document.getElementById("total-price") // element to display total price
let userBasket = [] // array to store products added to the cart

let purchase = JSON.parse(localStorage.getItem('purchase')) || 0;
localStorage.setItem('purchase', JSON.stringify(purchase));

// Initialize userBasket if not already present
function initializeBasket() {
    if (!localStorage.getItem('userBasket')) {
        localStorage.setItem('userBasket', JSON.stringify([])); // initialize an empty basket in local storage
    } else {
        userBasket = JSON.parse(localStorage.getItem('userBasket')); // load basket from local storage
    }
}



productInfo.forEach(function(product){

    // Append each product to the new arrivals section

    newArrivalsRow.insertAdjacentHTML("beforeend", 
`        <div class="col-md-3 col-sm-4">
        <div class="single-new-arrival">
            <div class="single-new-arrival-bg">
                <img src= ${product.ImgSrc}  alt="new-arrivals images">
                <div class="single-new-arrival-bg-overlay"></div>
                <div class="sale bg-1">
                    <p>sale</p>
                </div>
                <div class="new-arrival-cart">
                    <p class= "add-to-cart"  data-product-id="${product.id}">
                    
                        <span class="lnr lnr-cart"></span>
                        <span> add to cart</span>
                        
                    </p>
                </div></a>
            </div>
            <h4 id = "product-name"><a href="product-details.html?id=${product.id}">${product.productName}</a></h4>
            <p class="arrival-product-price">$${product.price}</p>
        </div>
    </div>`
    )

    })    



// Select all "add to cart" buttons and add click event listeners to them

document.querySelectorAll(".add-to-cart").forEach(function(btn){ // it selects all tags that have this class
    btn.addEventListener("click", function(){   // when user clickes it works
        
        let productId = this.getAttribute('data-product-id') 
        productId = Number(productId) // Convert product ID from string to number

        let product = productInfo.find(item=> item.id === productId)  // find the object with id that we have it from URL
        addNewItemToCart(product) // add the selected product to the cart

        })
})


// Function to add a new product to the userBasket

function addNewItemToLocalStorage(product){

    let userBasketJSON = localStorage.getItem('userBasket');

    if(userBasketJSON){
        // Retrieve the userBasket array from local storage
        let userBasketArray = JSON.parse(userBasketJSON)
        // Parse the JSON string back into a JavaScript array
        userBasketArray.push(product)
        // Convert the modified array back to a JSON string
        let updatedUserBasketJSON = JSON.stringify(userBasketArray);
        // Store the updated JSON string back in local storage
        localStorage.setItem('userBasket', updatedUserBasketJSON)
    }

}

function addPriceToLocalStorage(total){

    let purchaseJSON = localStorage.getItem('purchase');

    if(purchaseJSON){
        // Retrieve the userBasket array from local storage
        let purchaseAmount = JSON.parse(purchaseJSON)
        // Parse the JSON string back into a JavaScript array
        purchaseAmount = total
        // Convert the modified array back to a JSON string
        let updatedPurchaseJSON = JSON.stringify(purchaseAmount);
        // Store the updated JSON string back in local storage
        localStorage.setItem('purchase', updatedPurchaseJSON)
    }

}


// Load userBasket from local storage and update the UI

function loadBasket() {

    userBasket.forEach(product => {
       
        product.status = true;  // mark the product as added to the cart
        product.itemQuantity = product.itemQuantity || 1; // set the quantity if not already set

         // Add the product to the cart UI
        cartList.insertAdjacentHTML("afterbegin", `
            <li class="single-cart-list" data-product-id="${product.id}">
                <a href="#" class="photo"><img src=${product.ImgSrc} class="cart-thumb" alt="image" /></a>
                <div class="cart-list-txt">
                    <h6><a href="#">${product.productName}</a></h6>
                    <p> <span class="item-quantity">${product.itemQuantity}</span> x - <span class="price">$${product.price}</span></p>
                </div>
                <div class="cart-close">
                    <span class="lnr lnr-cross" data-product-id="${product.id}"></span>
                </div>
            </li>`);

        totalPrice += product.price * product.itemQuantity;
        badge.innerHTML = userBasket.length

    });

    totalPriceContent.innerHTML = `Total: $${totalPrice}`;
    addDeleteListeners();
}



function addNewItemToCart(product){ // product is the object that user clickes on 

   
    let productExistingInLocalStorage = userBasket.find(item=> item.id === product.id)
    
    if(!productExistingInLocalStorage){
        
        product.status = true
        userBasket.push(product)
        product.itemQuantity = 1; // it adds new properity to the clicked product because we didm't have this in the original product database
        addNewItemToLocalStorage(product)
        

        cartList.insertAdjacentHTML("afterbegin", `

                                        <li class="single-cart-list" data-product-id="${product.id}">
                                            <a href="#" class="photo"><img src= ${product.ImgSrc} class="cart-thumb" alt="image" /></a>
                                            <div class="cart-list-txt">
                                                <h6><a href="#"> ${product.productName}</a></h6>
                                                <p> <span  class = "item-quantity"> 1 </span> x - <span class="price">$${product.price}</span></p>
                                            </div><!--/.cart-list-txt-->
                                            <div class="cart-close">
                                                <span class="lnr lnr-cross" data-product-id="${product.id}"></span>
                                            </div><!--/.cart-close-->
                                        </li><!--/.single-cart-list -->`) 

        badge.innerHTML = userBasket.length
        addDeleteListeners();
    }
    
    // update the number of already existed product in the basket

    else{ 

        //This statement is excuted when the product is already in the basket and local storage
        //and user presses on it to make them more in the shopping cart

        let quantity = getItemQuantityFromLocalStorage(product.id) // we get the current quantity of product by its id
        productExistingInLocalStorage.itemQuantity = quantity // we declare item quantity
        productExistingInLocalStorage.itemQuantity++;
        //select the item quantity class in UI
        let itemQuantityUI = document.querySelector(`.single-cart-list[data-product-id="${product.id}"] .item-quantity`);
        
        itemQuantityUI.innerHTML = productExistingInLocalStorage.itemQuantity  // replace updated number

        updateLocalStorage()  //we update the local storage after user increments the number of the item in the home page
        addDeleteListeners()
    }


    totalPrice += product.price // add the price to total price 
    totalPriceContent.innerHTML = `Total: $${totalPrice}`

    //addPriceToLocalStorage(totalPrice)
    //console.log("first", userBasket)
    //Select All Close Buttons:
    document.querySelectorAll(".cart-close span").forEach(cartClose => { //Iterate Through Each Close Button
        cartClose.removeEventListener("click", handleDeleteCartFromBasket); // Remove previous event listener to avoid duplication
        cartClose.addEventListener("click", handleDeleteCartFromBasket); // Add a new event listener

        // it prevents multiple listeners from being attached to the same element, 
        //which can cause the deleteCartFromBasket function to be called multiple times.
    })
}



function getItemQuantityFromLocalStorage(productId) {
    // Retrieve the userBasket array from local storage
    let userBasketJSON = localStorage.getItem('userBasket');
    
    if (userBasketJSON) {
        let userBasketArray = JSON.parse(userBasketJSON);
        
        // Find the product with the given productId
        let product = userBasketArray.find(item => item.id === productId);
        
        if (product) {
            // Return the itemQuantity of the found product
            return product.itemQuantity;
        }
    }
    
    // Return 0 if the product is not found or local storage is empty
    return 0;
}



function handleDeleteCartFromBasket(event) {
    deleteCartFromBasket(event, userBasket);
}




function deleteCartFromBasket(event, basket){
    
        
    let crossIcon = event.target // access to the icon of the product that user pressed
    let productId = crossIcon.getAttribute('data-product-id') // extract the id from data-product-id attribute
    productId = Number(productId) // Convert the productId to a number
    // // Remove the cart item from the cart list
    let cartItem = crossIcon.closest('.single-cart-list');

    if (cartItem) { // delete from UI
        cartItem.remove();
    }
    
 
    let basketProduct = basket.find(item => item.id === productId)  //here we look for an object which its id is equal to productId
    totalPrice -= (basketProduct.itemQuantity)*(basketProduct.price) // update total after deleting the product from cart
    totalPriceContent.innerHTML = `Total: $${totalPrice}` //show the updated total in UI
    //addPriceToLocalStorage(totalPrice)

    let basketProductIndex = basket.findIndex(item => item.id === productId) // we find the index of an object from userBasket array with product Id
    
    if(basketProductIndex !== -1){ // if the index is bigger than -1
        
        //console.log(basketProduct.id, basketProduct.itemQuantity)
        basket.splice(basketProductIndex, 1) // delete the object from shop basket
        let product = productInfo.find(item=> item.id === productId) // we find the object from productInfo array with product Id

        if(product){ // if there is such an object in the productInfo
            product.status = false
        }
        
        badge.innerHTML = userBasket.length 
        updateLocalStorage() // update the local storage after deleting an item from UI list
    }
}


function updateLocalStorage() {
    localStorage.setItem('userBasket', JSON.stringify(userBasket));
    //localStorage.setItem('purchase', JSON.stringify(purchase));
}


// Add event listeners to delete buttons 

function addDeleteListeners() {
    document.querySelectorAll(".cart-close span").forEach(cartClose => {
        cartClose.removeEventListener("click", handleDeleteCartFromBasket);
        cartClose.addEventListener("click", handleDeleteCartFromBasket);
    });
}


// Initialize the basket and load existing items from local storage

initializeBasket(); // if we delete this two lines, after refreshing the site basket will be empity in UI
loadBasket();

export{loadBasket, cartList}