export function tokenizer(code) {
  const tokens = []
  let current = 0

  while (current < code.length) {
    let char = code[current]

    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    if (['(', ')'].includes(char)) {
      tokens.push({
        type: 'paren',
        value: char
      })
      current++
      continue
    }
  
    const LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''
      while (LETTERS.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }
      tokens.push({ type: 'name', value })
    }
  
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char) && current < code.length) {
        value += char
        char = code[++current]
      }
      tokens.push({ type: 'number', value })
    }
  }
  
  return tokens
}
