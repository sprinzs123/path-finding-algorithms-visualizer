// nodes are stored in x y format with index starting at 0


let width = 50
let height = 20


// creates grid using html tables
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


// checks if start or end node already plotted
// input class looking for in table and returns true or false if found or not
function checkTableNode(classCheck){
    let grid = document.querySelector('.grid').innerHTML   
    if(grid.includes(classCheck)){
        return true
    }
    else{
        return false
    }   
}


// make starter and end points point
// class is passed to what node need to do
// do a check if this node exists in table already
function makeStartNodes(newNode){
    let allUnvisited = document.querySelectorAll('.unvisited')
    allUnvisited.forEach(point => {
        point.addEventListener('click', function(){
            if(checkTableNode(newNode)){
                console.log(checkTableNode(newNode));                
            }
            else{
                point.classList = newNode
            }
        })
    });
}
// makeStartNodes('end-node')
// makeStartNodes('start-node')


// make walls
function wallGenerator(){
    let allUnvisited = document.querySelectorAll('.unvisited')
    allUnvisited.forEach(point => {
        point.addEventListener('mouseover', function(){
            if(canDrag == true){
                point.classList = 'wall-node'

            }
        });   
    });
}
wallGenerator()


let canDrag = false

// check if mouse is down
function isMouseDown(){
    let allUnvisited = document.querySelectorAll('.unvisited')
    allUnvisited.forEach(point => {
        point.addEventListener('mousedown', function(){
            canDrag = true
        });   
    });    
}
isMouseDown()

// check if mouse is up so no longer able to draw borders
function isMouseReleased(){
    let allUnvisited = document.querySelectorAll('.unvisited')
    allUnvisited.forEach(point => {
        point.addEventListener('mouseup', function(){
            canDrag = false
        });   
    });    
}
isMouseDown()
isMouseReleased()



// hard coded start and end points
function makeNodes(){
    let start = document.getElementById('9-39')
    let end = document.getElementById('9-10')
    start.classList = 'start-node'
    end.classList = 'end-node'
}
makeNodes()

let visited = []
let frontier = []
let solution = {}

let startNode = document.querySelector('.start-node').id
let endNode = document.querySelector('.end-node').id
let testPoint = []
testPoint.push(startNode)


// github https://github.com/tonypdavis/BFS-Maze-Solver/blob/master/BFS_v2.py
function search(x, y){
    frontier.push((x, y))
    solution.put(x, y)
    while(frontier.length > 0){
            }
}


let nodesList = []
let foundEnd = false

// check if coordinates for future nodes are valid/are not out of bounds
// in and out list of nodes
function checkByCoordinates(nodeList){
    let approved = []
    nodeList.forEach(node =>{
        let coordinates = node.split('-')    
        let row = parseInt(coordinates[0])
        let column = parseInt(coordinates[1])
        if(column >= 0 && column < width && row >=0 && row < height){           
            approved.push(node)
        }
    })    
    return approved
}




// check if adjacent node is unvisited node
function checkNodesType(nodeList){
    let approved = []
    nodeList.forEach(nodeID =>{
        oneNode = document.getElementById(nodeID)
        if(oneNode.classList == 'unvisited'){
            approved.push(nodeID)
        }
        if(oneNode.classList == 'end-node'){
            approved.push(nodeID)
            foundEnd = true            
        }
    })
    return approved
}


// main function to get all valid node
function inertStartNode(){
    let startNode = document.querySelector('.start-node').id
    nodesList.push(startNode)
    let count = 0
    while(count < 10000000){
        let firstNode = nodesList[0]
        let nodeObject = document.getElementById(firstNode)        
        nodeObject.classList = 'visited-node'
        let validNeighbors = newNodes(firstNode)
        validNeighbors.forEach( oneNode => {
            nodesList.push(oneNode)        
        })
        nodesList.shift()
        count ++
    }
}
// inertStartNode()




// input is id of a sting
// get new/adjacent coordinates of a node
// node coordinates input, list of new  valid coordinates output as list
function newNodes(nodeGrid){
    let coordinates = nodeGrid.split('-')
    let newCoordinates = []
    let row = parseInt(coordinates[0])
    let column = parseInt(coordinates[1])
    newCoordinates.push((row + '-' + (column -1)))
    newCoordinates.push((row + '-' + (column +1)))
    newCoordinates.push(((row +1) + '-' + column))
    newCoordinates.push(((row -1)+ '-' + column))
    newCoordinates = checkByCoordinates(newCoordinates)
    return checkNodesType(newCoordinates)
}


// trying with pushing and upshifting array
function makeList(){
    let validNeighbors = newNodes(nodesList[0])
    validNeighbors.forEach( oneNode => {
        nodesList.push(oneNode)
    })
    
}

// makeList()


// recursive function to show new nodes on graphs
// everything prototype o far and hard coded
function showNewNodes(nodeId){
    let nodeList = newNodes(nodeId)
    let found = false
    nodeList.forEach(oneNode => {
        let nodeClass = document.getElementById(oneNode).classList
        if( nodeClass[0] == 'unvisited' && found == false){
            let nodeObject = document.getElementById(oneNode)
            nodeObject.classList = 'visited-node'
            showNewNodes(oneNode)            
        }
        if( nodeClass[0] == 'end-node'){
            found = true
        }
    })
}

// showNewNodes('9-10')