function makeRow(v=0) {
    const array = new Array(9)
    array.fill(v)
    return array
}

function makeMatrix(v=0) {
    // 需要将每个数字逐一映射，否则一概皆改
    // return Array.from({length:9}).map(() => makeRow(v))
    return Array.from({length:9},() => makeRow(v))
}

/**
 * 
 * Fisher-Yates 洗牌算法
 */

function shuffle(array){
    // 0 array.length-2  最后一个数字无需交换
    const endIndex = array.length - 2
    for(let i=0;i<=endIndex;i++){
        let j = i + Math.floor(Math.random() * (array.length - i));
        [array[i],array[j]] = [array[j],array[i]]
    }
    return array
}

const test = Array.from({length:9},(v,i) => i)
console.log(test)
console.log(shuffle(test))