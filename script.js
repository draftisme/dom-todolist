let count = 5;

//delete shopping item
function deleteItem(event){
    const delete_shopping_item = event.target.parentNode.parentNode;          
    delete_shopping_item.parentNode.removeChild(delete_shopping_item); 
}

//check done
const checkbox = document.getElementsByClassName("done");
const shopping_list = document.getElementById("shopping-list").getElementsByTagName("tbody");
const done_list = document.getElementById("done-list").getElementsByTagName("tbody");

function createItemTD(item__, btn__){
    const item_id = item__.getAttribute("id");
    const item_name = item__.children[1].innerText;
    const item_quantity = item__.children[2].innerText;   
    const item_class = item__.children[1].getAttribute("class");
    let item_name_class;
    item_class === null ? item_name_class = `<td class="cross">${item_name}</td>`
    : item_name_class = `<td>${item_name}</td>`    
    const item = `
        <tr id=${item_id}>
            <td>${btn__}</td>
            ${item_name_class}
            <td>${item_quantity}</td>
            <td><i onClick="deleteItem(event)" class="fas fa-trash"></i></td>
        </tr>`
    return item;
}

function moveItem(event){
    const move_shopping_item = event.target.parentNode.parentNode;
    const undo_btn = `<i onClick="undoItem(event)" class="fas fa-undo"></i>`
    const done_shopping_item = createItemTD(move_shopping_item, undo_btn); 
    done_list[0].innerHTML += done_shopping_item;
    loadHistory();
    move_shopping_item.parentNode.removeChild(move_shopping_item);
}

//add new
document.getElementById("add-item").addEventListener("click", function(event){
    event.preventDefault();
    const item_name = document.getElementById("item_name").value;
    const item_quantity = document.getElementById("item_quantity").value;
    const id = ++count;
    if(item_name !== '' && item_quantity !== ''){
        const newItem = `
        <tr id=${id}>
            <td><input class="done" type="checkbox" onClick="moveItem(event)" /></td>
            <td>${item_name}</td>
            <td>${item_quantity}</td>
            <td><i onClick="deleteItem(event)" class="fas fa-trash"></i></td>
        </tr>`
        shopping_list[0].innerHTML += newItem;
    } else{
        alert("You must fill in.");
    }    
    document.getElementById("item_name").value = "";
    document.getElementById("item_quantity").value = "";
})

//undo
function undoItem(event){
    let done_shopping_item = event.target.parentNode.parentNode;
    const done_btn = `<input class="done" type="checkbox" onClick="moveItem(event)" />`;  
    const undone_shopping_item = createItemTD(done_shopping_item, done_btn);
    shopping_list[0].innerHTML += undone_shopping_item;
    done_shopping_item.parentNode.removeChild(done_shopping_item);
}

//done history
const historyArr = [];
function toggleDown(event){   
    event.target.parentNode.nextElementSibling.classList.toggle("toggle");   
    loadHistory();
    checkToggle(event);    
}

function checkToggle(event){
    const iconFas = event.target;
    const iconFasHasToggle = iconFas.getAttribute("class");
    iconFasHasToggle.indexOf("toggle") !== -1
    ? iconFas.classList.remove("toggle")
    : iconFas.classList.add("toggle")
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