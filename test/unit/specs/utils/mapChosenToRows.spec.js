import map from '@/utils/mapChosenToRows'

describe('mapChosenToRows.js', () => {
  it('should map an array of arrays to an object', () => {
    const array = [
      [2, 3],
      [2, 2],
      [4, 8],
      [10, 5],
      [1, 3],
      [6, 6],
      [5, 8],
      [9, 8],
      [8, 5],
      [10, 1]
    ]
    const result = map(array);
    expect(result).toEqual({
      "1": [3],
      "2": [3, 2],
      "4": [8],
      "5": [8],
      "6": [6],
      "8": [5],
      "9": [8],
      "10": [5, 1]
    })
  })
})
