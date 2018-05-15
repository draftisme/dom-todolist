//delete shopping item
function deleteItem(id){
    const delete_shopping_item = document.getElementById(id);          
    delete_shopping_item.parentNode.removeChild(delete_shopping_item); 
}

//check done
const checkbox = document.getElementsByClassName("done");
const shopping_list = document.getElementById("shopping-list").getElementsByTagName("tbody");
const done_list = document.getElementById("done-list").getElementsByTagName("tbody");

function moveItem(id){
    const move_shopping_item = document.getElementById(id);
    const item_name = move_shopping_item.children[1].innerText;
    const item_quantity = move_shopping_item.children[2].innerText;
    
    const item = `
        <tr id=${id}>
            <td><i onClick="undoItem(this.parentNode.parentNode.id)" class="fas fa-undo"></i></td>
            <td class="cross">${item_name}</td>
            <td>${item_quantity}</td>
            <td><i onClick="deleteItem(this.parentNode.parentNode.id)" class="fas fa-trash"></i></td>
        </tr>`
    
    done_list[0].innerHTML += item;

    loadHistory();

    move_shopping_item.parentNode.removeChild(move_shopping_item);
}

//add new
document.getElementById("add-item").addEventListener("click", function(event){
    event.preventDefault();

    const item_name = document.getElementById("item_name").value;
    const item_quantity = document.getElementById("item_quantity").value;
    const id = Math.floor(Math.random() * 1000 + 7);
    if(item_name !== '' && item_quantity !== ''){
        const newItem = `
        <tr id=${id}>
            <td><input class="done" type="checkbox" onClick="moveItem(this.parentNode.parentNode.id)" /></td>
            <td>${item_name}</td>
            <td>${item_quantity}</td>
            <td><i onClick="deleteItem(this.parentNode.parentNode.id)" class="fas fa-trash"></i></td>
        </tr>`
        shopping_list[0].innerHTML += newItem;
    } else{
        alert("You must fill in.");
    }    
    document.getElementById("item_name").value = "";
    document.getElementById("item_quantity").value = "";
})

//undo
function undoItem(id){
    const undo_item = document.getElementById(id);
    const item_name = undo_item.children[1].innerText;
    const item_quantity = undo_item.children[2].innerText;

    const undoItem = `
        <tr id=${id}>
            <td><input class="done" type="checkbox" onClick="moveItem(this.parentNode.parentNode.id)" /></td>
            <td>${item_name}</td>
            <td>${item_quantity}</td>
            <td><i onClick="deleteItem(this.parentNode.parentNode.id)" class="fas fa-trash"></i></td>
        </tr>`
    
    shopping_list[0].innerHTML += undoItem;

    undo_item.parentNode.removeChild(undo_item);
}

//done history
const historyArr = [];
function toggleDown(){   
    document.getElementById("history").classList.remove("toggle");    
    loadHistory();
    console.log(historyArr);
    checkToggle();    
}

function toggleUp(){
    document.getElementById("history").classList.add("toggle");
    checkToggle();
}

function checkToggle(){
    const iconFas = document.querySelectorAll(".js");
    const iconFasHasToggle = document.querySelector(".toggle")
    for(let i = 0; i < iconFas.length; i++){
        iconFas[i].contains(iconFasHasToggle) 
        ? iconFas[i].classList.remove("toggle")
        : iconFas[i].classList.add("toggle")
    }
}

function loadHistory(){
    const done_history = document.getElementById("done-list").getElementsByTagName("tr");
    for(let i = 1; i < done_history.length; i++){ //avoid first <tr> in thead
        const done_item = {
            id: done_history[i].id,
            name: done_history[i].children[1].innerText,
            quantity: done_history[i].children[2].innerText
        }       

        let index = -1;
        for(let j = 0; j < historyArr.length; j++){                
            if(historyArr[j].id === done_item.id){
                index = 1;
            }
        }
        if(index !== 1){
            historyArr.push(done_item);
        }  
    }

    document.getElementById("history-output").innerHTML = historyArr.map(function(val){
        return `${val.id} | ${val.name} | ${val.quantity}<br />`; 
    }).join('');

}