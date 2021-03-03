var faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async () => {

  try {

    var client = new faunadb.Client({ secret: 'fnAEA-DCb_ACBRzWAlpNh6_hhdFv3EES8vz44vB2' });

    var result = await client.query(

      q.Map(
        q.Paginate(q.Documents(q.Collection("todos"))),
         q.Lambda(x => q.Get(x))
         )
    )

    
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}
