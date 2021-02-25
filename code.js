"use strict";
let playingGame = false;

// time values.
let sec = 0;
let min = 0;
let hour = 0;

// the toggle for running the stopwatch.
let run = false;

$(function () {
    // the current time display.
    const $disp = $('#text');

    // the rate at which seconds increase. (0.005 is the most time-accurate)
    let timeRate = 0.005;

    // time displays include pre-value 0's.
    let secDisp = '00';
    let minDisp = '00';
    let hourDisp = '000';

    // when you click the toggle.
    $('#toggle').on("click", function () {
        if (!playingGame) {
            // toggle the run boolean.
            run = !run;

            // change the text of the lap button, and the background color of this button.
            if (run) {
                $('#freezeframe').html('LAP');
                $('#toggle').css('background-color', 'green');
            } else {
                $('#freezeframe').html('CLR');
                $('#toggle').css('background-color', 'red');
            }
        }
    });

    // when you click the lap button.
    $('#freezeframe').on("click", function () {
        if (!playingGame) {
            // if the app is running.
            if (run) {
                // remove the oldest lap if there are more than 8.
                if ($('.laps').children().length > 8) {
                    $('.laps').find('div').first().remove();
                }

                // remove the "new" tag.
                $('.laps').find('div').remove('#newest');

                // add a new lap.
                $('.laps').append(`
                <div class="freezeframeDisplay" id="freezeframeDisplay">
                    <div class="tableft"></div>
                    <div class="tabright"></div>
        
                    <p>${hourDisp}${minDisp}${secDisp}</p>
                </div>`);

                // add the "new" tag to the newest lap.
                $('.laps').find('div').last().append('<div id="newest">NEWEST</div>');
            // if the game is not running.
            } else {
                // clear the lap displays.
                $('.laps').find('div').remove();

                // reset the current time.
                sec = 0;
                min = 0;
                hour = 0;
            }
        }
    });

    // every 1 millisecond, this runs. Regardless of if the stopwatch is paused.
    function tick() {
        if (run) {
            // increase values
            sec += timeRate;
            if (sec >= 60) {
                min ++;
                sec = 0;
            } if (min >= 60) {
                hour ++;
                min = 0;
            } if (hour >= 999) {
                hour = 0;
            }
        }

        // display numbers properly.
        if (!pauseDispUpdate) {
            if (sec > 9.99) {
                secDisp = sec.toFixed(2);
            } else {
                secDisp = `0${sec.toFixed(2)}`;
            } if (min > 9) {
                minDisp = `${min}:`;
            } else {
                minDisp = `0${min}:`;
            } if (hour > 99) {
                hourDisp = `${hour}:`;
            } else if (hour <= 99 && hour > 9) {
                hourDisp = `0${hour}:`;
            } else {
                hourDisp = `00${hour}:`;
            }

            // update display.
            $disp.html(`${hourDisp}${minDisp}${secDisp}`);
        }
    }
    window.setInterval(tick, 1);
});