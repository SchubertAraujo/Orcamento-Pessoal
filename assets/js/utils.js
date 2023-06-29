// function loadListExpenses(){
//     var expenses = Array()
//     expenses = database.getAllRecords();

//     insertValuesInRow(expenses)
// }


function isNumber(event, isFloat) {

    let regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
    if (isFloat) {
        regex = new RegExp(/(^\d*\.?\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/)
    }
         
    return !event.key.match(regex) && event.preventDefault();
 }