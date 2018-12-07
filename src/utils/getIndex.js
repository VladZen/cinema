function getIndex (seats, [row, seat]) {
  return seats.findIndex((item) => item[0] === row && item[1] === seat)
}

export default getIndex
