export const updatePost = (values) => {
  fetch(`/.netlify/functions/update`, {
    method: 'POST',
    body: JSON.stringify(values)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Data: " + JSON.stringify(data));
    });
}

