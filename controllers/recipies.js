function getRecipies() {
  event.preventDefault();
  const query = $(`.recipieTag`).val();
  $('.recipieDiv').empty();

  $.ajax({

    url: `http://www.recipepuppy.com/api/?i=onions,garlic&q=${query}&p=3`
  })

  .done((response) => { // response = the entire response from the api (including, data meta and pagination)
    // we only want the data, so we have to do .data
    // response.data = the array of gif (objects)
    $.each(response, (index, title) => {
      console.log('hi there');
      // for each gif object in the array, we do this:
      $('.recipieDiv').append(`
        <p>${title}</p>
      `);
    });

  });
}

module.exports = {
  getRecipies
};