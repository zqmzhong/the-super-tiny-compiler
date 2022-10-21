import { test, expect } from "vitest";
import { parser } from "./parser";

test("parser", () => {
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "paren", value: "(" },
    { type: "name", value: "subtract" },
    { type: "number", value: "4" },
    { type: "number", value: "2" },
    { type: "paren", value: ")" },
    { type: "paren", value: ")" },
  ];
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          {
            type: "NumberLiteral",
            value: "2",
          },
          {
            type: "CallExpression",
            name: "subtract",
            params: [
              {
                type: "NumberLiteral",
                value: "4",
              },
              {
                type: "NumberLiteral",
                value: "2",
              },
            ],
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test("number", () => {
  const tokens = [{ type: "number", value: "2" }];
  const ast = {
    type: "Program",
    body: [
      {
        type: "NumberLiteral",
        value: "2",
      },
    ],
  };
  expect(parser(tokens)).toEqual(ast);
});


test("CallExpression 1", () => {
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "number", value: "4" },
    { type: "paren", value: ")" },
  ];
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          {
            type: "NumberLiteral",
            value: "2",
          },
          {
            type: "NumberLiteral",
            value: "4",
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});

test("CallExpression 2", () => {
  const tokens = [
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "2" },
    { type: "number", value: "4" },
    { type: "paren", value: ")" },
    { type: "paren", value: "(" },
    { type: "name", value: "add" },
    { type: "number", value: "3" },
    { type: "number", value: "5" },
    { type: "paren", value: ")" },
  ];
  const ast = {
    type: "Program",
    body: [
      {
        type: "CallExpression",
        name: "add",
        params: [
          {
            type: "NumberLiteral",
            value: "2",
          },
          {
            type: "NumberLiteral",
            value: "4",
          },
        ],
      },
      {
        type: "CallExpression",
        name: "add",
        params: [
          {
            type: "NumberLiteral",
            value: "3",
          },
          {
            type: "NumberLiteral",
            value: "5",
          },
        ],
      },
    ],
  };

  expect(parser(tokens)).toEqual(ast);
});
