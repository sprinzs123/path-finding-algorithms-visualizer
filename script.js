// nodes are stored in x y format with index starting at 0

let width = 50;
let height = 20;

// creates grid using html tables
function createGrid() {
    let board = document.getElementById("board");
    let tableHTML = "";
    for (let r = 0; r < height; r++) {
        let currentArrayRow = [];
        let currentHTMLRow = `<tr id="row ${r}">`;
        for (let c = 0; c < width; c++) {
            let newNodeId = `${r}-${c}`;
            let newNodeClass = "unvisited";
            currentHTMLRow += `<th id="${newNodeId}" class="${newNodeClass}"></th>`;
        }
        currentHTMLRow += `</tr>`;
        tableHTML += currentHTMLRow;
    }
    board.innerHTML = tableHTML;
}
createGrid();

// checks if start or end node already plotted
// input class looking for in table and returns true or false if found or not
function checkTableNode(classCheck) {
    let grid = document.querySelector(".grid").innerHTML;
    if (grid.includes(classCheck)) {
        return true;
    } else {
        return false;
    }
}

// make starter and end points point
// class is passed to what node need to do
// do a check if this node exists in table already
function makeStartNodes(newNode) {
    let allUnvisited = document.querySelectorAll(".unvisited");
    allUnvisited.forEach((point) => {
        point.addEventListener("click", function () {
            if (checkTableNode(newNode)) {
                console.log(checkTableNode(newNode));
            } else {
                point.classList = newNode;
            }
        });
    });
}
// makeStartNodes('end-node')
// makeStartNodes('start-node')

// make walls
function wallGenerator() {
    let allUnvisited = document.querySelectorAll(".unvisited");
    allUnvisited.forEach((point) => {
        point.addEventListener("mouseover", function () {
            if (canDrag == true) {
                point.classList = "wall-node";
            }
        });
    });
}
wallGenerator();

let canDrag = false;

// check if mouse is down
function isMouseDown() {
    let allUnvisited = document.querySelectorAll(".unvisited");
    allUnvisited.forEach((point) => {
        point.addEventListener("mousedown", function () {
            canDrag = true;
        });
    });
}
isMouseDown();

// check if mouse is up so no longer able to draw borders
function isMouseReleased() {
    let allUnvisited = document.querySelectorAll(".unvisited");
    allUnvisited.forEach((point) => {
        point.addEventListener("mouseup", function () {
            canDrag = false;
        });
    });
}
isMouseDown();
isMouseReleased();

// hard coded start and end points
function makeNodes() {
    let start = document.getElementById("9-30");
    let end = document.getElementById("9-45");
    start.classList = "start-node";
    end.classList = "end-node";
}
makeNodes();

let visited = [];
let frontier = [];
let solution = {};



let startNode = document.querySelector(".start-node").id;
let endNode = document.querySelector(".end-node").id;
let testPoint = [];
testPoint.push(startNode);

// github https://github.com/tonypdavis/BFS-Maze-Solver/blob/master/BFS_v2.py
function search(x, y) {
    frontier.push((x, y));
    solution.put(x, y);
    while (frontier.length > 0) { }
}


let visitedNodes = new Set()
let nodesList = [];
let foundEnd = false;
let endCoordinates = [9, 45]
// nodeLocation is stored as array with [X, Y] variables as int

// add start node to array need not empty array for node exploration
function inertStartNode() {
    let startNode = document.querySelector(".start-node").id;
    let splittedNode = startNode.split("-")
    nodesList.push([ parseInt(splittedNode[0]), parseInt(splittedNode[1]) ]);
}


function insertEndNode() {
    let startNode = document.querySelector(".end-node").id;
    visitedNodes.add(startNode)
}
inertStartNode();
insertEndNode()


// check if coordinates for future nodes are valid/are not out of bounds
// in and out list of nodes
function checkByCoordinates(nodeList) {
    let approved = [];
    nodeList.forEach((nodeLocation) => {
        if (nodeLocation[1] >= 0 && nodeLocation[1] < width && nodeLocation[1] >= 0 && nodeLocation[1] < height) {
            approved.push(node);
        }
    });
    return approved;
}


// check if adjacent node is unvisited node
//  node can be unvisited if it is not in visited nodes set
function checkNodesType(nodeList) {
    let approved = [];
    nodeList.forEach((nodeLocation) => {
        if (nodeID == endCoordinates) {
            foundEnd = true;
        }
        if( visitedNodes.has(nodeLocation) == false) {
            approved.push(nodeLocation)
        }   
    });
    return approved;
}


// main function to get all valid node
function DrawNodes() {
    if (foundEnd == false) {
        setTimeout(() => {
            let firstNode = nodesList[0];
            let nodeObject = document.getElementById(firstNode);
            nodeObject.classList = "visited-node";
            let validNeighbors = newNodes(firstNode);
            validNeighbors.forEach((oneNode) => {
                nodesList.push(oneNode);
            });
            nodesList.shift();
            visitedNodes.add(firstNode)
            DrawNodes()
        }, 30);
    }
}

// DrawNodes()

// input is [x, y] location with int values
// get new/adjacent coordinates of a node
// node coordinates input, list of new  valid coordinates output as list
// outputs nodes that exist on table
// TO DO - maybe combine two functions together for checking valid nodes into this one for raster
function newNodes(nodeLocation) {
    let newCoordinates = [];
    let row = parseInt(coordinates[0]);
    let column = parseInt(coordinates[1]);
    newCoordinates.push(row + "-" + (column - 1));
    newCoordinates.push(row + "-" + (column + 1));
    newCoordinates.push(row + 1 + "-" + column);
    newCoordinates.push(row - 1 + "-" + column);
    newCoordinates = checkByCoordinates(newCoordinates);
    return checkNodesType(newCoordinates);
}




// working version of setTimeout
function test(count) {
    if (count < 5) {
        console.log(count)
        setTimeout(() => {
            count++
            test(count)
        }, 3000);
    }
}


// test(1)

