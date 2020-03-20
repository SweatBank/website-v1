
var today = new Date()
var endDate = ""
var timeFrame = ""
var commitmentObjectJSON = ""

function setEndDate(){
    endDate = new Date(today.setDate(today.getDate() + (timeFrame * 7)))
    today = new Date()
    return endDate
}

// var goal = {
//     goalID:"",
//     goalType: commitment{activity:"", numTimes:""},
// }

var commitmentObject = {
    goalID:"",
    activity: "",
    numTimes: "",
    startDate:"",
    endDate:""
}

function writeCommitmentObject(){
    commitmentObject.activity = $('#activity').val()
    commitmentObject.numTimes = $('#reps').val()
    commitmentObject.startDate = new Date()
    commitmentObject.endDate = setEndDate()
    commitmentObjectJSON = JSON.stringify(commitmentObject)
}

function selectTimeframe(){
    if($("#oneWeek").hasClass("selected")){
        $("#incentiveAmount").html(5)
        timeFrame = 1
    } else if ($("#twoWeeks").hasClass("selected")){
        $("#incentiveAmount").html(10)
        timeFrame = 2
    } else if ($("#threeWeeks").hasClass("selected")){
        $("#incentiveAmount").html(15)
        timeFrame = 3
    } else if ($("#fourWeeks").hasClass("selected")){
        $("#incentiveAmount").html(20)
        timeFrame = 4
    } else {
        $("#incentiveAmount").html("")
        timeFrame = 0
    }
}

function resizeInput() {
    if($(this).val().length>0){ $(this).attr('size', $(this).val().length+2) }
    else { $(this).attr('size', $(this).attr('placeholder').length+2) }
}

function startSizeInput() { $(this).attr('size', $(this).attr('placeholder').length+2) }

function changeTimes(){ // changes the placeholder word from "times" to "time" if the number of reps is 1
    if ($('#reps').val()!=1){
        $('#goalTimes').html('times')
        $('#baselineTimes').html('times')

    } else {
        $('#goalTimes').html('time')
        $('#baselineTimes').html('time')
    }
}

function toggleButtonColor(){
    if ($(this).hasClass("selected")){

        $(this).css("background-color","#C6C0CA"), $(this).css("border-color","#C6C0CA"), $(this).css("color","grey")
        $(this).removeClass("selected")
    } else {
        $(this).css("background-color","#8A94B9"), $(this).css("border-color","#8A94B9"), $(this).css("color","black")
        $(this).addClass("selected")

        $(".timeframe").not(this).css("background-color","#C6C0CA"), $(".timeframe").not(this).css("border-color","#C6C0CA"), $(".timeframe").not(this).css("color","grey")
        $(".timeframe").not(this).removeClass("selected")

        // mouseover function
        $(".timeframe").mouseover(function(){
        $(this).css("color","black")
        });

        $(".timeframe").mouseout(function(){
            if (!$(this).hasClass("selected")){
                $(this).css("color","grey")
            }
        });
    }
}

function fillIcons() {

    // goal icon - unique to goal type
    if($("#activity").val().length>0 & $("#reps").val().length>0 & !isNaN($("#reps").val()) & $("#reps").val()>0 ){
        $("#goal").addClass("filledIcon")
    } else {
        $("#goal").removeClass("filledIcon")
    }

    // timeframe & incentive icons - COMMON ACROSS GOAL TYPES
    if($(".timeframe").hasClass("selected")){
        $("#timeframe").addClass("filledIcon")
        $("#incentive").addClass("filledIcon")
    } else {
        $("#timeframe").removeClass("filledIcon")
        $("#incentive").removeClass("filledIcon")
    }

    // notes icon - COMMON ACROSS GOAL TYPES
    if ( $("#noteArea").val().length>0 ) { $("#notes").addClass("filledIcon") }
    else { $("#notes").removeClass("filledIcon") }
}

function changeBackground(){
    if($(this).val().length>0){
        if($(this).hasClass("numberInput")){
            if(!isNaN(Number($(this).val())) & $(this).val()>0){
                $(this).css('background-color','#8A94B9')
            } else { $(this).css('background-color','#C6C0CA') }
        } else { $(this).css('background-color','#8A94B9') }
    } else { $(this).css('background-color','#C6C0CA') }
}

function allowSubmit(){ // unique to goal type
    if($("#goal").css("opacity") == 1 & $("#timeframe").css("opacity") == 1) { $(".submit").removeClass("disallowed") }
    else { $(".submit").addClass("disallowed") }
}

function sendGoalToDB(){
  $.ajax({
        url: "http://ec2-54-204-66-243.compute-1.amazonaws.com/admin/goals",
        type: "POST",
        data: commitmentObjectJSON,
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(){},
        error: function(){}
    });
}

// Event Handlers

$('input[type="text"]')
    // event handler
    .keyup(resizeInput)
    .keyup(fillIcons)
    // .keyup(checkError)
    .keyup(changeBackground)
    .keyup(writeCommitmentObject)
    .keyup(allowSubmit)
    .each(startSizeInput) // resize on page load

$('.submit')
    .click(sendGoalToDB)

$('textarea')
    .keyup(fillIcons)

$('#reps')
    .keyup(changeTimes)

$(".timeframe")
    .click(toggleButtonColor)
    .click(selectTimeframe)
    .click(fillIcons)
    .click(writeCommitmentObject)
    .click(allowSubmit)


// OLD CODE - removing error pop-ups in favor of using fill

// function checkError(){
//     if($("#reps").val().length>0 & isNaN($("#reps").val())){ $("#repsError").css("visibility","visible") }
//     else { $("#repsError").css("visibility","hidden") }
// }
