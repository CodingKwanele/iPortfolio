// Create event listeners for the buttons
document.getElementById("Print_The_List").addEventListener("click", printView);
document.getElementById("Add_It_To_The_List").addEventListener("click", addGoalToList);
document.getElementById("Download_The_List").addEventListener("click", downloadPdf);
document.getElementById("share_The_List").addEventListener("click", chooseShareMethod);

const myList = [];
const myListArea = document.getElementById("wisList");

// Add a goal to the list
function addGoalToList() {
    const inputElement = document.getElementById("What_I_Want");
    // Check if the list already has 10 goals
    if (myList.length >= 10) {
        alert("Achieve the first 10 goals before adding more. Goal management is crucial!");
    } else {
        addAGoal(inputElement.value);
        resetInput(inputElement);
    }
}

function addAGoal(goalToAdd) {
    myList.push(goalToAdd);
    const newListItem = document.createElement("li");
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "goal-checkbox";
    const label = document.createElement('label');
    label.appendChild(document.createTextNode(goalToAdd));
    newListItem.appendChild(checkbox);
    newListItem.appendChild(label);
    myListArea.appendChild(newListItem);
}

function chooseShareMethod() {
    var shareOption = prompt("How would you like to share the list? Enter 'email' or 'whatsapp'.");
    shareList(shareOption);
}

function printView() {
    const printContent = myList.sort().map(goal => `<li>${goal}</li>`).join('');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<html><head><title>Printed Goal List</title></head><body><h1>Goal List</h1><ul>${printContent}</ul></body></html>`);
    printWindow.document.close();
    printWindow.print();
}

document.getElementById("What_I_Want").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addGoalToList();
    }
});

function shareList(method) {
    const listString = generateListString();
    switch (method) {
        case 'email':
            shareViaEmail(listString);
            break;
        case 'whatsapp':
            shareViaWhatsApp(listString);
            break;
        default:
            alert("Invalid sharing method. Please enter 'email' or 'whatsapp'.");
    }
}

function generateListString() {
    return myList.map((goal, index) => `${index + 1}. ${goal}`).join('\n');
}

function shareViaEmail(listString) {
    const subject = encodeURIComponent("Goal List");
    const body = encodeURIComponent(`Here is the list of goals:\n\n${listString}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

function shareViaWhatsApp(listString) {
    const encodedMessage = encodeURIComponent(`Here is the list of goals:\n\n${listString}`);
    window.location.href = `https://wa.me/?text=${encodedMessage}`;
}

function resetInput(inputElement) {
    inputElement.value = "";
}

function downloadPdf() {
    // Create a new jsPDF instance
    const pdf = new jspdf.jsPDF();

    // Add title to the PDF
    pdf.setFontSize(22);
    pdf.text('My Goal List', 20, 20);

    // Add goals to the PDF
    myList.forEach((goal, index) => {
        pdf.setFontSize(16);
        pdf.text(`${index + 1}. ${goal}`, 20, 30 + (index * 10));
    });

    // Save the PDF with a filename
    pdf.save('goal-list.pdf');
}
