"use strict";
let pauseDispUpdate = false;

$(function () {
    let activeGame = null;

    $(".menutext").on("click", function () {
        // toggle the menu.
        if ($(this).attr('toggled') == 'false') {
            $(this).attr('toggled', 'true');
            $('.games').css('left', '0px');
            $('.arrow').css('transform', 'rotate(180deg)');
            $(this).find("#p").html('QUIT');
        } else {
            resetGames();
        }
    });

    function setupGame() {
        playingGame = true;
        $('.laps').find('div').remove();
        // reset the current time.
        sec = 0;
        min = 0;
        hour = 0;
        run = false;
        $("#toggle").html("START");
    }

    function resetGames() {
        $(".menutext").attr('toggled', 'false');
        $('.games').css('left', '-85px');
        $('.arrow').css('transform', 'rotate(0deg)');
        $(".menutext").find("#p").html('GAMES');
        playingGame = false;
        pauseDispUpdate = false;
        $("#text").css('font-size', '64px');
        $(".instructions").html("");
    }

    $("#game1").on("click", function () {
        setupGame();

        activeGame = 1;
        $(".instructions").html("Press START to begin. You need to stop the watch as close to 5 seconds as possible.");
    });

    $("#game2").on("click", function () {
        setupGame();

        activeGame = 2;
        $(".instructions").html("Press START to begin. There will be a random delay before the timer starts and your goal is to stop it as soon as you can to measure your reaction time.");
    });

    $("#game3").on("click", function () {
        setupGame();

        activeGame = 3;
        $(".instructions").html("Press START to begin. Click the button as many times as you can in eight seconds.");
    });

    let rand;
    let clickCounter;
    let clickDelay = 0;
    $('#toggle').on("click", function () {
        if (activeGame == 1 && run == false) {
            run = true;
            sec = 0;
            min = 0;
            hour = 0;
            pauseDispUpdate = false;
            $("#toggle").html("STOP!");
            $("#text").css('font-size', '64px');
        } else if (activeGame == 1 && run == true) {
            let totalTime = (hour * 60 * 60) + (min * 60) + sec;
            run = false;

            let missed = Math.abs(5 - totalTime).toFixed(2);

            pauseDispUpdate = true;
            $("#text").html(`${missed} seconds off!`).css('font-size', '40px');
        } 
        
        if (activeGame == 2 && run == false) {
            sec = 0;
            min = 0;
            hour = 0;
            pauseDispUpdate = false;
            $("#toggle").html("SHOOT!");
            $("#text").css('font-size', '64px');
            let randNum = (Math.floor(Math.random() * 4) + 2) * 1000;
            console.log(randNum);
            rand = setTimeout(delayRand, randNum);
        } else if (activeGame == 2 && run == true) {
            let totalTime = ((hour * 60 * 60) + (min * 60) + sec).toFixed(2);
            run = false;

            pauseDispUpdate = true;
            $("#text").html(`${totalTime} seconds off!`).css('font-size', '40px');
        }

        if (activeGame == 3 && run == false && clickDelay <= 0) {
            sec = 0;
            min = 0;
            hour = 0;
            pauseDispUpdate = false;
            $("#toggle").html("CLICK!");
            $("#text").css('font-size', '64px');
            clickCounter = 0;
            run = true;
            clickDelay = 2000;
            window.setInterval(function () { clickDelay --; }, 1);
        } else if (activeGame == 3 && run == true) {
            clickCounter ++;

            if ((hour * 60 * 60) + (min * 60) + sec >= 8) {
                run = false;
                pauseDispUpdate = true;
                $("#text").html(`${clickCounter} clicks in 8 seconds!`).css('font-size', '40px');
            }
        }
    });

    function delayRand() {
        run = true;
    }
});