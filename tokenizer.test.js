import { test, expect } from 'vitest'
import { tokenizer } from 'tokenizer'

test('tokenizer', () => {
  const code = '(add 2 (subtract 4 2))'
  const tokens = [
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'add'      },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'subtract' },
    { type: 'number', value: '4'        },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: ')'        },
    { type: 'paren',  value: ')'        },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('left paren', () => {
  const code = '('
  const tokens = [{ type: 'paren',  value: '(' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('right paren', () => {
  const code = ')'
  const tokens = [{ type: 'paren',  value: ')' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('add', () => {
  const code = 'add'
  const tokens = [{ type: 'name',  value: 'add' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = '22'
  const tokens = [{ type: 'number',  value: '22' }]
  expect(tokenizer(code)).toEqual(tokens)
})

test('(add 1 2)', () => {
  const code = '(add 1 2)'
  const tokens = [
    { type: 'paren',  value: '('        },
    { type: 'name',   value: 'add'      },
    { type: 'number', value: '1'        },
    { type: 'number', value: '2'        },
    { type: 'paren',  value: ')'        },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})
