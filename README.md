# dom-todolist

1. Add unique id into <tr>
2. Other button onClick to target the id of each item by `this.parentNode.parentNode.id`:
  For example:
  ```
    <tr id="1">
      <td>Chicken</td>
      <td>400 gram</td>
      <td><button onClick="deleteItem(this.parentNode.parentNode.id)">Delete</button></td>
    </tr>
  ```
3. Get value input, then create a new item object with unique automatic-generated id:
  For example: 
  ```
    const newItem = {
      id, 
      name,
      quantity
    }
    document.geElementById("#output").innerHTML += newItem;
  ```
