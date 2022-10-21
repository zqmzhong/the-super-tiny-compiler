function createRootNode() {
  return {
    type: 'Program',
    body: [],
  }
}

function createNumberNode(value) {
  return {
    type: 'NumberLiteral',
    value
  }
}

function createCallExpressionNode(value) {
  return {
    type: 'CallExpression',
    name: value,
    params: [],
  }
}

export function parser(tokens) {
  let current = 0
  const rootNode = createRootNode()

  function walk() {
    const { type, value } = tokens[current]
    if (type === 'number') {
      current++
      return createNumberNode(value)
    }
    if (type === 'paren' && value === '(') {
      let token = tokens[++current]
      const node = createCallExpressionNode(token.value)

      token = tokens[++current]
      while (!(token.type === 'paren' && token.value === ')')) {
        node.params.push(walk())
        token = tokens[current]
      }
      current++
      return node
    }
    throw new Error('Unexpected Tokens')
  }

  while (current < tokens.length) {
    rootNode.body.push(walk())
  }

  return rootNode;
}
