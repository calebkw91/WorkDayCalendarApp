
$(document).ready(function()
{
    checkSavedSettings();

    //Checks for saved settings, and creates a default if none are found
    function checkSavedSettings()
    {
        if(localStorage.getItem("startTime") != null)
        {
            $("#start-time").val(localStorage.getItem("startTime"));
            $("#end-time").val(localStorage.getItem("endTime"));
            

            if(localStorage.getItem("timeFormat") === "12")
            {
                $("#12hour").attr('checked', true);
                $("#24hour").attr('checked', false);
            }
            else if(localStorage.getItem("timeFormat") === "24")
            {
                $("#12hour").attr('checked', false);
                $("#24hour").attr('checked', true);
            }
            else
            {
                $("#12hour").attr('checked', true);
                $("#24hour").attr('checked', false);
            }
        }
    }

    //On submit, saves settings to local storage and returns to main calendar page
    $("#preferences").submit(function(event)
    {
        event.preventDefault();

        let startTime = $("#start-time").val();
        let endTime = $("#end-time").val();
        let timeFormat;

        if ($("#12hour:checked").val() === "12")
        {
            timeFormat = 12;
        }
        else
        {
            timeFormat = 24;
        }

        localStorage.setItem("startTime", startTime);
        localStorage.setItem("endTime", endTime);
        localStorage.setItem("timeFormat", timeFormat);

        window.location.href = "index.html";
    })
})
