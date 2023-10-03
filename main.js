let renderer = {
    clearPage: function (div) {
        let page = document.getElementById(div)
        let childNodes = page.childNodes;
        for (let i = childNodes.length - 1; i >= 0; i--) {
            page.removeChild(childNodes[i]);
        }
    },
    makeTag: function (elem, id, where, classAttribute) {
        let cont = document.createElement(elem);
        let out = document.getElementById(where);
        cont.setAttribute("id", id);
        cont.setAttribute("class", classAttribute);
        out.appendChild(cont);
    },
    drawText: function (text, where) {
        let node = document.createTextNode(text);
        let out = document.getElementById(where);
        out.appendChild(node);

    },
    makeEvent: function (listening, event, funct, param = "()") {
        let element = document.getElementById(listening);
        element.addEventListener(event, function () {
            eval(funct + param);
        });
    },
    makeContainer: function (id, where, containerClass = "container", rowClass = "row", colClass = "col") {
        this.makeTag("div", id + "Cont", where, containerClass)
        this.makeTag("div", id + "Row0", id + "Cont", rowClass)
        this.makeTag("div", id + "Col0", id + "Row0", colClass)
    },
    setAtrubute: function (tagId, atrubute, value) {
        let tag = document.getElementById(tagId);
        tag.setAttribute(atrubute, value);
    },
    drawImage: function (imgLink, id, where, classAttribute, altText) {
        renderer.makeTag("img", id, where, classAttribute)
        renderer.setAtrubute(id, "src", imgLink)
        renderer.setAtrubute(id, "alt", altText)
    },
    makeTTTRow: function (id, rowNum, colIds, rowClass = "row", colClass = "col"){
        this.makeTag("div", id + "Row" + rowNum, id + "Cont", rowClass)
        this.makeTag("div", id + "Col" + colIds[0], id + "Row" + rowNum, colClass)
        this.makeTag("div", id + "Col" + colIds[1], id + "Row" + rowNum, colClass)
        this.makeTag("div", id + "Col" + colIds[2], id + "Row" + rowNum, colClass)
    },
    drawTTTBoard: function (id, where, containerClass = "container", rowClass = "row", colClass = "col") {
        this.makeContainer(id, where, containerClass, rowClass, colClass)
        this.makeTag("div", id + "Col1", id + "Row0", colClass)
        this.makeTag("div", id + "Col2", id + "Row0", colClass)
        this.makeTTTRow(id, 1, [3,4,5], rowClass, colClass)
        this.makeTTTRow(id, 2, [6,7,8], rowClass, colClass)
    },
    clickhandelTTTBoard: function (){
        
    }
};

let pageController = {
    
    currentGame: "",

    playTicTacToe: function(){
        this.currentGame = "TTT"
    },
    
    playConect4: function() {
        this.currentGame = "C4"
    }
};

let TTTController = {

    boardState: [
                ["x","","o"],
                ["x","o",""], 
                ["o","","x"]
                ],

    turnX: true,

    populateBoard: function(board, boardId){
        let count = 0;
        for (let subarr of board){
            for (let tile of subarr){
                renderer.drawText(tile, boardId + "Col" + count)
                count++;
            }
        }
    },

    boxClicked: function(indexArr, XorO) {
        this.boardState[indexArr[0]][indexArr[1]] = XorO;
        renderer.clearPage("div1")
        this.drawBoard()
    },

    convertStrArrToBoolArr: function(twoDArr, XorO){
        let out = []
        for (let subarr of twoDArr){
            let innerArr = [];
            for (let tile of subarr){
                if (tile === XorO){
                    innerArr.push(true)
                }else{
                    innerArr.push(false)
                }
            }
            out.push(innerArr);
        }
        return out
    },

    hasPlayerWon: function(arr) {
        let horazontal = ((arr[0][0] && arr[0][1] && arr[0][2]) || (arr[1][0] && arr[1][1] && arr[1][2]) || (arr[2][0] && arr[2][1] && arr[2][2]));

        let vertical = ((arr[0][0] && arr[1][0] && arr[2][0]) || (arr[0][1] && arr[1][1] && arr[2][1]) || (arr[0][2] && arr[1][2] && arr[2][2]));

        let diaganal = ((arr[0][0] && arr[1][1] && arr[2][2]) || (arr[0][2] && arr[1][1] && arr[2][0]))

        return horazontal || vertical || diaganal
    },

    

};

renderer.drawTTTBoard("TTTBoard", "div1")
TTTController.populateBoard(TTTController.boardState, "TTTBoard")

console.log("X: " + TTTController.hasPlayerWon(TTTController.convertStrArrToBoolArr(TTTController.boardState, "x")))

console.log("O: " + TTTController.hasPlayerWon(TTTController.convertStrArrToBoolArr(TTTController.boardState, "o")))