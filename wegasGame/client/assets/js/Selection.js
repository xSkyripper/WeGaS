var Selection = function (game) {
    this.box = game.add.graphics(0, 0);
    this.selectionStarted = false;
    this.startPos = {
        x: 0,
        y: 0
    };
    this.lastPos = {
        x: 0,
        y: 0
    };
    this.triArea = function (A, B, C) {
        return Math.floor(1 / 2 * Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)));
    }
};

Selection.prototype.update = function () {
    if (game.input.activePointer.x >= 700) { //daca sunt in GUI
        this.box.clear();
        return;
    }
    if (game.input.activePointer.isDown && game.input.activePointer.button == 0) {
        if (this.selectionStarted == false) {
            this.selectionStarted = true;
            this.startPos.x = game.input.activePointer.worldX;
            this.startPos.y = game.input.activePointer.worldY;
        }
        this.box.clear();
        this.box.lineStyle(1.15, 0x939393, 1);
        this.box.beginFill(0x939393, 0.2);

        this.box.drawRect(this.startPos.x, this.startPos.y,
            game.input.activePointer.worldX - this.startPos.x,
            game.input.activePointer.worldY - this.startPos.y);
    }


    if (game.input.activePointer.isUp && this.selectionStarted == true) {
        this.lastPos.x = game.input.activePointer.worldX;
        this.lastPos.y = game.input.activePointer.worldY;
        this.selectionStarted = false;
        this.box.clear();
        var R = {
            x: this.startPos.x,
            y: this.lastPos.y
        };
        var Q = {
            x: this.lastPos.x,
            y: this.startPos.y
        };

        for (var i = 0; i < me.createdUnits.length; i++) {
            me.createdUnits[i].isSelected = false;
            var unitPos = {
                id: me.createdUnits[i].id,
                x: me.createdUnits[i].unit.x + 32,
                y: me.createdUnits[i].unit.y + 32
            };

            var sumArea = this.triArea(this.startPos, unitPos, R) + this.triArea(R, unitPos, this.lastPos) + this.triArea(this.lastPos, unitPos, Q) + this.triArea(unitPos, Q, this.startPos);
            var rectArea = Math.floor(Math.abs((this.lastPos.x - this.startPos.x) * (this.startPos.y - this.lastPos.y)));

            if (sumArea != 0 && rectArea != 0 && sumArea <= rectArea) {
                console.log('#### Am selectat pe ' + unitPos.id);
                me.createdUnits[i].isSelected = true;
            }
        }
        // console.log('startSelect.x: ' + this.startPos.x + '  startSelect.y: ' + this.startPos.y);
        // console.log('LastSelect.x: ' + this.lastPos.x + '  LastSelect.y: ' + this.lastPos.y);

        var X = map.layer.getTileX(this.startPos.x);
        var Y = map.layer.getTileY(this.startPos.y);

        console.log("RawGrid la " + X + " " + Y + " este " + map.rawGrid[Y][X]);
        console.log("Pozitie fixa: " + this.startPos.x + " " + this.startPos.y);
    }
};

window.Selection = Selection;

/*

 Old code

 */

// var box;
// var selectionStarted = false;
// var selectionStartPos = {x: 0, y: 0};
// var selectionLastPos = {x: 0, y: 0};
//
// function triArea(A, B, C) {
//     return Math.floor(1 / 2 * Math.abs((B.x - A.x) * (C.y - A.y) - (C.x - A.x) * (B.y - A.y)));
// }
//
// function unitSelection() {
//
//     if (game.input.activePointer.isDown && game.input.activePointer.button == 0) {
//         if (selectionStarted == false) {
//             selectionStarted = true;
//             selectionStartPos.x = game.input.activePointer.worldX;
//             selectionStartPos.y = game.input.activePointer.worldY;
//         }
//         box.clear();
//         box.lineStyle(2, 0x0000FF, 1);
//         box.drawRect(selectionStartPos.x, selectionStartPos.y,
//             game.input.activePointer.worldX - selectionStartPos.x,
//             game.input.activePointer.worldY - selectionStartPos.y);
//     }
//
//
//     if (game.input.activePointer.isUp && selectionStarted == true) {
//         selectionLastPos.x = game.input.activePointer.worldX;
//         selectionLastPos.y = game.input.activePointer.worldY;
//         selectionStarted = false;
//         box.clear();
//
//         var selectionRectangle = new Phaser.Rectangle(selectionStartPos.x,
//             selectionStartPos.y,
//             (selectionLastPos.x - selectionStartPos.x),
//             (selectionLastPos.y - selectionStartPos.y));
//
//         for (var i = 0; i < me.createdUnits.length; i++) {
//             me.createdUnits[i].isSelected = false;
//             // if (selectionRectangle.contains(me.createdUnits[i].unit.x + 32, me.createdUnits[i].unit.y + 32)) {
//             //     console.log('############Am selectat pe ' + me.createdUnits[i].id);
//             //     me.createdUnits[i].isSelected = true;
//             // }
//             var unitPos = {
//                 id: me.createdUnits[i].id,
//                 x: me.createdUnits[i].unit.x + 32,
//                 y: me.createdUnits[i].unit.y + 32
//             };
//
//             var R = {
//                 x: selectionStartPos.x,
//                 y: selectionLastPos.y
//             };
//             var Q = {
//                 x: selectionLastPos.x,
//                 y: selectionStartPos.y
//             };
//
//             var sumArea = triArea(selectionStartPos, unitPos, R) + triArea(R, unitPos, selectionLastPos) + triArea(selectionLastPos, unitPos, Q) + triArea(unitPos, Q, selectionStartPos);
//             var rectArea = Math.floor(Math.abs((selectionLastPos.x - selectionStartPos.x) * (selectionStartPos.y - selectionLastPos.y)));
//
//             if (sumArea != 0 && rectArea != 0 && sumArea <= rectArea) {
//                 console.log('####Am selectat pe ' + unitPos.id);
//                 me.createdUnits[i].isSelected = true;
//             }
//         }
//         console.log('startSelect.x: ' + selectionStartPos.x + 'startSelect.y: ' + selectionStartPos.y);
//         console.log('LastSelect.x: ' + selectionLastPos.x + 'LastSelect.y: ' + selectionLastPos.y);
//     }
// }
