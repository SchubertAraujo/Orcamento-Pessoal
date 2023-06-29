// function loadListExpenses(){
//     var expenses = Array()
//     expenses = database.getAllRecords();

//     insertValuesInRow(expenses)
// }

function searchExpenses(){
    let year = document.getElementById("year-select").value
    let month= document.getElementById("month-select").value
    let day = document.getElementById("day-input").value
    let type= document.getElementById("type-select").value
    let description = document.getElementById("description-input").value
    let expensesValue = document.getElementById("expensesValue").value

    var expenses = new Expenses(
        year, 
        month, 
        day, 
        type, 
        description,
        expensesValue);
    
    database.search(expenses)
}


function insertValuesInRow(expenses){
    var expensesList = document.getElementById('expensesList')
    let sumExpenses = 0
    expenses.forEach(e => {
        var row = expensesList.insertRow()
        sumExpenses += Number(e.expensesValue)
        row.insertCell(0).innerHTML = `${e.day}/${e.month}/${e.year}`
        row.insertCell(1).innerHTML = e.type
        row.insertCell(2).innerHTML = e.description
        row.insertCell(3).innerHTML = Number(e.expensesValue).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
        let removeButton = document.createElement("button")
        removeButton.className = "button-remove style-inputs"
        removeButton.innerHTML = "x"
        removeButton.id = `id_${e.id}`
        removeButton.onclick = () => {
            database.remove(e.id)
            window.location.reload()
        }
        row.insertCell(4).append(removeButton) 
       
    });
    let sumExpensesFooter = document.getElementById('sumExpensesFooter')
    rowFooter = sumExpensesFooter.insertRow()
   
    rowFooter.insertCell(0).innerHTML = ''
    rowFooter.insertCell(1).innerHTML = ''
    rowFooter.insertCell(2).innerHTML = 'Soma:'
    rowFooter.insertCell(3).innerHTML = sumExpenses.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

}


function isNumber(event, isFloat) {

    let regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
    if (isFloat) {
        regex = new RegExp(/(^\d*\.?\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/)
    }
         
    return !event.key.match(regex) && event.preventDefault();
 }