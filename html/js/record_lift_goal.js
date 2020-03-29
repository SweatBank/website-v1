

// Unsuccessful attempts to pull common functions out of each goaltype's js file

// $.getScript("common_goal_functions");
// import { selectTimeframe } from './common_goal_functions.mjs'

function setEndDate(){
    endDate = new Date(today.setDate(today.getDate() + (timeFrame * 7)))
    today = new Date()
    return endDate
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
    if( $(this).val().length>=1 ) { $(this).attr('size', $(this).val().length+2) }
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

function changeBackground(){

    // number input handler
    if($(this).val().length>0){
        if($(this).hasClass("numberInput")){
            if(!isNaN(Number($(this).val())) & $(this).val()>0){
                $(this).css('background-color','#8A94B9')
            } else { $(this).css('background-color','#C6C0CA') }
        } else { $(this).css('background-color','#8A94B9') }
    } else { $(this).css('background-color','#C6C0CA') }

    // units error handler
    if ( $("#units").val() == "lbs" | $("#units").val() == "kg" ){
        $("#units").css('background-color','#8A94B9')
    } else { $("#units").css('background-color','#C6C0CA') }

    // baseline error handler
    if( Number($("#baselineWeight").val()) < Number($("#weight").val()) & $("#baselineWeight").val().length > 0 & $("#baselineWeight").val()>0 |
        ($("#baselineWeight").val().length > 0 & !isNaN(Number($("#baselineWeight").val())) & $("#weight").val().length == 0 & $("#baselineWeight").val()>0)){
        $("#baselineWeight").css('background-color','#8A94B9')
    } else { $("#baselineWeight").css('background-color','#C6C0CA') }
}

function replaceBaseline(){ // replaces baseline placeholder text based on goal text
    if($('#exercise').val().length>=1){ $('#baselineExercise').html($('#exercise').val()) }
    else { $('#baselineExercise').html('squat') }

    if($('#units').val().length>=1){$('#baselineUnits').html($('#units').val())}
    else {$('#baselineUnits').html('lbs/kg')}

    if($('#reps').val().length>=1){$('#baselineLiftReps').html($('#reps').val())}
    else {$('#baselineLiftReps').html('8')}
}

function fillIcons() {

    // goal icon
    if($("#exercise").val().length>0 & $("#weight").val().length>0 & $("#weight").val()>0 & $("#reps").val().length>0 & $("#reps").val()>0 & ($("#units").val() == "kg" | $("#units").val() == "lbs")){
        $("#goal").addClass("filledIcon")
    } else {
        $("#goal").removeClass("filledIcon")
    }

    // baseline icon
    if($("#baselineWeight").val().length>0 & $("#baselineWeight").val()>0 & ( Number($("#baselineWeight").val())<Number($("#weight").val()) | $("#weight").val().length == 0 )){
        $("#baseline").addClass("filledIcon")
    } else {
        $("#baseline").removeClass("filledIcon")
    }

    // timeframe & incentive icons
    if($(".timeframe").hasClass("selected")){
        $("#timeframe").addClass("filledIcon")
        $("#incentive").addClass("filledIcon")
    } else {
        $("#timeframe").removeClass("filledIcon")
        $("#incentive").removeClass("filledIcon")
    }

    // notes icon
    if ( $("#noteArea").val().length>0 ) { $("#notes").addClass("filledIcon") }
    else { $("#notes").removeClass("filledIcon") }
}

function allowSubmit(){
    if($("#goal").css("opacity") == 1 & $("#timeframe").css("opacity") == 1 & $("#baseline").css("opacity") == 1) { $(".submit").removeClass("disallowed") }
    else { $(".submit").addClass("disallowed") }
}

var today = new Date()
var endDate = ""
var timeFrame = ""
var liftObjectJSON = ""

// what other properties should be stored in the lift object? this milestone date?

var goal = {
    goalID: "",
    completeGoalString:"",
    goalType: weightlifting,
    status: goalStatus
}

var goalStatus = {
    startDate:"",
    endDate:"",
    daysLeft:"",
    goalComplete:"",
}

var weightlifting = {
    lift:"",
    goalWeight:"",
    reps:"",
    units:"",
    baselineWeight:"",
    thisMilestoneWeight:""
}

var liftObject = {
    userID:"", // do we want this associated with each goal object?
    goalID:"",
    completeGoalString:"",
    goalType: "weightlifting",
    goalStatus: "", // options: in-progress, achieved, expired
    dateAchieved:"", // not needed for any basic functionality, but could be useful for backwards-looking dashboard
    depositPaid:"", // payment-related, think about this down the road
    lift: "", //
    reps: "",
    units:"",
    goalWeight:"",
    baselineWeight:"",
    thisMilestoneWeight:"",
    startDate:"",
    endDate:""
}

function writeLiftObject(){
    liftObject.lift = $('#exercise').val()
    liftObject.goalWeight = $('#weight').val()
    liftObject.reps = $('#reps').val()
    liftObject.units = $('#units').val()
    liftObject.baselineWeight = $('#baselineWeight').val()
    liftObject.startDate = new Date()
    liftObject.endDate = setEndDate()
    liftObjectJSON = JSON.stringify(liftObject)
}

function sendGoalToJSONServer(){
  $.ajax({
        url: "http://localhost:3000/liftGoals",
        type: "POST",
        data: liftObjectJSON,
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(){},
        error: function(){}
    });
}


// resize fiddle: http://jsfiddle.net/FSsG8/444/

// Event Handlers

$('input[type="text"]')
    .keyup(resizeInput)
    .keyup(fillIcons)
    // .keyup(checkError)
    .keyup(replaceBaseline)
    .keyup(changeBackground)
    .keyup(writeLiftObject)
    .keyup(allowSubmit)
    .each(startSizeInput) //resize on page load


$('.submit')
    .click(sendGoalToJSONServer)

$('textarea')
    .keyup(fillIcons)

$('#reps')
    .keyup(changeTimes)

$(".timeframe")
    .click(toggleButtonColor)
    .click(selectTimeframe)
    .click(fillIcons)
    .click(writeLiftObject)
    .click(allowSubmit)
