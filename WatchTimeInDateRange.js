const fs = require("fs");

const data = fs.readFileSync("./WatchHistoryWithDuration.json", 'utf8');
const startDate = new Date("2024-01-03T00:00:00.000Z");
const endDate = new Date("2024-12-03T23:59:59.999Z");

// Parse the JSON data
try 
{
    const watchHistory = (JSON.parse(data)).filter(video => {
        const date = new Date(video.published);
        return date >= startDate && date <= endDate;
    });

   
    console.log(`----------------------
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@@@@@@@###################################################################@@@@@@
@@@@#########################################################################@@@
@@@###########################################################################@@
@@#############################################################################@
@###############################################################################
@###############################################################################
@###############################   #############################################
@###############################      ..########################################
@###############################          ...###################################
@###############################              .../##############################
@###############################                  ...###########################
@###############################                ,###############################
@###############################            ####################################
@###############################       #########################################
@###############################  ##############################################
@###############################################################################
@###############################################################################
@@#############################################################################@
@@#############################################################################@
@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@
@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@
@@@@@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@@@@@
`)
    console.log(`From: ${watchHistory[watchHistory.length - 1].published} until ${watchHistory[0].published}`);
    console.log(`Your YouTube Rewind`);
    console.log(`Total amount of videos: ${watchHistory.length}`);
    console.log(`Total watchtime: ${secondsToDhms(watchHistory.reduce((accumulator, video) => accumulator + video.durationSeconds, 0))}`)
} 
catch (parseError) 
{
    console.error('Error parsing JSON:', parseError);
}


/**
 * Converts a duration in seconds to a string representation of days, hours, minutes, and seconds.
 *
 * @param {number} seconds - The duration in seconds to be converted.
 * @returns {string} - The string representation of the duration in days, hours, minutes, and seconds.
 */
function secondsToDhms(seconds) 
{
    seconds = Number(seconds);

    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    
    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return dDisplay + hDisplay + mDisplay + sDisplay;
}