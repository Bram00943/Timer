  //#region id's
  document.getElementById("start-button").addEventListener("click", startCountdown);
  document.getElementById("thirteen-hour").addEventListener("click", function() {
    setPreset("13:00");
  });
  document.getElementById("seventeen-hour").addEventListener("click", function() {
    setPreset("17:00");
  });
  //#endregion
  const elem = document.documentElement;
  let countdownInterval;
  let presetTime = null;
  
  function setPreset(time) {
    const thirteenButton = document.getElementById("thirteen-hour");
    thirteenButton.style.cssText = "position: relative; right: " + (parseInt(thirteenButton.style.right || 0) + 800) + "px";
    
    const seventeenButton = document.getElementById("seventeen-hour");
    seventeenButton.style.cssText = "position: relative; left: " + (parseInt(seventeenButton.style.left || 0) + 800) + "px";
    
    const endTimeInput = document.getElementById("end-time");
    endTimeInput.value = time;
    presetTime = time;
    
    startCountdown();
    
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
    
  function startCountdown() {
    const endTimeInput = document.getElementById("end-time");
    const endTime = endTimeInput.value || presetTime;
    let requestId; // Stores the request ID for canceling the animation frame
    
    function updateCountdown() {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      
      const [endHour, endMinute] = endTime.split(":").map(Number);
      
      let totalMinutes =
        ((endHour * 60) + (endMinute - 1)) - ((currentHour * 60) + currentMinute);
      totalMinutes = (totalMinutes < 0) ? totalMinutes + 24 * 60 : totalMinutes;
      
      let remainingHours = Math.floor(totalMinutes / 60);
      let remainingMinutes = totalMinutes % 60;
      let remainingSeconds = Math.max(0, 60 - currentSecond);
      
      if (
        currentHour === endHour &&
        currentMinute === endMinute &&
        currentSecond === 0
      ) {
        const thirteenButton = document.getElementById("thirteen-hour");
        const seventeenButton = document.getElementById("seventeen-hour");
        
        thirteenButton.style.position = "relative";
        thirteenButton.style.right = `${parseInt(thirteenButton.style.right || 0) - 800}px`;
        thirteenButton.style.top = `${parseInt(thirteenButton.style.top || 0) + 70}px`;
        
        seventeenButton.style.position = "relative";
        seventeenButton.style.left = `${parseInt(seventeenButton.style.left || 0) - 800}px`;
        seventeenButton.style.top = `${parseInt(seventeenButton.style.top || 0) + 70}px`;
        
        remainingHours = remainingMinutes = remainingSeconds = 0;
        
        const countdownElement = document.getElementById("countdown");
        countdownElement.innerHTML = "Good job doing nothing this lesson";
        
        cancelAnimationFrame(requestId);
      } else {
        if (remainingHours < 0) {
          remainingHours += 24;
        }
        
        const hoursUnit = remainingHours === 1 ? "hour" : "hours";
        const minutesUnit = remainingMinutes === 1 ? "minute" : "minutes";
        const secondsUnit = remainingSeconds === 1 ? "second" : "seconds";
        
        const countdownElement = document.getElementById("countdown");
        countdownElement.innerHTML =
          `${remainingHours} ${hoursUnit} | ${remainingMinutes} ${minutesUnit} | ${remainingSeconds} ${secondsUnit}`;
        
        requestId = requestAnimationFrame(updateCountdown);
      }
    }
    
    requestId = requestAnimationFrame(updateCountdown);
  }
  