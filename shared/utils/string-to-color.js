class StringToColor {
  constructor () {
    this.cache = {}
    this.minChannelValue = 0
    this.maxChannelValue = 255
  }

  _getChannelValue (number) {
    return (
      this.minChannelValue +
      (number % (this.maxChannelValue - this.minChannelValue))
    )
  }

  _formatColorString (red, green, blue) {
    const r = this._getChannelValue(red)
    const g = this._getChannelValue(green)
    const b = this._getChannelValue(blue)
    return '#' +
        (r < 16 ? '0' : '') + r.toString(16) +
        (g < 16 ? '0' : '') + g.toString(16) +
        (b < 16 ? '0' : '') + b.toString(16)
  }

  getColor (string) {
    if (this.cache[string]) {
      return this.cache[string]
    }

    let r = 0
    let g = 0
    let b = 0

    for (let i = 0; i < string.length; i++) {
      const code = string.charCodeAt(i)

      if ((code % 3) === 0) {
        r += code
      } else if ((code % 3) === 1) {
        g += code
      } else {
        b += code
      }
    }

    const result = this._formatColorString(r,g,b)
    this.cache[string] = result
    return result
  }

}

module.exports.stringToColor = new StringToColor()
