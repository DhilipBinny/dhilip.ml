
document.addEventListener('DOMContentLoaded', () => {

    var url = 'https://shoppingcart-backend-app.herokuapp.com/api/v1/cart/all';
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
            const tr = create_cart(record_dict.cart_id,record_dict.quantity,record_dict.bookname,record_dict.imageurl,record_dict.price) 

            document.querySelector("#create_cart").append(tr)
            // document.querySelector('#book_elements').insertBefore(li, document.querySelector("#book_elements").firstChild)

    //         console.log(record_dict.cart_id,record_dict.product_id,record_dict.quantity,record_dict.bookname,record_dict.imageurl,record_dict.price)   
        });
        console.log('Success:', JSON.stringify(response.data[0]))
    }
    )
    .catch(error => console.error('Error:', error));  
});


function create_cart (cart_id,quantity,bookname,imageurl,price){
    var tr = document.createElement("tr")
    var td1 = document.createElement("td")
    var img = document.createElement("img")
    img.src= imageurl
    img.className="cart_img"

    td1.appendChild(img)

    var td2 = document.createElement("td")
    td2.innerHTML = bookname  

    var td3 =document.createElement("td")
    td3.innerHTML= "$ "+price
    
    var td4=document.createElement("td")
    td4.innerHTML = quantity

    var td5 =document.createElement("td")
    td5.innerHTML = "$"+(quantity* price)

    var td6 = document.createElement("td")
    var button = document.createElement("button")
    button.className="remove_btn"
    button.id = cart_id
    button.onclick = deletehandler
    button.innerHTML ="Remove"

    td6.appendChild(button)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    
    return tr
}

function deletehandler(event){
    let cart_id = event.target.id

    var url = 'https://shoppingcart-backend-app.herokuapp.com/api/v1/cart/delete';
    fetch(url, 
        {
            method: 'DELETE',
            body: JSON.stringify({
                "cart_id":cart_id
            }),
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
    )
    .then(resp  => resp.json() )
    .then(response => {
        
    let btn = event.target
    let child_to_remove = btn.parentNode.parentNode
    let remove_from = child_to_remove.parentNode
    remove_from.removeChild(child_to_remove)

    })
    .catch(error => console.error('Error:', error));  
}
function reset_cart(){
    // let resetbutton = event.target 
    var url = 'https://shoppingcart-backend-app.herokuapp.com/api/v1/cart/reset';
    fetch(url, 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
    )
    .then(resp  => resp.json() )
    .then(response => {
        
    document.getElementById("create_cart").innerHTML=""

    console.log('Success:', JSON.stringify(response.data[0]))
    })
    .catch(error => console.error('Error:', error));  
}


