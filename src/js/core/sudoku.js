// 生成数独游戏

// 生成完成的解决方案 Generator
// 随机去除部分数据，按比例

const Generator = require('./generator')

module.exports = class Sudoku{
    constructor(){
        // 生成完成的解决方案
        const generator = new Generator()
        generator.generate()
        this.solutionMartix = generator.martix
    }

    make(level = 5){
        this.puzzleMartix = this.solutionMartix.map(row => {
            return row.map(cell => Math.random() * 9 < level ? 0 :cell) 
        })
    }
}