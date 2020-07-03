let width = 50
let height = 20

function createGrid(){   
    let board = document.getElementById('board')
    let tableHTML = "";
    for (let r = 0; r < height; r++) {
        let currentArrayRow = []
        let currentHTMLRow = `<tr id="row ${r}">` 
        for (let c = 0; c < width; c ++){
            let newNodeId = `${r}-${c}`
            let newNodeClass = "unvisited";
            currentHTMLRow += `<th id="${newNodeId}" class="${newNodeClass}"></th>`;            
        };
    currentHTMLRow += `</tr>`
    tableHTML += currentHTMLRow    
    };
    board.innerHTML = tableHTML    
};
createGrid()

// let tableHTML = "";

// tableHTML = ''
// let board = document.querySelector('#test')
// for (let r = 0; r < height; r++) {
//     let currentHTMLRow = `<th id="row ${r}>1</th>"` 
//     tableHTML += currentHTMLRow
// }

// let test = document.getElementById('board')
// parent = `<tr>`
// child = `<th>rrw</th>`


// let tableHTML2 = `<tr>
// <th>Month</th>
// <th>Savings</th>
// </tr>
// `;
// parent.innerHTML = tableHTML2

// test.innerHTML = tableHTML2
