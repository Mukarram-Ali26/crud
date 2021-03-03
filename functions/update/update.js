var faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event) => {

  try {

    const messageBody = JSON.parse(event.body);


    var client = new faunadb.Client({ secret: 'fnAEA-DCb_ACBRzWAlpNh6_hhdFv3EES8vz44vB2' });

    var result = await client.query(

      q.Update(
          q.Ref(q.Collection("todos") , messageBody.id), {
            data : {
              detail : messageBody.message,
            }
          }
        )
    )  
    
    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.data.detail }),

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

}
