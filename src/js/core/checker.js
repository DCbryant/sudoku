// 检查数据解决方案

// 简化方案
// 先将数组排序，然后join成str，判断 '123456789' === '123456789'

// 生成标记

function checkArray(array){
    const length = array.length
    const marks = new Array(length)
    marks.fill(true)

    for(let i=0;i<length-1;i++){
        if(!marks[i]){
            continue
        }
        const v = array[i]
        // 是否有效 0 无效 1-9无效
        if(!v){
            marks[i] = false
            continue
        }
        // 是否有重复 i+1 ~9,是否和i位置的数据重复
        for(let j=i+1;j<length;j++){
            if(v === array[j]){
                marks[i] = marks[j] = false
            }
        }
    }

    return marks
}

// 输入martix，用户完成的数独数据，9*9
// 处理，对行、列、宫进行检查,并填写marks
// 输出，检查是否成功，marks
const Toolkit = require('./toolkit')
module.exports =  class Checker{
    constructor(martix){
        this._martix = martix
        this._martixMarks = Toolkit.martix.makeMatrix(true)
    }

    get martixMarks(){
        return this._martixMarks
    }

    get isSuccess(){
        return this._success
    }

    check(){
        this.checkRows()
        this.checkCols()
        this.checkBoxs()

        // 检查是否成功
        this._success = this._martixMarks.every(row => row.every(mark => mark))
        return this._success
    }

    checkRows(){
        for(let rowIndex=0;rowIndex<9;rowIndex++){
            const row = this._martix[rowIndex]
            const marks = checkArray(row)
            for(let colIndex=0;colIndex<marks.length;colIndex++){
                if(!marks[colIndex]){
                    this._martixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }

    checkCols(){
        for(let colIndex=0;colIndex<9;colIndex++){
            const cols = []
            for(let rowIndex=0;rowIndex<9;rowIndex++){
                cols[rowIndex] = this._martix[rowIndex][colIndex]
            }
            const marks = checkArray(cols)
            for(let rowIndex=0;rowIndex<marks.length;rowIndex++){
                if(!marks[rowIndex]){
                    this._martixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }

    checkBoxs(){
        for(let boxIndex=0;boxIndex<9;boxIndex++){
            const boxes = Toolkit.box.getBoxCells(this._martix,boxIndex)
            const marks = checkArray(boxes)
            for(let cellIndex=0;cellIndex<9;cellIndex++){
                if(!marks[cellIndex]){
                    const {rowIndex,colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex,cellIndex)
                    this._martixMarks[rowIndex][colIndex] = false
                }
            }
        }
    }
}

// const Generator = require('./generator')
// const generater = new Generator()
// generater.generate()
// const martix = generater.martix



// const checker = new Checker(martix)

// console.log('check result',checker.check())
// console.log(checker.martixMarks)

// martix[1][1] = 0
// martix[2][3] = martix[3][5] = 5
// const checker1 = new Checker(martix)
// console.log('check result',checker1.check())
// console.log(checker1.martixMarks)
