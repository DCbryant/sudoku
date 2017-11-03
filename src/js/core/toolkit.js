// 工具集
// 矩阵和数组相关工具


const martixToolkit = {
    makeRow(v=0){
        const array = new Array(9)
        array.fill(v)
        return array
    },
    
    makeMatrix(v=0){
        return Array.from({length:9},() => this.makeRow(v))
    },
    
    shuffle(array){
        const endIndex = array.length - 2
        for(let i=0;i<=endIndex;i++){
            let j = i + Math.floor(Math.random() * (array.length - i));
            [array[i],array[j]] = [array[j],array[i]]
        }
        return array
    },

    /**
     * 检查指定位置可以填写数据
     */
    checkFillable(martix,n,rowIndex,colIndex){
        // // 数据抽取：行，列，宫
        // 行
        const row = martix[rowIndex]
        // 列
        const column = this.makeRow().map((v,i) => martix[i][colIndex])
        // 宫
        const {boxIndex} = boxToolkit.convertToBoxIndex(rowIndex,colIndex)

        const box = boxToolkit.getBoxCells(martix,boxIndex)
        for(let i=0;i<9;i++){
            if(row[i] === n || column[i] === n || box[i] === n){
                return false
            }
        }
        return true
    }
}

/**
 * 宫坐标系工具
 */
const boxToolkit = {
    convertToBoxIndex(rowIndex,colIndex){
        return{
            boxIndex:Math.floor(rowIndex/3) * 3 + Math.floor(colIndex/3),
            cellIndex:rowIndex % 3 * 3 + colIndex % 3
        }
    },

    convertFromBoxIndex(boxIndex,cellIndex){
        return{
            rowIndex:Math.floor(boxIndex/3) * 3 + Math.floor(cellIndex/3),
            colIndex:boxIndex % 3 * 3 + cellIndex % 3
        }
    },

    getBoxCells(martix,boxIndex){
        const startRowIndex = Math.floor(boxIndex / 3) * 3
        const startColIndex = boxIndex % 3 * 3
        const result = []
        for(let cellIndex = 0;cellIndex < 9;cellIndex++){
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
            const colIndex = startColIndex + cellIndex % 3
            result.push(martix[rowIndex][colIndex])
        }
        return result
    }
 }

// 工具集
module.exports = class Toolkit{
    /**
     * 矩阵和数组相关的工具
     */    
    static get martix(){
        return martixToolkit
    }
    /**
     * 宫坐标系工具
     */
    static get box(){
        return boxToolkit
    }
}