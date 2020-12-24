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
// let visitedNodes = new Set
// let nodesList = [];
// let visitedNodesOrder = []
let canDrag = false;
let foundEnd = false;
let endCoordinates = null

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
    let start = document.getElementById("8-15");
    let end = document.getElementById("8-35");
    start.classList = "start-node";
    end.classList = "end-node";
}
makeNodes();


function createEndCheck() {
    let startNode = document.querySelector(".end-node").id;
    let splittedNode = startNode.split("-")
    endCoordinates = [splittedNode[0], parseInt(splittedNode[1])]
}
createEndCheck()


// ##########################################################
// ################ OOP version of program ##################
// ##########################################################


// input is [x, y] location with int values
// get new/adjacent coordinates of a node
// node coordinates input, list of new  valid coordinates output as list
// outputs nodes that exist on table



let nodesList = []
let availableNodes = []
let visitedNodes = new Set
let visitedNodesOrder = []
let solution = []


class Node {
    constructor(nodeId) {
        this.nodeId = nodeId
        this.nodeType = 'unvisited'
        this.x = null
        this.y = null
        this.distance = Infinity
    };

    setX() {
        let nodeId = this.nodeId
        this.x = parseInt(nodeId.split("-")[1])
    };

    setY() {
        let nodeId = this.nodeId
        this.y = parseInt(nodeId.split("-")[0])
    };

    updateType(newType) {
        this.nodeType = newType
    };
    setDistance(num) {
        this.distance = num
    };
};

// make list of all unvisited nodes
// where going to check for valid nodes
// get nodeId and pas into function that is going to make all objects
function unvisitedNodes() {
    let allUnvisitedNodes = document.querySelectorAll('.unvisited')
    allUnvisitedNodes.forEach((nodeObject) => {
        let nodeId = nodeObject.id
        let newNode = new Node(nodeId)
        newNode.setY()
        newNode.setX()
        availableNodes.push(newNode)
    });
};


// add start node to array need not empty array for node exploration
// also add node object to 
function inertStartNode() {
    let startNode = document.querySelector(".start-node").id;

    let splittedNode = startNode.split("-")
    nodesList.push([parseInt(splittedNode[0]), parseInt(splittedNode[1])]);
    let newNode = new Node(startNode)
    newNode.setX()
    newNode.setY()
    newNode.updateType('start-node')
    newNode.setDistance(0)
    availableNodes.push(newNode)
}
inertStartNode();


// function to get all valid node into list
// iterate over created nodes later in function
function GetVisitedNodes() {
    if (foundEnd == false && nodesList.length != 0) {
        let firstNode = nodesList[0];
        let NodeId = firstNode[0] + '-' + firstNode[1]
        if (visitedNodes.has(NodeId) == false) {
            let firstNode = nodesList[0];
            let nodeId = firstNode[0] + '-' + firstNode[1]
            visitedNodes.add(nodeId)
            let validNeighbors = newNodes(firstNode);
            nodesList = nodesList.concat(validNeighbors)

            let nodeObject = getObject(nodeId)
            let nodePosition = availableNodes.indexOf(nodeObject)
            visitedNodesOrder.push(availableNodes[nodePosition])
            let nodeDistance = getNodeDistance(validNeighbors)
            availableNodes[nodePosition].distance = nodeDistance
            availableNodes[nodePosition].nodeType = 'visited' 
            GetVisitedNodes()
        } else {
            nodesList.shift()
            GetVisitedNodes()
        }
    }
};


// result of list of all valid nodes
// check if nodes location are not out of bounds
// input is [y, x] location with int values
function newNodes(nodeLocation) {
    let newCoordinates = [];
    newCoordinates.push([nodeLocation[0], nodeLocation[1] + 1]);
    newCoordinates.push([nodeLocation[0], nodeLocation[1] - 1]);
    newCoordinates.push([nodeLocation[0] + 1, nodeLocation[1]]);
    newCoordinates.push([nodeLocation[0] - 1, nodeLocation[1]]);
    newCoordinates = checkByCoordinates(newCoordinates);
    return checkNodesType(newCoordinates);
};


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
};


// checking if node is final node
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
};


// check array of unvisited nodes
//  return true if node been discovered already
function nodeBeenDiscovered(nodeId) {
    let allFound = availableNodes.filter(function (node) {
        if (node.type != 'unvisited') {
            return true
        };
    })
    if (allFound.length == 0) {
        return true
    } else {
        return false
    }
}


// get list of neighbor objects
// input is list of [y-x], so need to convert to nodeId string first for filtering
function getNeighborObjects(neighbors) {
    let nodeObjects = []
    neighbors.forEach((neighbor) => {
        let nodeId = neighbor[0] + '-' + neighbor[1]
        nodeObjects.push(getObject(nodeId))
    });
    return nodeObjects
};


// get distance of of node by looking min distance of a it neighbors
// input is list of [y-x], so need to convert to nodeId string first for filtering
// make objects first prior filtering

function getNodeDistance(neighbors) {
    let nodeObjects = getNeighborObjects(neighbors)
    let distances = []    
    nodeObjects.forEach((neighbor) => {
        if(neighbor != undefined){
            distances.push(neighbor.distance)
        };
    });
    distances.sort()
    if(distances[0] == Infinity){
        return 0
    } else {
        return distances[0] + 1
    }
};


// get object node from nodeId
// used to put this object in visitedNodesOrder array
// this array will be iterated to draw nodes 
function getObject(nodeId) {
    let allFound = availableNodes.filter(function (node) {
        if (node.nodeId == nodeId) {
            return true
        };
    });
    if(allFound[0] != undefined){
        return allFound[0]
    };
};


function animateDijkstra(){
    visitedNodesOrder.shift()
    solution.pop()
    for (let i = 0; i <= visitedNodesOrder.length; i++) {
      if (i === visitedNodesOrder.length) {
        setTimeout(() => {
        animateShortestPath();
        console.log('here')
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesOrder[i];
        document.getElementById(node.nodeId).className =
          'visited-node';
      }, 10 * i);
    }
  }


function animateShortestPath() {
    console.log(solution)

    for (let i = 0; i < solution.length; i++) {
      setTimeout(() => {
        const node = solution[i];
        document.getElementById(node).className =
          'path-node';
      }, 50 * i);
    }
  }
  

// start algorith by submit btn
function startAlgorithm() {
    let startBtn = document.querySelector('.submit-btn')
    startBtn.addEventListener('click', function () {
        unvisitedNodes()
        addWalls()
        GetVisitedNodes()
        let endNode = document.querySelector('.end-node').id
        getSolution(endNode)
        animateDijkstra()
    });
};
startAlgorithm()


// make solution
function getSolution(nodeId) {
    if(nodeId != null){
        let nodeLocation = [parseInt(nodeId.split("-")[0]), parseInt(nodeId.split("-")[1])]
        let validNeighbors = newNodes(nodeLocation)
        let neighborObjects = getNeighborObjects(validNeighbors)
        let foundStart = false
    
        neighborObjects.forEach((nodeObject) => {
            if(nodeObject != undefined){
                if(nodeObject.distance == 0){
                    foundStart = true
                };
            }
        });
    
    
        if(foundStart == false) {
            solution.unshift(nodeId)
            let previousNode = previousNodeId(neighborObjects)
            getSolution(previousNode)
        } else {
            solution.unshift(nodeId)
        };

    }

};


// get nodeId of smallest min distance from object list
// need for backtracking recursive call 
// gives node where previous node came from
function previousNodeId(neighborObjects){
    let smallest = Infinity
    let nodeId = null
    neighborObjects.forEach((node) =>{
        if(node != undefined){
            if(node.distance < smallest){
                smallest = node.distance
                nodeId = node.nodeId
            };
        };

    });
    return nodeId
};