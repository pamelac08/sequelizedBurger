$(document).ready(function () {
  $("#createburger").on("submit", function (event) {
    event.preventDefault();

    // capturing input data from form to create new burger
    var newBurger = {
      burger: $("#createburger [name=burger]").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delBurger").on("click", function (event) {
    event.preventDefault();

    // capturing the id of the button selected that is tied to the id of the burger_name in the database
    var id = $(this).data("burgerid");

    var customer = {
      customer: $("#new-customer [name=customer]").val().trim(),
    };
    // console.log("customer: ", customer);

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: customer,
    }).then(function () {
      console.log("updated id ", id);
      // Reload the page to get the updated list
      location.reload();
    });

    // $.ajax("/api/burgers/" + id, {
    //   type: "POST",
    //   data: customer,
    // }).then(function () {
    //   console.log("created new burger");
    //   // Reload the page to get the updated list
    //   location.reload();
    // });


    
  });
});
