import { createSchema, createYoga } from 'graphql-yoga'
 
const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello Deno!'
      }
    }
  })
})
 
Deno.serve(yoga, {
  onListen({ hostname, port }) {
    console.log(`Listening on http://${hostname}:${port}/${yoga.graphqlEndpoint}`)
  }
})
