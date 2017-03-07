'use strict';
/* global google:true */
$(() => {
  console.log('hi, JS working');
  $('.generate').on('click', getrecipes);

});

// /* global google:ignore mapStyles:ignore */

function getrecipes() {
  event.preventDefault();
  console.log('getrecipesworking');
  const query = $(`.recipeTag`).text();
  $('.recipeDiv').empty();
  console.log(query);

  $.ajax({
    url: `http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3`
  })
  .done((response) => { // response = the entire response from the api (including, data meta and pagination)
    console.log(response);
    // we only want the data, so we have to do .data
    // response.data = the array of gif (objects)
    $.each(response.results, (index, title) => {
      console.log('3rd response');
      // for each gif object in the array, we do this:
      $('.recipeDiv').append(`${title}`);
    });

  })
  .fail((err) => {
    console.log(err);
  })
  .always((err) => {
    console.log(err);
  });
}

// http://www.recipepuppy.com/api/?i=choclate&q=${query}&p=3
