
// mouseover functions
$(".commitDiv").mouseover(function(){
    if (!$(this).hasClass("selected")){
        $(".commitGoal").css("opacity",.5)
    }
});

$(".performDiv").mouseover(function(){
    if (!$(this).hasClass("selected")){
        $(".performGoal").css("opacity",.5)
    }
});

// mouseout functions
$(".commitDiv").mouseout(function(){
    if (!$(this).hasClass("selected")){
        $(".commitGoal").css("opacity",.3)
    }
});

$(".performDiv").mouseout(function(){
    if (!$(this).hasClass("selected")){
        $(".performGoal").css("opacity",.3)
    }
});

// click functions

$(".commitDiv").click(function(){
    if (!$(this).hasClass("selected")){
        $(".commitGoal").css("opacity",1)
        $(".commitDiv").addClass("selected")
        $(".performDiv").removeClass("selected")
        $(".performGoal").css("opacity",.3)
        $("#commitmentButton").removeClass("disallowed")
        $("#performanceButton").addClass("disallowed")
    } else {
        $(".commitGoal").css("opacity",.5)
        $(".commitDiv").removeClass("selected")
        $("#commitmentButton").addClass("disallowed")
    }
});

$(".performDiv").click(function(){
    if (!$(this).hasClass("selected")){
        $(".performGoal").css("opacity",1)
        $(".performDiv").addClass("selected")
        $(".commitDiv").removeClass("selected")
        $(".commitGoal").css("opacity",.3)
        $("#performanceButton").removeClass("disallowed")
        $("#commitmentButton").addClass("disallowed")
    } else {
        $(".performGoal").css("opacity",.5)
        $(".performDiv").removeClass("selected")
        $("#performanceButton").addClass("disallowed")
    }
});



// function toggleIconFill(){
//     if ($(this).hasClass("selected")){
//         $(this).find("img").css("opacity",.3)
//         $(this).removeClass("selected")
//     } else {
//         $(this).find("img").css("opacity",1)
//         $(this).addClass("selected")
//         $(".goaltype").not(this).find("img").css("opacity",.3)
//         $(".goaltype").not(this).removeClass("selected")
//     }
// }

