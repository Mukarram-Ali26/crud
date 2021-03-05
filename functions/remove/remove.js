var faunadb = require('faunadb'),
  q = faunadb.query;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  try {


    const messageBody = JSON.parse(event.body);

    var client = new faunadb.Client({ secret: 'fnAEA-DCb_ACBRzWAlpNh6_hhdFv3EES8vz44vB2' });


    const result = await client.query(
      q.Delete(
        q.Ref(q.Collection('crud'), messageBody.id)
      )
    )

    
    return {
      statusCode: 200,
      body: JSON.stringify({ detail: result.ref.id }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}