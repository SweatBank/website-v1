
// mouseover function
$(".goaltype").mouseover(function(){
    if (!$(this).hasClass("selected")){
        $(this).find("img").css("opacity",.7)
    }
});

// mouseout function
$(".goaltype").mouseout(function(){
    if (!$(this).hasClass("selected")){
        $(this).find("img").css("opacity",.3)
    }
});

// make associated text black

function toggleIconFill(){
    if ($(this).hasClass("selected")){

        $(this).find("img").css("opacity",.3)
        $(this).removeClass("selected")
    } else {
        $(this).find("img").css("opacity",1)
        $(this).addClass("selected")

        $(".goaltype").not(this).find("img").css("opacity",.3)
        $(".goaltype").not(this).removeClass("selected")
    }
}


function textFill(){
    if ($("#weightlifting").hasClass("selected")){
        $("#weightliftingDescription").css("color","#5F527F")
        $(".description").find(".examples").not("#weightliftingDescription").css("color","grey")
        $(".goToGoal").attr("href", "record_lift_goal.html")
        $("#nextButton").removeClass("disallowed")

    } else if ($("#bodyweight").hasClass("selected")) {
        $("#bodyweightDescription").css("color","#5F527F")
        $(".description").find(".examples").not("#bodyweightDescription").css("color","grey")
        $(".goToGoal").attr("href", "record_bodyweight_goal.html")
        $("#nextButton").removeClass("disallowed")

    } else if ($("#tempo").hasClass("selected")) {
        $("#tempoDescription").css("color","#5F527F")
        $(".description").find(".examples").not("#tempoDescription").css("color","grey")
        $(".goToGoal").attr("href", "record_tempo_goal.html")
        $("#nextButton").removeClass("disallowed")

    } else if ($("#commitment").hasClass("selected")) {
        $("#commitmentDescription").css("color","#5F527F")
        $(".description").find(".examples").not("#commitmentDescription").css("color","grey")
        $(".goToGoal").attr("href", "record_commitment_goal.html")
        $("#nextButton").removeClass("disallowed")

    } else {
        $(".description").find(".examples").css("color","grey")
        $(".goToGoal").attr("href","")
        $("#nextButton").addClass("disallowed")
    }
}

// Event Handlers

$(".goaltype")
    .click(toggleIconFill)
    .click(textFill)
