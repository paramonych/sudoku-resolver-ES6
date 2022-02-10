const badSudoku = [
    [1,2,3,  4,5,6,  7,8,9],
    [1,2,3,  4,5,6,  7,8,9],
    [1,2,3,  4,5,6,  7,8,9],

    [1,2,3,  4,5,6,  7,8,9],
    [1,2,3,  4,5,6,  7,8,9],
    [1,2,3,  4,5,6,  7,8,9],

    [1,2,3,  4,5,6,  7,8,9],
    [1,2,3,  4,5,6,  7,8,9],
    [1,2,3,  4,5,6,  7,8,9]
]

const goodSudoku = [
    [2,3,8,  9,6,5,  7,1,4],
    [7,5,9,  4,1,3,  6,8,2],
    [4,1,6,  2,7,8,  9,5,3],

    [9,4,5,  1,3,6,  2,7,8],
    [6,8,7,  5,2,4,  1,3,9],
    [3,2,1,  8,9,7,  4,6,5],

    [1,6,2,  3,5,9,  8,4,7],
    [5,7,4,  6,8,2,  3,9,1],
    [8,9,3,  7,4,1,  5,2,6]
]

const tripletSize = 3

const SUDOKU = goodSudoku //badSudoku //PLEASE CHANGE THIS VALUE IF YOU NEED TO TEST

//-----------------------------------------------------------------------

function resolveSudoku(toResolve) {
    return verifyRules(deconstructSudoku(toResolve))
}

function verifyRules(toVerify) {
    return toVerify
        .map(nextRule => 
            nextRule.filter(_ => _ != sumReduce(range(10)))
        )
        .filter(_ => _.length > 0)
        .length > 0
}

function deconstructSudoku(toDeconstruct) {

    let rowsSums = toDeconstruct.map(row => sumReduce(row))
    let colsSums = transposeMatrix(toDeconstruct).map(row => sumReduce(row))

    let flattened = toDeconstruct.reduce((a,b) => a.concat(b))
    let triplets = []
    
    while(triplets.length < toDeconstruct.length*tripletSize) 
        triplets.push(flattened.splice(0,tripletSize))

    let cellsSums = range(tripletSize)
        .map(_ => _*toDeconstruct.length)
        .map(rowShift => 
            range(tripletSize)
                .map(index => 
                    triplets[rowShift+index]
                        .concat(triplets[rowShift+index+tripletSize])
                        .concat(triplets[rowShift+index+tripletSize*2])
                )
        )
        .reduce((a,b) => a.concat(b))
        .map(_ => sumReduce(_))

    return [rowsSums, colsSums, cellsSums]
}

function pushMapElement(hashMap, element) {
    hashMap[`_${element}`] = element
}

function transposeMatrix(m) {
    return m[0].map((_,colIndex) => m.map(row => row[colIndex]))
}

function range(number) {
    return Array.from(Array(number).keys())
}

function sumReduce(collection) {
    return collection.reduce((a,b) => a+b)
}

(value => console.log(`${resolveSudoku(value)?'не':''}корректно`))(SUDOKU)