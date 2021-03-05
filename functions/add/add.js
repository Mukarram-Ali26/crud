var faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {

  try {

    const messageBody = JSON.parse(event.body);
    console.log(messageBody)

    var client = new faunadb.Client({ secret: 'fnAEA-DCb_ACBRzWAlpNh6_hhdFv3EES8vz44vB2' });


    const result = await client.query(
      q.Create(
        q.Collection('crud'),
        { data: { detail: messageBody.message  } },
      )
    )
    
    return {
      statusCode: 200,
      body: JSON.stringify({ detail: result.ref.id}),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}