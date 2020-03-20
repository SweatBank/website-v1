var today = new Date()
var endDate = ""
var timeFrame = ""
var bodyweightObjectJSON = ""

function setEndDate(){
    endDate = new Date(today.setDate(today.getDate() + (timeFrame * 7)))
    today = new Date()
    return endDate
}

var bodyweightObject = {
    goalID:"",
    exercise: "",
    reps: "",
    baselineReps:"",
    startDate:"",
    endDate:""
}

function writeBodyweightObject(){
    bodyweightObject.exercise = $('#exercise').val()
    bodyweightObject.reps = $('#reps').val()
    bodyweightObject.baselineReps = $('#baselineReps').val()
    bodyweightObject.startDate = new Date()
    bodyweightObject.endDate = setEndDate()
    bodyweightObjectJSON = JSON.stringify(bodyweightObject)
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
    if($(this).val().length>=1){
        $(this).attr('size', $(this).val().length+2); // buffer can be added if need be (3 = 3 pixels)
    } else {
        $(this).attr('size', $(this).attr('placeholder').length+2);
    }
}

function startSizeInput() { $(this).attr('size', $(this).attr('placeholder').length+2); }

function replaceBaseline(){
    if($('#exercise').val().length>=1){
        $('#baselineExercise').html($('#exercise').val())
    } else {
        $('#baselineExercise').html('pull ups')
    }

    if($('#reps').val().length>=1){
        $('#baselineReps').html($('#reps').val())
    } else {
        $('#baselineReps').html('8')
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

function allowSubmit(){
    if($("#goal").css("opacity") == 1 & $("#timeframe").css("opacity") == 1 & $("#baseline").css("opacity") == 1) { $(".submit").removeClass("disallowed") }
    else { $(".submit").addClass("disallowed") }
}

function fillIcons() {
    if($("#exercise").val().length>0 & $("#reps").val().length>0 & $("#reps").val()>0){
        $("#goal").addClass("filledIcon")
    } else {
        $("#goal").removeClass("filledIcon")
    }

    if($("#baselineReps").val().length>0 & $("#baselineReps").val()>0 & ( Number($("#baselineReps").val())<Number($("#reps").val()) | $("#reps").val().length == 0 )){
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

    // baseline error handler
    if( Number($("#baselineReps").val()) < Number($("#reps").val()) & $("#baselineReps").val().length > 0 & $("#baselineReps").val()>=0 |
        ($("#baselineReps").val().length > 0 & !isNaN(Number($("#baselineReps").val())) & $("#reps").val().length == 0 & $("#baselineReps").val()>=0)){
        $("#baselineReps").css('background-color','#8A94B9')
    } else { $("#baselineReps").css('background-color','#C6C0CA') }

}

function sendGoalToDB(){
  $.ajax({
        url: "http://ec2-54-204-66-243.compute-1.amazonaws.com/admin/goals",
        type: "POST",
        data: bodyweightObjectJSON,
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(){},
        error: function(){}
    });
}

// Event Handlers

// $('window')
//     .scroll(freezeBanner) --> this didn't work

$('input[type="text"]')
    // event handler
    .keyup(resizeInput)
    .keyup(fillIcons)
    // .keyup(checkError)
    .keyup(replaceBaseline)
    .keyup(changeBackground)
    .keyup(writeBodyweightObject)
    .keyup(allowSubmit)
    .each(startSizeInput) //resize on page load

$('.submit')
    .click(sendGoalToDB)

$('textarea')
    .keyup(fillIcons)

$(".timeframe")
    .click(toggleButtonColor)
    .click(selectTimeframe)
    .click(fillIcons)
    .click(writeBodyweightObject)
    .click(allowSubmit)


// OLD CODE - removing error pop-ups in favor of using fill

// function checkError(){

//     if($("#reps").val().length>0 & isNaN($("#reps").val())){
//         $("#repsError").css("visibility","visible");
//     } else {
//         $("#repsError").css("visibility","hidden");
//     }

//     if($("#baselineReps").val().length>0 & isNaN($("#baselineReps").val())){
//         $("#baselineRepsError").css("visibility","visible");
//     } else {
//         $("#baselineRepsError").css("visibility","hidden");
//     }
// }
