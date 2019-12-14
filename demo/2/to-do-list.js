
document.addEventListener('DOMContentLoaded', () => {
    
    // var url = 'http://127.0.0.1:5000/api/v1/task';
    var url = 'https://to-do-list-backend-server.herokuapp.com/api/v1/task';

    fetch(url, 
        {
            method: 'GET',
            // mode : 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
    )
    .then(resp  => resp.json() )
    .then(response => {
        console.log(response)
        response.data.forEach(record_dict => {
            const li = create_li_(record_dict.id,record_dict.task) 

            // document.querySelector("#tasklist").append(li)
            document.querySelector('#tasklist').insertBefore(li, document.querySelector("#tasklist").firstChild)


            console.log(record_dict.task, record_dict.id)            
        });
        // console.log('Success:', JSON.stringify(response.data[0]))
    }
    )
    .catch(error => console.error('Error:', error));  

    // By default, button is disabled
    document.querySelector('#addtask').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#jobs').onkeyup = (event) => {

        if (document.querySelector('#jobs').value.length > 0)
            document.querySelector('#addtask').disabled = false;
        else
            document.querySelector('#addtask').disabled = true;
    };
    document.querySelector("#jobs").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            if (document.querySelector('#jobs').value.length > 0)
                addtotable();         
        }
    });

    document.querySelector('#addtask').onclick = () => {
        addtotable();
    };

    document.querySelector('#delete_all').onclick = () => {
        delete_all();
    };

});


function create_li_ (task_id, task){
    var li = document.createElement("li")

    var div = document.createElement("div")
    div.className="block_p_b"
    var par = document.createElement("p")
    par.innerHTML = task
    var but = document.createElement("button")
    but.id = task_id
    but.onclick = delete_task
    but.innerHTML = "DELETE ME"
    but.className = "button task_id"  

    but.id = task_id
    div.appendChild(par)
    div.appendChild(but)
    li.appendChild(div)

    return li

}

function addtotable(){
    var task = document.querySelector('#jobs').value;

    // var url = 'http://127.0.0.1:5000/api/v1/task';
        var url = 'https://to-do-list-backend-server.herokuapp.com/api/v1/task';

        var data = {"task": task };

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
            const li = create_li_(response.id,task)
            // document.querySelector('#tasklist').append(li);
            document.querySelector('#tasklist').insertBefore(li, document.querySelector("#tasklist").firstChild)

            console.log('Success:', JSON.stringify(response))
        }
        )
        .catch(error => console.error('Error:', error));      


        document.querySelector("#jobs").value ="";
        document.querySelector('#addtask').disabled = true;

}

function delete_task(event){

    const element = event.target
    const id = event.target.id
    // var url = 'http://127.0.0.1:5000/api/v1/task/delete';
    var url = 'https://to-do-list-backend-server.herokuapp.com/api/v1/task/delete';

    console.log(id)
    var data = {"task_id": id };

    fetch(url, 
        {
            method: 'DELETE',
            body: JSON.stringify(data),
            // mode : 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                
            }
        }
    )
    .then(resp  => resp.json() )
    .then(response => {
         console.log('Success:', JSON.stringify(response))
         let id = response.id
         console.log(id)
         element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
    }
    )

}

function delete_all(event){
    // var url = 'http://127.0.0.1:5000/api/v1/task/delete/all';
    var url = 'https://to-do-list-backend-server.herokuapp.com/api/v1/task/delete/all';

    fetch(url, 
        {
            method: 'DELETE',
            // mode : 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    .then(resp  => resp.json() )
    .then(response => {
         console.log('Success:', JSON.stringify(response))

    }
    )

    const elem = document.querySelector("#tasklist")
    elem.innerHTML = ''
    
}

