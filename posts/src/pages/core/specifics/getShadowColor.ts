const getShadowColor = (id: string) => {
  const shadowColorArray = [
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightsteelblue',
    'lightyellow',
  ]
  const alpha = Array.from(Array(26)).map((e, i) => i + 65)
  const letters = alpha.map((x) => String.fromCharCode(x))
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  return (
    shadowColorArray[
      mergedArray.indexOf(String(id[0]).toUpperCase()) % shadowColorArray.length
    ]
  )
}

export default getShadowColor
