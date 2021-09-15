const list = [];

const render = () => {
  $(".to-do").empty();
  list.forEach((item) => {
    $(".to-do").append($("<li>").addClass("to-do-item").text(item));
  });
  $(".to-do-item").each(function () {
    $(this).append("<br><button class='complete'>Completed</button>");
  });
};

$(() => {
  $("#submit").on("click", (event) => {
    const input = $("#input-box").val();
    list.push(input);
    render();
    $(".complete").on("click", (event) => {
      const toDoItem = $(event.currentTarget).parent();
      $(".done").append(toDoItem);
      toDoItem.toggleClass("to-do-item done-item");
      $(event.currentTarget).text("Remove").toggleClass("complete remove");

      $(".remove").on("click", (event) => {
        const completedItem = $(event.currentTarget).parent();
        completedItem.remove();
      });
    });
  });
});
