let oldData = [];

const render = () => {
  $(".to-do").empty();
  oldData.forEach((item) => {
    $(".to-do").append($("<li>").addClass("to-do-item").text(item));
  });
  $(".to-do-item").each(function () {
    $(this).append("<br><button class='complete'>Completed</button>");
  });
};

$(() => {
  $("#submit").on("click", (event) => {
    const newItem = $("#input-box").val();
    if (localStorage.getItem("to-do-list") == null) {
      localStorage.setItem("to-do-list", JSON.stringify([]));
    }

    oldData = JSON.parse(localStorage.getItem("to-do-list"));
    if (newItem != "") {
      oldData.push(newItem);
    }

    localStorage.setItem("to-do-list", JSON.stringify(oldData));
    $("form").trigger("reset");

    //appending oldData to to do list
    // oldData.forEach((item) => {
    //   $(".to-do").append($("<li>").addClass("to-do-item").text(item));
    // });
    // $(".to-do-item").each(function () {
    //   $(this).append("<br><button class='complete'>Completed</button>");
    // });
    render();
  });
});
