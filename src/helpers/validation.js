import assert from 'assert'

export const required = (name, v) => assert.ok(v, `${name} should not be empty`)