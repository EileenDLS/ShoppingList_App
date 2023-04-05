// this time I try to learn use JQuery
$(document).ready(() => {
  // localStorage.clear();
  let taskList = JSON.parse(localStorage.getItem("records"));

  // set the default value of date is today (Boston time)
  const nyTimeString = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const todayDate = new Date(nyTimeString).toISOString().split("T")[0];
  $("#input_date").val(todayDate);
  const dayOfWeek = new Date(nyTimeString).toLocaleString("en-US", {
    weekday: "long",
  });
  $("#dayOfWeek").text(dayOfWeek);

  // if loalStorage is null, load data from data.json
  loadData($("#input_date").val());
  function loadData(date) {
    if (taskList !== null && date in taskList) { // localStorage has corresponding data, show it 
      console.log("localStorage isn't null");
      taskList[date].forEach((task) => {
        createTrEle(task.description, task.status);
      });
    } else if (taskList === null) { // localStorage is null
      console.log("localStorage is null, load data.json");
      taskList = {};
      new Promise((resolve, reject) => {  // load data from data.json
        fetch("data.json")
          .then((response) => resolve(response.json()))
          .catch((error) => reject(error));
      })
        .then((data) => {
          $.each(data, (i, item) => {   // get date 
            let date = new Date(item.date);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const goalDate = `${year}-${month}-${day}`;
            let curData = {};
            $.each(item.list, (_, task) => {    // get description and status
              curData = {
                description: task.description,
                status: task.status,
              };
              if (!taskList[goalDate]) {    // store info into taskList
                taskList[goalDate] = [curData];
              } else {
                taskList[goalDate].push(curData);
              }
            });
          });
          console.log("taskList is:", taskList);
        })
        .catch((error) => {
          console.log("Error: ", error);
          let alert = document.getElementById("error_alert");
          alert.style.display = "";
        });
    } else { // localStroage isn't null, but no corresponding data
      console.log("localStroage isn't null && no tasks in this day!");
    }
  }

  // create <tr> element insert into table
  function createTrEle(textContent, status) {
    let input = $("<div>").text(textContent).css({
      display: "inline",
      "font-family": "fantasy",
    });
    const checkMarker = $("<input>")
      .attr({
        type: "checkbox",
      })
      .change((event) => {
        saveToLocalStorage(input.text(), event.target);
      });
    let item = $("<tr>");
    item.append($("<td>").append(checkMarker).append(input));
    $("#table").append(item);
    // check status, to display correctly
    if (status === "Done") {
      checkMarker.prop("checked", true);
      checkStatus(checkMarker.get(0));
    }
  }

  // save data to localStorage
  function saveToLocalStorage(input, checkBox) {
    const curDate = $("#input_date").val();
    let curData = {
      description: input,
      status: checkStatus(checkBox),
    };
    if (taskList != null && curDate in taskList) {
      let flag = true;
      // find this description whether exist (for checkbox status change)
      taskList[curDate].forEach((task) => {
        if (task.description === curData.description) {
          task.status = curData.status;
          flag = false;
          return;
        }
      });
      if (flag) {
        // this record not exist, push into list
        taskList[curDate].push(curData);
      }
    } else {
      // this day no record, add records
      taskList[curDate] = [curData];
    }
    // tranfer to json format and save to localStorage
    const recordsJSON = JSON.stringify(taskList);
    console.log("localStorage", recordsJSON);
    localStorage.setItem("records", recordsJSON);
  }

  // check the status of checkbox
  function checkStatus(checkBox) {
    const td = $(checkBox).closest("td");
    const textArea = td.find("div");
    if ($(checkBox).is(":checked")) {   // checked, line-trough the text area
      textArea.css("text-decoration", "line-through");
      return "Done";
    } else {    // unchecked, clear line-through
      textArea.css("text-decoration", "");
      return "Not Done";
    }
  }

  // bind with "add task"
  $("#add").click(() => {
    $("#input_container").css("display", "");
    $("#add").css("display", "none");
  });

  // bind with save button
  $("#saveBtn").click(() => {
    createTrEle($("#input_text").val());
    saveToLocalStorage($("#input_text").val());
    // clear and hide input text area and display "add task"
    $("#input_text").val("");
    $("#input_container").css("display", "none");
    $("#add").css("display", "");
  });

  // change date and show corresponding taskList
  $("#input_date").change((event) => {
    $("#input_container").css("display", "none");
    $("#add").css("display", "");
    $("table tr:gt(0)").remove();
    loadData($(event.target).val());
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const dayOfWeek = daysOfWeek[new Date($(event.target).val()).getDay()];
    $("#dayOfWeek").text(dayOfWeek);
  });
});
