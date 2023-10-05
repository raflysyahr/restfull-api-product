const { test } = require('@japa/runner')

test('display welcome page', async ({ client }) => {
  const response = await client.get('/api/v1/users')

  response.assertStatus(200)
  response.assertBodyContains({ hello: 'world' })

})




