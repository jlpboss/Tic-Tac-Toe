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
    makeTTTRow: function (id, rowNum, colIds, rowClass = "row", colClass = "col") {
        this.makeTag("div", id + "Row" + rowNum, id + "Cont", rowClass)
        this.makeTag("div", id + "Col" + colIds[0], id + "Row" + rowNum, colClass)
        this.makeTag("div", id + "Col" + colIds[1], id + "Row" + rowNum, colClass)
        this.makeTag("div", id + "Col" + colIds[2], id + "Row" + rowNum, colClass)
    },
    drawTTTBoard: function (id, where, containerClass = "container", rowClass = "row", colClass = "col") {
        this.makeContainer(id, where, containerClass, rowClass, colClass)
        this.makeTag("div", id + "Col1", id + "Row0", colClass)
        this.makeTag("div", id + "Col2", id + "Row0", colClass)
        this.makeTTTRow(id, 1, [3, 4, 5], rowClass, colClass)
        this.makeTTTRow(id, 2, [6, 7, 8], rowClass, colClass)
    },
    clickhandelTTTBoard: function (boardId, turn) {
        for (i = 0; i < 9; i++) {
            this.makeEvent(boardId + "Col" + i, "click", "TTTController.boxClicked", "([" + Math.floor(i / 3) + ", " + i % 3 + "], " + "'" + turn + "'" + ")")
        }
    },
    drawTTTHeadder: function (id, where, containerClass = "container", rowClass = "row", colClass = "col") {
        this.makeContainer(id, where, containerClass, rowClass, colClass)
        this.makeTag("div", id + "Col1", id + "Row0", colClass)
        this.makeTag("div", id + "Col2", id + "Row0", colClass)
    },
    drawTTTReset: function (id, where, containerClass = "container", rowClass = "row", colClass = "col") {
        this.makeContainer(id, where, containerClass, rowClass, colClass)
    },
    clickhandelTTTReset: function (id, funct) {
        this.makeEvent(id + "Col0", "click", funct, "()")
    },
    makeC4Row: function (id, rowNum, colStart, rowClass = "row", colClass = "col") {
        this.makeTag("div", id + "Row" + rowNum, id + "Cont", rowClass)
        this.makeTag("div", "", id + "Row" + rowNum, "col")
        for (i = 0; i < 7; i++) {
            this.makeTag("div", id + "Col" + (colStart + i), id + "Row" + rowNum, colClass)
        }
        this.makeTag("div", "", id + "Row" + rowNum, "col")
    },
    drawC4Board: function (id, where, containerClass = "container", rowClass = "row", colClass = "col") {
        this.makeTag("div", id + "Cont", where, containerClass)
        this.makeTag("div", id + "Row0", id + "Cont", rowClass)
        this.makeTag("div", "", id + "Row0", "col")
        this.makeTag("div", id + "Col0", id + "Row0", colClass)
        for (i = 1; i < 7; i++) {
            this.makeTag("div", id + "Col" + i, id + "Row0", colClass)
        }
        this.makeTag("div", "", id + "Row0", "col")
        this.makeC4Row(id, 1, 7, rowClass, colClass)
        this.makeC4Row(id, 2, 14, rowClass, colClass)
        this.makeC4Row(id, 3, 21, rowClass, colClass)
        this.makeC4Row(id, 4, 28, rowClass, colClass)
        this.makeC4Row(id, 5, 35, rowClass, colClass)
        this.makeC4Row(id, "B", 100, rowClass, colClass)
    },
    clickhandelC4Buttons: function (boardId, RorY) {
        for (i = 0; i < 7; i++) {
            this.makeEvent(boardId + "Col" + (100+ i), "click", "C4Controller.dropClicked", "(" + i + ", " + "'" + RorY + "'" +")")
        }
    },
}
let pageController = {

    currentGame: "",

    TTTXWins: 0,

    TTTOWins: 0,

    C4RWins: 0,

    C4YWins: 0,

    playSelectPage: function () {
        this.currentGame = ""
        this.updateGame()
    },

    playTicTacToe: function () {
        this.currentGame = "TTT"
        this.updateGame()
    },

    playConect4: function () {
        this.currentGame = "C4"
        this.updateGame()
    },

    drawSelectPage: function (id, containerClass = "container", rowClass = "row", colClass = "col") {
        renderer.clearPage("div1")
        renderer.makeContainer(id, "div1", containerClass, rowClass, colClass)
        renderer.makeTag("div", id + "Col1", id + "Row0", colClass)

        renderer.drawText("Tic-Tac-Toe", id + "Col0")
        renderer.drawText("Connect 4", id + "Col1")

        renderer.makeEvent(id + "Col0", "click", "pageController.playTicTacToe", "()")
        renderer.makeEvent(id + "Col1", "click", "pageController.playConect4", "()")
    },

    updateGame: function () {
        if (this.currentGame === "TTT") {
            TTTController.resetGame()
        } else if (this.currentGame === "C4") {
            C4Controller.resetGame()
        } else {
            this.drawSelectPage("page", "container", "row", "col menu text-center rounded");
        }
    }

};
let TTTController = {

    boardState: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],

    turn: "o",

    turnCount: 0,

    populateBoard: function (board, boardId) {
        let count = 0;
        for (let subarr of board) {
            for (let tile of subarr) {
                renderer.drawText(tile.toUpperCase(), boardId + "Col" + count)
                count++;
            }
        }
    },
    populateHeadder: function (headderId, turntext, headderTextArr, headderSubTextArr) {

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
    populateReset: function (text, id) {
        renderer.drawText(text, id + "Col0")
    },

    boxClicked: function (indexArr, XorO) {
        if (this.boardState[indexArr[0]][indexArr[1]] == "") {
            this.boardState[indexArr[0]][indexArr[1]] = XorO;
            renderer.clearPage("div1")
            this.updateBoard()
        }
    },

    convertStrArrToBoolArr: function (twoDArr, XorO) {
        let out = []
        for (let subarr of twoDArr) {
            let innerArr = [];
            for (let tile of subarr) {
                if (tile === XorO) {
                    innerArr.push(true)
                } else {
                    innerArr.push(false)
                }
            }
            out.push(innerArr);
        }
        return out
    },

    hasPlayerWon: function (arr) {
        let horazontal = ((arr[0][0] && arr[0][1] && arr[0][2]) || (arr[1][0] && arr[1][1] && arr[1][2]) || (arr[2][0] && arr[2][1] && arr[2][2]));

        let vertical = ((arr[0][0] && arr[1][0] && arr[2][0]) || (arr[0][1] && arr[1][1] && arr[2][1]) || (arr[0][2] && arr[1][2] && arr[2][2]));

        let diaganal = ((arr[0][0] && arr[1][1] && arr[2][2]) || (arr[0][2] && arr[1][1] && arr[2][0]))

        return horazontal || vertical || diaganal
    },

    resetGame: function () {
        this.boardState = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        this.turn = "o";
        this.turnCount = 0;
        this.updateBoard();
    },

    drawPlayerhasWonBoard: function () {
        renderer.clearPage("div1");
        if (this.turn === "x") {
            pageController.TTTXWins++;
        }
        else if (this.turn === "o") {
            pageController.TTTOWins++;
        }
        renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
        this.populateHeadder("headder", this.turn.toUpperCase() + " Won!", ["X Wins: ", "O Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
        renderer.drawTTTBoard("TTTBoard", "div1", "container", "row", "col TTT text-center rounded");
        TTTController.populateBoard(TTTController.boardState, "TTTBoard");
        renderer.drawTTTReset("TTTReset", "div1", "container", "row", "col TTT text-center rounded");
        TTTController.populateReset("Go Again?", "TTTReset");
        renderer.clickhandelTTTReset("TTTReset", "TTTController.resetGame");
        renderer.drawTTTReset("gameReset", "div1", "container", "row", "col TTT text-center rounded");
        TTTController.populateReset("Return to Menu", "gameReset");
        renderer.clickhandelTTTReset("gameReset", "pageController.playSelectPage");
    },
    drawPlayersDrawBoard: function () {
        renderer.clearPage("div1");
        renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
        this.populateHeadder("headder", "Its a Draw!", ["X Wins: ", "O Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
        renderer.drawTTTBoard("TTTBoard", "div1", "container", "row", "col TTT text-center rounded");
        TTTController.populateBoard(TTTController.boardState, "TTTBoard");
        renderer.drawTTTReset("TTTReset", "div1", "container", "row", "col TTT text-center rounded");
        TTTController.populateReset("Go Again?", "TTTReset");
        renderer.clickhandelTTTReset("TTTReset", "TTTController.resetGame");
        renderer.drawTTTReset("gameReset", "div1", "container", "row", "col TTT text-center rounded");
        TTTController.populateReset("Return to Menu", "gameReset");
        renderer.clickhandelTTTReset("gameReset", "pageController.playSelectPage");
    },
    drawPlayBoard: function () {
        renderer.clearPage("div1");
        renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
        this.populateHeadder("headder", "Its " + this.turn.toUpperCase() + "'s Turn", ["X Wins: ", "O Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
        renderer.drawTTTBoard("TTTBoard", "div1", "container", "row", "col TTT text-center rounded");
        this.populateBoard(TTTController.boardState, "TTTBoard");
        renderer.clickhandelTTTBoard("TTTBoard", this.turn);
    },
    updateBoard: function () {
        if (TTTController.hasPlayerWon(TTTController.convertStrArrToBoolArr(TTTController.boardState, this.turn))) {
            this.drawPlayerhasWonBoard();
        } else if (this.turnCount > 8) {
            this.drawPlayersDrawBoard();
        } else {
            if (this.turn === "x") {
                this.turn = "o"
            }
            else if (this.turn === "o") {
                this.turn = "x"
            }
            this.turnCount++;
            this.drawPlayBoard();
        }
    }



};
let C4Controller = {
    boardState: [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ],

    turn: "y",

    lastMove: [0,0],

    resetGame: function () {
        this.boardState = [
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""]
        ];
        this.turn = "y";
        this.lastMove = [0,0];
        this.updateBoard();
    },

    populateBoard: function (board, boardId) {
        let count = 0;
        for (let subarr of board) {
            for (let tile of subarr) {
                renderer.makeTag("div", boardId + "Col" + count + "peice", boardId + "Col" + count, "C4Peice" + tile)
                count++;
            }
        }
    },
    populateButtons: function (boardId) {
            for (count = 0; count < 7; count++) {
                renderer.makeTag("div", boardId + "Col" + (100 + count) + "Button", boardId + "Col" + (100 + count), "text-center C4Peice" + this.turn)
                renderer.drawText("↓", boardId + "Col" + (100 + count) + "Button")
            }
    },
    dropClicked: function(colIndex, RorY){
        if (this.boardState[0][colIndex] == "") {
            this.boardState[this.whereToDropPeice(colIndex)][colIndex] = RorY;
            renderer.clearPage("div1")
            this.updateBoard()
        }
    },
    whereToDropPeice: function(colIndex){
        for(index in this.boardState){
            if ((this.boardState[Math.abs((index - 5) % 6)][colIndex]) === ""){
                this.lastMove[0] = Math.abs((index - 5) % 6)
                this.lastMove[1] = colIndex
                return Math.abs((index - 5) % 6)
            }
        }
    },

    convertStrArrToCenteredBoolArr: function (board, RorY, lastMoveIndex) {
        let out = []
        for (i = lastMoveIndex[0] - 3; i < lastMoveIndex[0] + 4; i++){
            let innerArr = [];
            for (x = lastMoveIndex[1] - 3; x < lastMoveIndex[1] + 4; x++){
                if (i < 0 || x < 0 || i > 5 || x > 6) {
                    innerArr.push(false)
                } else if(board[i][x] === RorY) {
                    innerArr.push(true)
                } else {
                    innerArr.push(false)
                }
            }
            out.push(innerArr);
        }
        return out
    },
    hasPlayerWon: function (arr) {
        let horazontal = ((arr[3][0] && arr[3][1] && arr[3][2]) || (arr[3][1] && arr[3][2] && arr[3][4]) || (arr[3][2] && arr[3][4] && arr[3][5]) || (arr[3][4] && arr[3][5] && arr[3][6]));

        let vertical = ((arr[0][3] && arr[1][3] && arr[2][3]) || (arr[1][3] && arr[2][3] && arr[4][3]) || (arr[2][3] && arr[4][3] && arr[5][3]) || (arr[4][3] && arr[5][3] && arr[6][3]));

        let diaganalL = ((arr[0][0] && arr[1][1] && arr[2][2]) || (arr[1][1] && arr[2][2] && arr[4][4]) || (arr[2][2] && arr[4][4] && arr[5][5]) || (arr[4][4] && arr[5][5] && arr[6][6]))

        let diaganalR = ((arr[0][6] && arr[1][5] && arr[2][4]) || (arr[1][5] && arr[2][4] && arr[4][2]) || (arr[2][4] && arr[4][2] && arr[5][1]) || (arr[4][2] && arr[5][1] && arr[6][0]))

        return horazontal || vertical || diaganalL || diaganalR
    },
    populateHeadder: function (headderId, turntext, headderTextArr, headderSubTextArr) {

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
    drawHeadText: function(text, dipslayArrTop, dipslayArrBot) {
        renderer.drawTTTHeadder("headder", "div1", "container", "row", "col TTTHead text-center rounded")
        this.populateHeadder("headder", text, dipslayArrTop, dipslayArrBot)
    },
    populateReset: function (text, id) {
        renderer.drawText(text, id + "Col0")
    },
    drawResteButton: function(){
        renderer.drawTTTReset("C4Reset", "div1", "container", "row", "col TTT text-center rounded");
        this.populateReset("Go Again?", "C4Reset");
        renderer.clickhandelTTTReset("C4Reset", "C4Controller.resetGame");
        renderer.drawTTTReset("gameReset", "div1", "container", "row", "col TTT text-center rounded");
        this.populateReset("Return to Menu", "gameReset");
        renderer.clickhandelTTTReset("gameReset", "pageController.playSelectPage");
    },
    drawPlayBoard: function() {
        if (this.turn === "r") {
            this.drawHeadText("Its Red's Turn", ["Red Wins: ", "Yellow Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
        }
        else if (this.turn === "y") {
            this.drawHeadText("Its Yellow's Turn", ["Red Wins: ", "Yellow Wins: "], [pageController.TTTXWins, pageController.TTTOWins])
        }
        renderer.drawC4Board("board", "div1", "container C4Board", "row gx-3 gy-5", "col-1");
        this.populateBoard(this.boardState, "board")
        this.populateButtons("board")
        renderer.clickhandelC4Buttons("board", this.turn)
    },
    drawPlayerhasWonBoard: function(){
        if (this.turn === "r") {
            pageController.C4RWins++;
            this.drawHeadText("Red Won!", ["Red Wins: ", "Yellow Wins: "],[pageController.C4RWins, pageController.C4YWins])
        }
        else if (this.turn === "y") {
            pageController.C4YWins++;
            this.drawHeadText("Yellow Won!", ["Red Wins: ", "Yellow Wins: "],[pageController.C4RWins, pageController.C4YWins])
        }
        
        renderer.drawC4Board("board", "div1", "container C4Board", "row gx-3 gy-5", "col-1");
        this.populateBoard(this.boardState, "board")
        this.drawResteButton()
    },
    drawPlayersDrawBoard: function(){
        this.drawHeadText("Its a Draw", ["Red Wins: ", "Yellow Wins: "],[pageController.C4RWins, pageController.C4YWins])
        renderer.drawC4Board("board", "div1", "container C4Board", "row gx-3 gy-5", "col-1");
        this.populateBoard(this.boardState, "board")
        this.drawResteButton()
    },
    updateBoard: function(){
        
        renderer.clearPage("div1")

        if (C4Controller.hasPlayerWon(C4Controller.convertStrArrToCenteredBoolArr(C4Controller.boardState, this.turn, this.lastMove))) {
            this.drawPlayerhasWonBoard();
        } else if (!(this.boardState[0].includes(""))) {
            this.drawPlayersDrawBoard();
        } else {
            if (this.turn === "r") {
                this.turn = "y"
            }
            else if (this.turn === "y") {
                this.turn = "r"
            }
            this.drawPlayBoard();
        }
    }
}
//  console.log(C4Controller.hasPlayerWon(C4Controller.convertStrArrToCenteredBoolArr(C4Controller.boardState, "r", [3,1])))
//   C4Controller.drawPlayBoard();
pageController.updateGame();
//TTTController.updateBoard();
