// common function
function setEndDate(){
    endDate = new Date(today.setDate(today.getDate() + (timeFrame * 7)))
    today = new Date()
    return endDate
}

// common function
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
// common function
function resizeInput() {
    if( $(this).val().length>=1 ) { $(this).attr('size', $(this).val().length+2) }
    else { $(this).attr('size', $(this).attr('placeholder').length+2) }
}

// common function
function startSizeInput() { $(this).attr('size', $(this).attr('placeholder').length+2) }

// Lift only function
function changeTimes(){ // changes the placeholder word from "times" to "time" if the number of reps is 1
    if ($('#reps').val()!=1){
        $('#goalTimes').html('times')
        $('#baselineTimes').html('times')
    } else {
        $('#goalTimes').html('time')
        $('#baselineTimes').html('time')
    }
}

// common function
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

// common function
function changeBackground(){
    if($(this).val().length>0){ $(this).css('background-color','#8A94B9') }
    else { $(this).css('background-color','#C6C0CA') }
}

// lift only function
function replaceBaseline(){ // replaces baseline placeholder text based on goal text
    if($('#exercise').val().length>=1){ $('#baselineExercise').html($('#exercise').val()) }
    else { $('#baselineExercise').html('squat') }

    if($('#units').val().length>=1){$('#baselineUnits').html($('#units').val())}
    else {$('#baselineUnits').html('lbs/kg')}

    if($('#reps').val().length>=1){$('#baselineLiftReps').html($('#reps').val())}
    else {$('#baselineLiftReps').html('8')}
}

// lift only function
function checkError(){

    // baseline > goal error
    if ($("#weight").val().length > 0 & Number($("#baselineWeight").val()) >= Number($("#weight").val())) { $("#baselineExceedsGoalError").css("visibility","visible") }
    else { $("#baselineExceedsGoalError").css("visibility","hidden") }

    // non-numerical weight error
    if ($("#weight").val().length>0 & isNaN($("#weight").val())) { $("#weightError").css("visibility","visible") }
    else { $("#weightError").css("visibility","hidden") }

    // non-standard units error
    if ($("#units").val().length>0 & $("#units").val() != "kg" & $("#units").val() != "lbs"){ $("#unitsError").css("visibility","visible") }
    else { $("#unitsError").css("visibility","hidden") }

    // non-numerical reps error
    if($("#reps").val().length>0 & isNaN($("#reps").val())){
        $("#repsError").css("visibility","visible");
    } else {
        $("#repsError").css("visibility","hidden");
    }

    // non-numerical baseline weight error
    if($("#baselineWeight").val().length>0 & isNaN($("#baselineWeight").val())){
        $("#baselineWeightError").css("visibility","visible");
    } else {
        $("#baselineWeightError").css("visibility","hidden");
    }
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

// lift only function
function allowSubmit(){
    if($("#goal").css("opacity") == 1 & $("#timeframe").css("opacity") == 1 & $("#baseline").css("opacity") == 1) { $(".submit").removeClass("disallowed") }
    else { $(".submit").addClass("disallowed") }
}

// lift only
var today = new Date()
var endDate = ""
var timeFrame = ""
var liftObjectJSON = ""

var liftObject = {
    goalID:"",
    goaltype: "weightlifting",
    confirmed:"", // once a payment has been received for a goal, it will be confirmed
    lift: "", //
    goalWeight:"",
    reps: "",
    units:"",
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

function sendGoalToDB(){
  $.ajax({
        url: "http://ec2-54-204-66-243.compute-1.amazonaws.com/admin/goals",
        type: "POST",
        data: liftObjectJSON,
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(){},
        error: function(){}
    });
}

// Event Handlers

$('input[type="text"]')
    .keyup(resizeInput)
    .keyup(fillIcons)
    .keyup(checkError)
    .keyup(replaceBaseline)
    .keyup(changeBackground)
    .keyup(writeLiftObject)
    .keyup(allowSubmit)
    .each(startSizeInput) //resize on page load

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
    .click(writeLiftObject)
    .click(allowSubmit)


