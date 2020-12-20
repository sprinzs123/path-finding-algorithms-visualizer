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



// nodeLocation is stored as array with [Y, x] variables as int
// global variables
let canDrag = false;
let visitedNodes = new Set
let nodesList = [];
let visitedNodesOrder = []
let foundEnd = false;
let endCoordinates = [9, 45]

// check if mouse is down
function isMouseDown() {
    let allUnvisited = document.querySelectorAll(".unvisited");
    allUnvisited.forEach((point) => {
        point.addEventListener("mousedown", function () {
            canDrag = true;
        });
    });
}

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


// add wall nodes to visited nodes
function addWalls() {
    let = allWallNodes = document.querySelectorAll('.wall-node');
    allWallNodes.forEach((wallNode) => {
        visitedNodes.add(wallNode.id)
    });
};


// hard coded start and end points
function makeNodes() {
    let start = document.getElementById("9-35");
    let end = document.getElementById("9-45");
    start.classList = "start-node";
    end.classList = "end-node";
}
makeNodes();


let startNode = document.querySelector(".start-node").id;
let endNode = document.querySelector(".end-node").id;




// add start node to array need not empty array for node exploration
function inertStartNode() {
    let startNode = document.querySelector(".start-node").id;
    let splittedNode = startNode.split("-")
    nodesList.push([parseInt(splittedNode[0]), parseInt(splittedNode[1])]);
}


function insertEndNode() {
    let endNode = document.querySelector(".end-node").id;
    visitedNodes.add(endNode)
}
inertStartNode();
// insertEndNode()


// check if coordinates for future nodes are valid/are not out of bounds
// in and out list of nodes
// also check if nodes been visited 
function checkByCoordinates(nodeList) {
    let approved = [];
    nodeList.forEach((nodeLocation) => {
        if (nodeLocation[0] >= 0 && nodeLocation[0] < height && nodeLocation[1] >= 0 && nodeLocation[1] < width) {
            let NodeId = nodeLocation[0] + '-' + nodeLocation[1]
            approved.push(nodeLocation);
        }
    });
    return approved;
}


// checking if node i final node
// need for recursive function check
function checkNodesType(nodeList) {
    let approved = [];
    nodeList.forEach((nodeLocation) => {
        if (nodeLocation[0] == endCoordinates[0] && nodeLocation[1] == endCoordinates[1]) {
            foundEnd = true;
            console.log('Found final')
        } else {
            approved.push(nodeLocation)
        }
    });
    return approved;
}


// function to get all valid node into list
// iterate over created nodes later in function
function GetVisitedNodes() {
    if (foundEnd == false && nodesList.length != 0) {
        let firstNode = nodesList[0];
        let NodeId = firstNode[0] + '-' + firstNode[1]
        if (visitedNodes.has(NodeId) == false) {
            let firstNode = nodesList[0];
            let NodeId = firstNode[0] + '-' + firstNode[1]
            visitedNodes.add(NodeId)
            visitedNodesOrder.push(NodeId)
            let validNeighbors = newNodes(firstNode);
            nodesList = nodesList.concat(validNeighbors)
            nodesList.shift();
            GetVisitedNodes()
        } else {
            nodesList.shift()
            GetVisitedNodes()
        }
    }
}


// iterate over visited nodes that are created
function drawNode() {

    visitedNodesOrder.shift()
    for (i = 0; i < visitedNodesOrder.length; i++) {
        drawRecursively(i)
    }
}

function drawRecursively(i) {
    setTimeout(() => {
        let NodeId = visitedNodesOrder[i]
        let nodeObject = document.getElementById(NodeId);
        nodeObject.classList = "visited-node";
    }, 20 * i);

}

// start algorith by submit btn
function startAlgorithm() {
    let startBtn = document.querySelector('.submit-btn')
    startBtn.addEventListener('click', function () {
        addWalls()
        GetVisitedNodes()
        drawNode()
    })
}
startAlgorithm()

// input is [x, y] location with int values
// get new/adjacent coordinates of a node
// node coordinates input, list of new  valid coordinates output as list
// outputs nodes that exist on table
// TO DO - maybe combine two functions together for checking valid nodes into this one for raster
function newNodes(nodeLocation) {
    let newCoordinates = [];
    newCoordinates.push([nodeLocation[0], nodeLocation[1] + 1]);
    newCoordinates.push([nodeLocation[0], nodeLocation[1] - 1]);
    newCoordinates.push([nodeLocation[0] + 1, nodeLocation[1]]);
    newCoordinates.push([nodeLocation[0] - 1, nodeLocation[1]]);
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



