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
    drawContentBox: function (id, where, headText, numberofSubBoxes, SubBoxTextArray) {
        this.makeContainer(id, where, "container", "row ", "col")
        this.drawText(headText, id + "Col")
        this.makeTag("div", id + "Row2", id + "Cont", "row")
        for (let i = 0; i < numberofSubBoxes; i++) {
            this.makeTag("div", id + "Col" + i, id + "Row2", "col-" + (12 / numberofSubBoxes))
            this.drawText(SubBoxTextArray[i], id + "Col" + i)
        }
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
    clickhandelTTTBoard: function (boardId, turn){
        for (i = 0; i < 9; i++){
            this.makeEvent(boardId + "Col" + i, "click", "TTTController.boxClicked", "(["+ Math.floor(i/3) + ", " + i % 3 + "], " + "'" + turn + "'" + ")")
        }
    },
    drawTTTHeadder: function(id, where, containerClass = "container", rowClass = "row", colClass = "col"){
        this.makeContainer(id, where, containerClass, rowClass, colClass)
        this.makeTag("div", id + "Col1", id + "Row0", colClass)
        this.makeTag("div", id + "Col2", id + "Row0", colClass)
    },
    drawTTTReset: function(id, where, containerClass = "container", rowClass = "row", colClass = "col"){
        this.makeContainer(id, where, containerClass, rowClass, colClass)
    },
    clickhandelTTTReset: function(id, funct){
        this.makeEvent(id + "Col0", "click", funct, "()")
    }
}
let pageController = {
    
    currentGame: "",

    TTTXWins: 0,

    TTTOWins: 0,

    playTicTacToe: function(){
        this.currentGame = "TTT"
    },
    
    playConect4: function() {
        this.currentGame = "C4"
    }

};

let TTTController = {

    boardState: [
                ["","",""],
                ["","",""], 
                ["","",""]
                ],

    turn: "o",

    turnCount: 0,

    populateBoard: function(board, boardId){
        let count = 0;
        for (let subarr of board){
            for (let tile of subarr){
                renderer.drawText(tile.toUpperCase(), boardId + "Col" + count)
                count++;
            }
        }
    },
    populateHeadder: function(headderId, turntext, headderTextArr, headderSubTextArr){
        
        renderer.drawText(turntext, headderId + "Col1")

        renderer.makeTag("div", headderId + "Col0Box0", headderId + "Col0", "row")
        renderer.makeTag("div", headderId + "Col0Box0Col0", headderId + "Col0Box0", "col-12")
        renderer.makeTag("div", headderId + "Col0Box0Col1", headderId + "Col0Box0", "col-12")

        renderer.makeTag("div", headderId + "Col2Box1", headderId + "Col2", "row")
        renderer.makeTag("div", headderId + "Col2Box1Col0", headderId + "Col2Box1", "col-12")
        renderer.makeTag("div", headderId + "Col2Box1Col1", headderId + "Col2Box1", "col-12")
        
        renderer.drawText(headderTextArr[0], headderId + "Col0Box0Col0")
        renderer.drawText(headderSubTextArr[0], headderId + "Col0Box0Col1")

        renderer.drawText(headderTextArr[1], headderId + "Col2Box1Col0")
        renderer.drawText(headderSubTextArr[1], headderId + "Col2Box1Col1")
    },
    populateReset: function(text, id){
        renderer.drawText(text, id + "Col0")
    },

    boxClicked: function(indexArr, XorO) {
        this.boardState[indexArr[0]][indexArr[1]] = XorO;
        renderer.clearPage("div1")
        this.updateBoard()

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

    resetGame: function() {
        this.boardState = [
            ["","",""],
            ["","",""], 
            ["","",""]
            ];
        this.turn = "o";
        this.turnCount = 0;
        this.updateBoard();
    },
    
    updateBoard: function(){
        if (TTTController.hasPlayerWon(TTTController.convertStrArrToBoolArr(TTTController.boardState, this.turn))){
            renderer.clearPage("div1");
            if (this.turn === "x"){
                pageController.TTTXWins++;
            }
            else if (this.turn === "o"){
                pageController.TTTOWins++;
            }
            renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
            this.populateHeadder("headder", this.turn.toUpperCase() + " Won!", ["X Wins: ", "O Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
            renderer.drawTTTBoard("TTTBoard", "div1", "container", "row", "col TTT text-center rounded");
            TTTController.populateBoard(TTTController.boardState, "TTTBoard");
            renderer.drawTTTReset("TTTReset", "div1", "container", "row", "col TTT text-center rounded");
            TTTController.populateReset("Go Again?", "TTTReset");
            renderer.clickhandelTTTReset("TTTReset", "TTTController.resetGame");

        }else if(this.turnCount > 8){
            renderer.clearPage("div1");
            renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
            this.populateHeadder("headder", "Its a Draw!", ["X Wins: ", "O Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
            renderer.drawTTTBoard("TTTBoard", "div1", "container", "row", "col TTT text-center rounded");
            TTTController.populateBoard(TTTController.boardState, "TTTBoard");
            renderer.drawTTTReset("TTTReset", "div1", "container", "row", "col TTT text-center rounded");
            TTTController.populateReset("Go Again?", "TTTReset");
            renderer.clickhandelTTTReset("TTTReset", "TTTController.resetGame");
        }else{
            if (this.turn === "x"){
                this.turn = "o"
            }
            else if (this.turn === "o"){
                this.turn = "x"
            }
            this.turnCount++;

            renderer.clearPage("div1");
            renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
            this.populateHeadder("headder", "Its " + this.turn.toUpperCase() + "'s Turn", ["X Wins: ", "O Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
            renderer.drawTTTBoard("TTTBoard", "div1", "container", "row", "col TTT text-center rounded");
            this.populateBoard(TTTController.boardState, "TTTBoard");
            renderer.clickhandelTTTBoard("TTTBoard", this.turn);
        }
    }

    

};

TTTController.updateBoard()
