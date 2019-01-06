/* eslint-env jest */

var dot = require("dot-event")(),
  store = require("./store")

beforeEach(function() {
  dot.reset()
  store(dot)
})

test("get/set", function() {
  return dot("set.a.b.c", true).then(function() {
    expect(dot("get.a.b.c")).toBe(true)
  })
})

test("queue", function() {
  return dot("set.a.b.c", "hello")
    .then(function() {
      return dot("set.a.b.c", function() {
        return dot("get.a.b.c") + " world"
      })
    })
    .then(function() {
      expect(dot("get.a.b.c")).toBe("hello world")
    })
})