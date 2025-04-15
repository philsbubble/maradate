// tracker
const datePlan = {
    weather: null,
    activityType: null,
    activity: null,
    food: null,
    dessert: null
  };
  
  // planner
  function startPlanning() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("weather-check").classList.remove("hidden");
  }
  
  // wetter filter
  function setWeather(weather) {
    datePlan.weather = weather;
    document.getElementById("weather-check").classList.add("hidden");
    document.getElementById("activity-type").classList.remove("hidden");
  }
  
  // activity type
  function setActivityType(type) {
    datePlan.activityType = type;
    document.getElementById("activity-type").classList.add("hidden");
    showActivityOptions();
  }
  
  // wetter nach filter
  function showActivityOptions() {
    const activityDiv = document.getElementById("activity-options");
    activityDiv.innerHTML = `
      <h2>was willst du am liebsten machen?</h2>
      <div class="options">
        ${getActivityButtons()}
      </div>
    `;
    activityDiv.classList.remove("hidden");
  }
  
  // buttons je nach wetter
  function getActivityButtons() {
    const activities = {
      cold: {
        exhausting: ["trampoline park 🏃", "badminton 🏸", "minigolf ⛳"],
        chill: ["café date ☕", "pokémon pack battle 💪 ", "photobooth & random kram 🙂‍↔️"]
      },
      warm: {
        exhausting: ["wandern 🥾", "spazieren ", "bouldern🤨"],
        chill: ["picnic&essen bestellen", "zoo🙂‍↔️", "andere stadt besuchen"]
      }
    };
    return activities[datePlan.weather][datePlan.activityType]
      .map(activity => `<button onclick="selectOption('activity', '${activity}')">${activity}</button>`)
      .join("");
  }
  
  // topics
  function selectOption(category, value) {
    datePlan[category] = value;
    const nextStep = {
      activity: "food-options",
      food: "dessert-options",
      dessert: "showResults"
    }[category];
    document.getElementById(`${category}-options`).classList.add("hidden");
    if (nextStep === "showResults") showResults();
    else document.getElementById(nextStep).classList.remove("hidden");
  }
  
  // eis wenn kalt ? ? 
  function checkDessert(dessert) {
    if (dessert === "ice cream 🍦" && datePlan.weather === "cold") {
      const sassPopup = document.createElement("div");
      sassPopup.className = "piplup-sass-popup";
      sassPopup.innerHTML = `
        <div class="piplup-question">
          <img src="assets/plinfa.gif" alt="Piplup Side-Eye" class="piplup-sassy">
          <div class="speech-bubble">"sicher? es ist kalt 🤨"</div>
          <div class="sass-buttons">
            <button class="sass-confirm">yess erdbeereis! 🙂‍↕️</button>
            <button class="sass-cancel">...mhh lieber nicht 🥶</button>
          </div>
        </div>
      `;
      document.body.appendChild(sassPopup);
  
      // ja -> ergebnisse
      document.querySelector(".sass-confirm").addEventListener("click", () => {
        selectOption('dessert', 'ice cream 🍦');
        document.body.removeChild(sassPopup);
        showResults();
      });
  
      // nein -> erneut auswählen 
      document.querySelector(".sass-cancel").addEventListener("click", () => {
        document.body.removeChild(sassPopup);
      });
    } else {
      selectOption('dessert', dessert);
    }
  }
  
  // result
  function showResults() {
    document.getElementById("final-activity").textContent = `activity: ${datePlan.activity}`;
    document.getElementById("final-food").textContent = `food: ${datePlan.food}`;
    document.getElementById("final-dessert").textContent = `dessert: ${datePlan.dessert}`;
    document.getElementById("results").classList.remove("hidden");
  
    // confetti yay
    function heartConfetti() {
      const heartColors = ['#ff6b6b', '#ff8e8e', '#ffb3b3', '#ffd8d8']; 
      const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜']; 
  
      for (let i = 0; i < 100; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-20px";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        heart.style.zIndex = "9999";
        heart.style.userSelect = "none";
        heart.style.pointerEvents = "none";
        document.body.appendChild(heart);
  
        // herzen fade
        setTimeout(() => heart.remove(), 12000);
      }
    }
  
    // css animation
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fall {
        to { transform: translateY(100vh) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  
    // button click hearts
    heartConfetti();
  }
  
  // reset
  function resetChoices() {
    for (let key in datePlan) datePlan[key] = null;
    document.getElementById("results").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
  }