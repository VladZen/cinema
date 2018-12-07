function map (array) {
  return array.reduce((result, item) => {
    if (!result[item[0]]) {
      result[item[0]] = [item[1]]
    } else {
      result[item[0]].push(item[1])
    }
    return result
  }, {})
}

export default map
