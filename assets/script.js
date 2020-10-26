$(document).ready(function()
{
    let now = moment().format("dddd, MMMM Do YYYY, h:mm a");
    let currentHour = parseInt(moment().format("h"));

    setCurrentDay();
    setPastPresent();
    getSavedEvents();

    function setCurrentDay()
    {
    $("#currentDay").text(now);
    }

    function setPastPresent()
    {
    $("div").each(function()
    { 
        if (parseInt($(this).attr("value")) === currentHour)
        {
        $(this).children(".description").addClass("present");
        $(this).children(".description").removeClass("past");
        $(this).children(".description").removeClass("future");
        }
        else if (parseInt($(this).attr("value")) > currentHour)
        {
        $(this).children(".description").addClass("future");
        $(this).children(".description").removeClass("past");
        $(this).children(".description").removeClass("present");
        }
        else if (parseInt($(this).attr("value")) < currentHour)
        {
        $(this).children(".description").addClass("past");
        $(this).children(".description").removeClass("present");
        $(this).children(".description").removeClass("future");
        }
    })
    }

    function getSavedEvents()
    {
    $("textarea").each(function()
    {
        let hour = $(this).parent().attr("value");

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

    $(".saveBtn").on("click", function()
    {
    let hour = $(this).parent().attr("value");

    let description = $(this).prev().val();

    localStorage.setItem(hour, description);
    })
})