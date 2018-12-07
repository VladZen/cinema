import random from '@/utils/getRandomNumber'

describe('getRandomNumber.js', () => {
  it('should return a number in range from 0 to 3', () => {
    const result = random(0,3);
    expect(typeof result).toBe('number')
    expect(result).toBeLessThanOrEqual(3)
    expect(result).toBeGreaterThanOrEqual(0)
  })
})
