import getIndex from '@/utils/getIndex'

describe('getIndex.js', () => {
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

  const f = getIndex.bind(this, array)

  it('should return 3', () => {
    expect(f([10,5])).toBe(3)
  })

  it('should return 0', () => {
    expect(f([2,3])).toBe(0)
  })

  it('should return -1', () => {
    expect(f([11,1])).toBe(-1)
  })
})
