// Functions

var timeframe = 10 // duration of goal, in days
var daysIn = 4 // pretend scenario

var today = new Date();
var todayStr = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear()
// month is getMonth() + 1 because JavaScript thinks January is 0

var startDate = new Date()
startDate.setDate(today.getDate() - daysIn)
var startDateStr = (startDate.getMonth() + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear()

var endDate = new Date()
endDate.setDate(startDate.getDate() + timeframe)
var endDateStr = (endDate.getMonth() + 1) + "/" + endDate.getDate() + "/" + endDate.getFullYear()

// need to convert from javascript milliseconds to days
var daysLeft = (endDate - today)/86400000

$("#today").html(todayStr)
$("#goalEndDate").html(endDateStr)
$("#daysLeft").html(daysLeft)

function resizeInput() {
    if($(this).val().length>=1){ $(this).attr('size', $(this).val().length+2); } // buffer can be added if need be (3 = 3 pixels)
    else { $(this).attr('size', $(this).attr('placeholder').length+2); }
}

function startSizeInput() { $(this).attr('size', $(this).attr('placeholder').length+2); }

function changeBackground(){
    if($(this).val().length>0 & !isNaN($(this).val())){
        $(this).css('background-color','#8A94B9')
        $(".goalTypeIcon").css('opacity',1)
    } else {
        $(this).css('background-color','#C6C0CA')
        $(".goalTypeIcon").css('opacity',.3)
    }
}

function allowSubmit(){
    if($(".goalTypeIcon").css("opacity") == 1) { $(".submit").removeClass("disallowed") }
    else { $(".submit").addClass("disallowed") }
}

var weightlifting = { // will be passed in from DB
    lift:"bench press",
    goalWeight:"",
    reps:"",
    units:"",
    baselineWeight:"",
    thisMilestoneWeight:""
}


var goalStatus = {
    startDate: startDate,
    endDate: endDate,
    daysLeft: daysLeft,
    goalComplete: "",
}

var goal = {
    goalID: "",
    completeGoalString: "",
    goalType: weightlifting, //
    status: goalStatus
}


var liftObject = {
    userID:"", // do we want this associated with each goal object?
    goalID:"",
    completeGoalString:"",
    goalType: "weightlifting",
    goalStatus: "", // options: in-progress, achieved, expired
    dateAchieved:"", // not needed for any basic functionality, but could be useful for backwards-looking dashboard
    depositPaid:"", // payment-related, think about this down the road
    lift: "squat", //
    reps: "5",
    units:"lbs",
    goalWeight:"250",
    baselineWeight:"175",
    thisMilestoneWeight:"225",
    startDate:"",
    endDate:""
}

// occurs on page load
function fillMilestoneFields(){
    $(".lift").html(goal['goalType'].lift)
    $(".goalWeight").html(liftObject.goalWeight)
    $(".baselineWeight").html(liftObject.baselineWeight)
    $(".lastMilestoneWeight").html(liftObject.thisMilestoneWeight)
    $("#thisMilestoneWeight").attr('placeholder',liftObject.thisMilestoneWeight)
    $(".units").html(liftObject.units)
    $(".reps").html(liftObject.reps)
}

// Database Interaction

function getLiftObject(){
  $.ajax({
        url: "http://localhost:3000/liftGoals",
        type: "GET",
        dataType: 'json',
        success: function(liftGoals){
            liftGoalsJSON = liftGoals.json()
            console.log(liftGoals)
            console.log(liftGoals.length)
            var len = liftGoals.length;
            // for( var i=0; i<len; i++){
            //     var lift = liftGoals[i].lift;
            //     var goalWeight = liftGoals[i].goalWeight;
            //     var reps = liftGoals[i].reps;
            //     var baselineWeight = liftGoals[i].baselineWeight;
            // }
            console.log(liftGoals[0].lift)
            console.log(liftGoalsJSON[0])
            console.log(liftGoals[2])
        },
        error: function(){
            // error function contents here
        }
    });
}

// do not have JSON object prepared to parse yet
function parseLiftObject(){
    // var liftObject = JSON.parse()
}


// Event Handlers

$('window')
    .on('load',getLiftObject())
    .on('load',parseLiftObject())
    .on('load',fillMilestoneFields())

    // .on('load',startSizeInput())

$('input[type="text"]')
    .keyup(resizeInput)
    .keyup(changeBackground)
    .keyup(allowSubmit)
    // .keyup(rewriteLiftObject)
    .each(startSizeInput)

$('.submit')
    // .click(sendGoalToDB)

