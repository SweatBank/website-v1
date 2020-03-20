var today = new Date()
var endDate = ""
var timeFrame = ""
var tempoObjectJSON = ""

function setEndDate(){
    endDate = new Date(today.setDate(today.getDate() + (timeFrame * 7)))
    today = new Date()
    return endDate
}

var tempoObject = {
    goalID:"",
    goaltype: "tempo",
    confirmed:"", // once a payment has been received for a goal, it will be confirmed
    exercise: "",
    distance:"",
    units: "",
    time: "",
    baselineTime:"",
    startDate:"",
    endDate:""
}

function writeTempoObject(){
    tempoObject.exercise = $('#exercise').val()
    tempoObject.distance = $('#distance').val()
    tempoObject.units = $('#units').val()
    tempoObject.time = $('#time').val()
    tempoObject.baselineTime = $('#baselineTime').val()
    tempoObject.startDate = new Date()
    tempoObject.endDate = setEndDate()
    tempoObjectJSON = JSON.stringify(tempoObject)
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
    if($(this).val().length>0){
        $(this).attr('size', $(this).val().length+2); // buffer can be added if need be (3 = 3 pixels)
    } else {
        $(this).attr('size', $(this).attr('placeholder').length+2);
    }
}

function startSizeInput() { $(this).attr('size', $(this).attr('placeholder').length+2) }

function changeminutes(){
    if ($('#time').val()!=1){ $('#goalMin').html('minutes') }
    else { $('#goalMin').html('minute') }
}

function changeBaselineMinutes(){
    if ($('#baselineTime').val()!=1){ $('#baselineMin').html('minutes') }
    else { $('#baselineMin').html('minute') }
}

function replaceBaseline(){
    if($('#exercise').val().length>0){ $('#baselineExercise').html($('#exercise').val()) }
    else { $('#baselineExercise').html('run') } // can change to exercise.placeholder to generalize

    if($('#distance').val().length>0){ $('#baselineDistance').html($('#distance').val()) }
    else { $('#baselineDistance').html(4) } // can change to distance.placeholder to generalize

    if($('#units').val().length>0){ $('#baselineUnits').html($('#units').val()) }
    else { $('#baselineUnits').html('mi/km') } // change to units.placeholder to generalize
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

function allowSubmit(){
    if($("#goal").css("opacity") == 1 & $("#timeframe").css("opacity") == 1 & $("#baseline").css("opacity") == 1) { $(".submit").removeClass("disallowed") }
    else { $(".submit").addClass("disallowed") }
}


// This needs to be updated for other goal types!
function fillIcons() {

    // goal icon
    if($("#exercise").val().length>0 & $("#distance").val().length>0 & $("#distance").val()>0 & $("#time").val().length>0 & $("#time").val()>0 & ($("#units").val() == "km" | $("#units").val() == "mi")){
        $("#goal").addClass("filledIcon")
    } else {
        $("#goal").removeClass("filledIcon")
    }

    //  baseline icon
    if($("#baselineTime").val().length>0 & $("#baselineTime").val()>0 & ( Number($("#baselineTime").val())>Number($("#time").val()) | $("#time").val().length == 0) ){
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
    else { $("#notes").css("opacity",.3), $("#notes").removeClass("filledIcon") }

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
    if ( $("#units").val() == "mi" | $("#units").val() == "km" ){
        $("#units").css('background-color','#8A94B9')
    } else { $("#units").css('background-color','#C6C0CA') }

    // baseline error handler
    if( Number($("#baselineTime").val()) > Number($("#time").val()) & $("#baselineTime").val().length > 0 & $("#baselineTime").val()>0 |
        ($("#baselineTime").val().length > 0 & !isNaN(Number($("#baselineTime").val())) & $("#time").val().length == 0 & $("#baselineTime").val()>0)){
        $("#baselineTime").css('background-color','#8A94B9')
    } else { $("#baselineTime").css('background-color','#C6C0CA') }

}

function sendGoalToDB(){
  $.ajax({
        url: "http://ec2-54-204-66-243.compute-1.amazonaws.com/admin/goals",
        type: "POST",
        data: tempoObjectJSON,
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
    .keyup(replaceBaseline)
    .keyup(changeBackground)
    .keyup(setEndDate)
    .keyup(writeTempoObject)
    .keyup(allowSubmit)
    .each(startSizeInput) //resize on page load

$('.submit')
    .click(sendGoalToDB)

$('textarea')
    .keyup(fillIcons)

$('#time')
    .keyup(changeminutes)

$('#baselineTime')
    .keyup(changeBaselineMinutes)


$(".timeframe")
    .click(toggleButtonColor)
    .click(selectTimeframe)
    .click(fillIcons)
    .click(setEndDate)
    .click(writeTempoObject)
    .click(allowSubmit)

// OLD CODE - removing error pop-ups in favor of using fill

// function checkError(){

//     if($("#distance").val().length>0 & isNaN($("#distance").val())){
//         $("#distanceError").css("visibility","visible");
//     } else {
//         $("#distanceError").css("visibility","hidden");
//     }

//     if($("#units").val().length>0 & $("#units").val() != "km" & $("#units").val() != "mi"){
//         $("#unitsError").css("visibility","visible");
//     }
//     else {
//         $("#unitsError").css("visibility","hidden");
//     }

//     if($("#time").val().length>0 & isNaN($("#time").val())){
//         $("#timeError").css("visibility","visible");
//     } else {
//         $("#timeError").css("visibility","hidden");
//     }

//     if($("#baselineTime").val().length>0 & isNaN($("#baselineTime").val())){
//         $("#baselineTimeError").css("visibility","visible");
//     } else {
//         $("#baselineTimeError").css("visibility","hidden");
//     }

//     // baseline faster than goal error
//     if($("#time").val().length > 0 & $("#baselineTime").val().length > 0 & Number($("#baselineTime").val()) <= Number($("#time").val())){
//         $("#baselineFasterThanGoalError").css("visibility","visible");
//     } else {
//         $("#baselineFasterThanGoalError").css("visibility","hidden");
//     }
// }
