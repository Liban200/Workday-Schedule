$(function () {
  let saveBtn = $(".saveBtn");
  let stamp9am = $("#9AM");
  let stamp10am = $("#10AM");
  let stamp11am = $("#11AM");
  let stamp12pm = $("#12PM");
  let stamp1pm = $("#1PM");
  let stamp2pm = $("#2PM");
  let stamp3pm = $("#3PM");
  let stamp4pm = $("#4PM");
  let stamp5pm = $("#5PM");

  let stampELArray = [
    stamp9am,
    stamp10am,
    stamp11am,
    stamp12pm,
    stamp1pm,
    stamp2pm,
    stamp3pm,
    stamp4pm,
    stamp5pm,
  ];

  function handleFormSubmit(event) {
    event.preventDefault();

    let btnClicked = $(event.currentTarget);

    let targetText = btnClicked.siblings("textarea");

    let targetTimeBlock = targetText.data("time");

    localStorage.setItem("time block " + targetTimeBlock, targetText.val());
  }

  saveBtn.on("click", handleFormSubmit);

  function updateTime() {
    let today = dayjs();

    
    $("#currentDay").text(today.format("dddd, MMMM DD YYYY, h:mm.ss"));

    let now = dayjs().hour();
    console.log (typeof now)
    for (let i = 0; i < stampELArray.length; i++) {
      stampELArray[i].removeClass("future past present");

      if (now > stampELArray[i].data("time")) {
        stampELArray[i].addClass("past");
      } else if (now == stampELArray[i].attr("data-time")) {
        stampELArray[i].addClass("present");
      } else {
        stampELArray[i].addClass("future");
      }
    }
  }

  renderLastRegistered();
  updateTime();
  setInterval(updateTime, 100);

  
  function renderLastRegistered() {
    for (let el of stampELArray) {
      el.val(localStorage.getItem("time block " + el.data("time")));
    }
  }
});
