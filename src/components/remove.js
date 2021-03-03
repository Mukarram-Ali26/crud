export const delPost = (id) => {
  if (id) {
  console.log(id)
  fetch(`.netlify/functions/remove`, {
    method: "DELETE",
    body: JSON.stringify({id: id})
    })
      .then(response => response.json())
      .then(data => {
      console.log("Data: " + JSON.stringify(data))
    })
}}