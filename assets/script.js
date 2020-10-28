
$(document).ready(function()
{
    let now;
    let currentHour = parseInt(moment().format("H"));
    let timeBlock = $("#time-blocks");
    let startTime;
    let endTime;
    let hourCheck;
    let minuteInterval;
    let timeFormat;

    checkSavedSettings();
    setTimeFirst();
    generateTimeBlocks();

    function setTimeFirst()
    {
        if(timeFormat === "12")
            {
                now = moment().format("dddd, MMMM Do YYYY, h:mm a");
            }
            else
            {
                now = moment().format("dddd, MMMM Do YYYY, H:mm");
            }
    }

    function checkSavedSettings()
    {
        if(localStorage.getItem("startTime") != null)
        {
            startTime = parseInt(localStorage.getItem("startTime"));
            endTime = parseInt(localStorage.getItem("endTime"));
            timeFormat = localStorage.getItem("timeFormat");
        }
        else
        {
            startTime = 7;
            endTime = 17;
            timeFormat = "12";
        }
    }

    function generateTimeBlocks()
    {
        timeBlock.empty();

        console.log(startTime);
        console.log(endTime);

        for (let i=startTime; i<=endTime; i++)
        {
            let row = $("<div>").addClass("row").attr("data-time", i);
            let timeEl = $("<div>").addClass("col-1 hour")
            let descriptionEl = $("<textarea>").addClass("col-10 description");
            let saveBtnEl = $("<button>").addClass("col-1 saveBtn").text("Save");

            if(timeFormat === "12")
            {
                timeEl.text(moment({hour:i}).format("h a"));
            }
            else
            {
                timeEl.text(moment({hour:i}).format("H:mm"));
            }

            row.append(timeEl, descriptionEl, saveBtnEl);
            timeBlock.append(row);
        }
        updateCurrentTime();
        setPastPresent();
        getSavedEvents();
    }

    //Scans for time every second, and updates UI
    function updateCurrentTime()
    {
        $("#currentDay").text(now);

        minuteInterval = setInterval(function() 
        {
            if(timeFormat === "12")
            {
                now = moment().format("dddd, MMMM Do YYYY, h:mm a");
            }
            else
            {
                now = moment().format("dddd, MMMM Do YYYY, H:mm");
            }
            currentHour = parseInt(moment().format("H"));
            $("#currentDay").text(now);
            updatePastPresent();
        }, 1000);

    }
    
    //Sets css class of past, present, future based on the current time
    function setPastPresent()
    {
        $("div").each(function()
        { 
            if (parseInt($(this).attr("data-time")) === currentHour)
            {
                $(this).children(".description").addClass("present");
                $(this).children(".description").removeClass("past");
                $(this).children(".description").removeClass("future");
            }
            else if (parseInt($(this).attr("data-time")) > currentHour)
            {
                $(this).children(".description").addClass("future");
                $(this).children(".description").removeClass("past");
                $(this).children(".description").removeClass("present");
            }
            else if (parseInt($(this).attr("data-time")) < currentHour)
            {
                $(this).children(".description").addClass("past");
                $(this).children(".description").removeClass("present");
                $(this).children(".description").removeClass("future");
            }
        })
    }

    //Runs function to update past, present, and future every time the hour changes
    function updatePastPresent()
    {
        if (hourCheck != currentHour)
        {
            setPastPresent();
            hourCheck = currentHour;
        }
    }

    //Checks for saved events in local storage and updates description fields
    function getSavedEvents()
    {
        $("textarea").each(function()
        {
            let hour = $(this).parent().attr("data-time");

            if (localStorage.getItem(hour) === null)
            {
                return;
            }
            else
            {
                $(this).val(localStorage.getItem(hour));
            }
        })
    }

    //Saves description field text to local storage on button press
    $(".saveBtn").on("click", function()
    {
        let hour = $(this).parent().attr("data-time");

        let description = $(this).prev().val();

        localStorage.setItem(hour, description);
    })

})