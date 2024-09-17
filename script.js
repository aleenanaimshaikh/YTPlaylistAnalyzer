let total_sec = null
async function analyzePlaylist() {
    const url = document.getElementById('playlistUrl').value;
    // console.log(url)
    if (!url.includes("https://www.youtube.com")) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `<div class="result-item">Invalid URL detected...</div> `;
        // alert("Invalid URL")
    }
    else if (!url.includes("/playlist?list")) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `<div class="result-item">Enter youtube playlist URL not of a Video</div>`;

    }

    else {
        let parts = url.split("=")
        const playlistPath = parts[1];
        if (playlistPath) {
            const apiUrl = `http://localhost:8585/totalseconds?url=${playlistPath}`;

            response = await fetchData(apiUrl);
            responseArray = response.split(',')
            total_sec = parseInt(responseArray[0], 10)
            total_videos = parseInt(responseArray[1], 10)

            if (total_sec > 0) {
                // const div1 = document.getElementById('container')
                const div2 = document.getElementById('rightside')
                // const button = document.getElementById('AnalyzeButton')

                div2.style.pointerEvents = 'auto';

                div2.style.display = 'block';

            }

            console.log(total_sec)
            //calculations here
            function total_duration(total_sec) {
                hours = Math.trunc(total_sec / 3600)
                if (hours == 0) {
                    minutes = Math.trunc(total_sec / 60)
                    seconds = total_sec % 60

                    str = `${minutes} minutes and ${seconds} seconds.`
                    return str
                }
                else {

                    rem_sec = total_sec % 3600
                    rem_mins = Math.trunc(rem_sec / 60)
                    rem_seconds = rem_sec % 60
                    str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                    return str
                }

            }

            const duration = total_duration(total_sec)
            function at2x(total_sec) {
                p = Math.trunc(total_sec / 2) //35400
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600  //3000
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const twoX = at2x(total_sec)
            function at15x(total_sec) {
                p = Math.trunc(total_sec / 1.5)
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const one5X = at15x(total_sec)
            function at175x(total_sec) {
                p = Math.trunc(total_sec / 1.75)
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const one75X = at175x(total_sec)
            function at125x(total_sec) {
                p = Math.trunc(total_sec / 1.25)
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const one25X = at125x(total_sec)
            function at025x(total_sec) {
                p = Math.trunc(total_sec / 0.25)
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const zero25X = at025x(total_sec)
            function at05x(total_sec) {
                p = Math.trunc(total_sec / 0.5)
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const zero5X = at05x(total_sec)
            function at075x(total_sec) {
                p = Math.trunc(total_sec / 0.75)
                hours = Math.trunc(p / 3600)
                rem_sec = p % 3600
                rem_mins = Math.trunc(rem_sec / 60)
                rem_seconds = rem_sec % 60
                str = `${hours}hours ,${rem_mins} minutes and ${rem_seconds} sec`
                return str
            }
            const zero75X = at075x(total_sec)

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <div class="result-item">Total Videos: ${total_videos}</div>
                <div class="result-item">Total Duration: ${duration}</div>
                <div class="result-item"> at 0.25x: ${zero25X}</div>
                <div class="result-item"> at 0.5x: ${zero5X}</div>
                <div class="result-item"> at 0.75x: ${zero75X}</div>
                <div class="result-item"> at 1.25x: ${one25X}</div>
                <div class="result-item"> at 1.5x : ${one5X}</div>
                <div class="result-item"> at 1.75x: ${one75X}</div>
                <div class="result-item"> at 2x: ${twoX}</div>
            
            `;
        }
    }
}

function howManyDays() {
    if (isNaN(total_sec) || total_sec <= 0) {
        console.error("Invalid total_sec value:", total_sec);
        alert('Invalid total seconds provided.');
        return;
    }
    const noDays = parseInt(document.getElementById('Days').value, 10); // Convert to an integer
    const speed = parseFloat(document.getElementById('speedD').value, 10);
    // Check if noDays is a valid number
    if (noDays <= 0) {
        const resultsDiv = document.getElementById('results2');
        resultsDiv.innerHTML = `<div class="result-item">ENter valid number of Days</div> `;

        return;
    }

    else {
        const seconds_per_day = Math.trunc((total_sec / speed) / noDays);

        // Convert seconds to hours, minutes, and seconds
        const hours = Math.trunc(seconds_per_day / 3600); // Convert to hours
        const rem_seconds = seconds_per_day % 3600; // Remaining seconds after hours
        const minutes = Math.trunc(rem_seconds / 60); // Convert remaining seconds to minutes
        const seconds = rem_seconds % 60; // Remaining seconds


        let str = `Watch ${hours} hours , ${minutes} minutes and ${seconds} seconds per day to complete in ${noDays} days.`

        const resultsDiv = document.getElementById('results2');
        resultsDiv.innerHTML = `<div class="result-item">${str}</div>`
    }
}

function hoursPerDay() {
    const noHours = parseInt(document.getElementById('hours').value, 10);//5hr
    const noMinutes = parseInt(document.getElementById('minutes').value, 10);
    const speed = parseFloat(document.getElementById('speed').value, 10);
    const hoursInSec = noHours * 3600
    const minInSec = noMinutes * 60


    const total_input_sec = (hoursInSec + minInSec)
    // console.log(hoursInSec)
    // console.log(min)



    const total_days = Math.ceil((total_sec / speed) / total_input_sec)



    if (noHours < 0 || noHours > 24 || noMinutes < 0 || noMinutes > 59) {
        const resultsDiv = document.getElementById('results3');
        resultsDiv.innerHTML = `<div class="result-item">Enter valid number of hours/minutes </div> `;

        return;
    }
    str = `It will take ${total_days} days to complete the playlist if you watch at ${noHours} hours and ${noMinutes} minutes per day.`
    const resultsDiv = document.getElementById('results3');
    resultsDiv.innerHTML = `<div class="result-item">${str}</div>`

}



// Define the API URL


// Function to fetch data from the API
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        console.log("data is :", data) 
        return data  
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


