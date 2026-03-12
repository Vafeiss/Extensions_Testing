//Append a clock and update it every second
function clock(){
    const clock = document.createElement("div");
    document.body.appendChild(clock);
    function updateClock(){
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
    updateClock();
    setInterval(updateClock, 1000);
}

clock();