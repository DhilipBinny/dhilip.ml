
document.addEventListener('DOMContentLoaded', () => {

    var url = 'https://shoppingcart-backend-app.herokuapp.com/api/v1/product';
    fetch(url, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
    )
    .then(resp  => resp.json() )
    .then(response => {
        response.data.forEach(record_dict => {
            const li = create_books(record_dict.id,record_dict.name,record_dict.url,record_dict.price) 

            document.querySelector("#book_elements").append(li)
            // document.querySelector('#book_elements').insertBefore(li, document.querySelector("#book_elements").firstChild)

            console.log(record_dict.id, record_dict.name,record_dict.url, record_dict.price)   
        });
        console.log('Success:', JSON.stringify(response.data[0]))
    }
    )
    .catch(error => console.error('Error:', error));  
});


function create_books (id,name,url,price){

    var li = document.createElement("li")

    var div = document.createElement("div")
    // div.className="block_p_b"
    var par = document.createElement("p")
    par.innerHTML = name
    var img = document.createElement("img")
    img.src= url
    var but = document.createElement("button")
    but.id = id
    but.className="addtocart"
    but.onclick = addtocart
    var pricee = document.createElement("span")
    pricee.innerHTML="Price : $"+price+" "
    but.innerHTML = "Add to cart"
    
    var quantity = document.createElement("span")
    quantity.innerHTML = "Quantity"
    var quantity_input = document.createElement("input")
    quantity_input.type="number"
    quantity_input.className="quantity_"+id
    quantity_input.value = 1

    quantity.appendChild(quantity_input)
    div.appendChild(par)
    div.appendChild(img)
    div.appendChild(pricee)
    div.appendChild(quantity)
    div.appendChild(but)
    // div.append(br)    

    li.appendChild(div)

    return li

}

function addtocart(event){
    var product_id=event.target.id
    console.log(event.target.id,"clicked")
    var quantity = document.querySelector(`.quantity_${product_id}`).value
    console.log(quantity)

        var url = 'https://shoppingcart-backend-app.herokuapp.com/api/v1/cart';
        var data = {"product_id": product_id,"quantity":quantity };

        fetch(url, 
            {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    
                }
            }
        )
        .then(resp  => resp.json() )
        .then(response => {

            console.log(response.cart_id)
            console.log(response.data.quantity)
            console.log('Success:', JSON.stringify(response))
        }
        )
        .catch(error => console.error('Error:', error));  

    alert("item added to cart")

}


