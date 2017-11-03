// 生成九宫格
const Toolkit = require('../core/toolkit')
const Checker = require('../core/checker')
const Sudoku = require('../core/sudoku')
module.exports =  class Grid{
    constructor(container){
        this._$container = $(container)
    }

    build(){
        // const generator = new Generator()
        // generator.generate()
        // const martix = generator.martix
        const sudoku = new Sudoku()
        sudoku.make()
        const martix = sudoku.puzzleMartix

        const rowGroupClasses = ["row_g_top","row_g_middle","row_g_bottom"]
        const colGroupClasses = ["col_g_left","col_g_center","col_g_right"]

        const $cells = martix.map((rowValues) => rowValues
            .map((cellValue,cellIndex) =>{
            return $("<span></span>")
                .addClass(colGroupClasses[cellIndex % 3])
                .addClass(cellValue ? 'marked' : 'empty')
                .text(cellValue)
        }))

        const $divArray = $cells.map(($spanArray,rowIndex) => {
            return $("<div></div>")
                .addClass('row')
                .addClass(rowGroupClasses[rowIndex % 3])
                .append($spanArray)
        })

        this._$container.append($divArray)
    }

    layout(){
        const width = $("span:first",this._$container).width()
        $("span",this._$container)
            .height(width)
            .css({
                "line-height":`${width}px`,
                "font-size":width > 32 ? `${width / 2}px` : ''
            })
    }

    bindPopup(popUpNumbers){
        this._$container.on('click','span',e => {
            const $cell = $(e.target)
            if($cell.is('.marked')){
                return;
            }
            popUpNumbers.popup($cell)
        })
    }

    /**
     * 检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记
     */
    check(){
        // 获取需要检查的数据
        const data = this._$container.children().map((rowIndex,div) => {
            return $(div).children().map((colIndex,span) => parseInt($(span).text()) || 0)
        }).toArray().map($data => $data.toArray())
        
        console.log(data)
       
        const checker = new Checker(data)
        if(checker.check()){
            return true
        }else{
            // 检查不成功进行标记
            const marks = checker.martixMarks
            this._$container.children()
                .each((rowIndex,div) => {
                    $(div).children().each((colIndex,span) => {
                        const $span = $(span)
                        if($span.is('.marked') || marks[rowIndex][colIndex]){
                            $(span).removeClass('error')
                        }else{
                            $(span).addClass('error')
                        }
                        
                    })
                })
        }

    }

    /**
     * 重置键盘到初始状态
     */
    reset(){
        this._$container.find('span:not(.marked)')
            .removeClass('error mark1 mark2').addClass('empty').text(0)
    }
    /**
     * 清除错误标记
     */
    clear(){
        this._$container.find('span.error').removeClass('error')
    }
    /**
     * 重建新的一盘，开始新一局
     */
    rebuild(){
        this._$container.empty()
        this.build()
        this.layout()
    }
}

