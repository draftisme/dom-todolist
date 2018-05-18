# dom-todolist

1. Add unique id into <tr>
2. Other button onClick to target the id of each item by `this.parentNode.parentNode.id`:
  e.g. 
  `
    <tr id="1">
      <td>Chicken</td>
      <td>400 gram</td>
      <td><button onClick="deleteItem(this.parentNode.parentNode.id)">Delete</button></td>
    </tr>
  `
