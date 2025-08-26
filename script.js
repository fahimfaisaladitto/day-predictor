document.addEventListener('DOMContentLoaded', () => {
  // --- Dark Mode Logic ---
  // This logic remains the same to control the theme.
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlElement = document.documentElement;
  const toggleBall = document.getElementById('toggleBall');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  function setTheme(isDark) {
    if (isDark) {
      htmlElement.classList.add('dark');
      toggleBall.style.transform = 'translateX(24px)';
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark');
      toggleBall.style.transform = 'translateX(0)';
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
      localStorage.setItem('theme', 'light');
    }
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  const initialThemeIsDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
  setTheme(initialThemeIsDark);
  darkModeToggle.checked = initialThemeIsDark;

  darkModeToggle.addEventListener('change', () => {
    setTheme(darkModeToggle.checked);
  });
});

// --- Prediction Logic for Days ---
function predictDay() {
  const daySelect = document.getElementById("daySelect");
  const selectedDay = daySelect.value;
  const loadingContainer = document.getElementById("loadingContainer");
  const loadingText = document.getElementById("loadingText");
  const resultContainer = document.getElementById("resultContainer");
  const resultText = document.getElementById("resultText");
  const spinner = loadingContainer.querySelector('div');

  // --- UI State Management ---

  // 1. Reset to a clean slate
  resultContainer.classList.add("hidden");
  resultContainer.classList.remove("result-enter-active", "result-enter");
  loadingContainer.classList.add("hidden");
  
  // 2. Validate input and show error if needed
  if (!selectedDay) {
    loadingText.textContent = "Please select a day.";
    spinner.classList.add('hidden'); // No spinner for validation error
    loadingContainer.classList.remove("hidden");
    return;
  }

  // 3. Show loading state
  spinner.classList.remove('hidden');
  loadingText.innerHTML = "&nbsp;"; // Use non-breaking space to reserve height
  loadingContainer.classList.remove("hidden");

  const loadingMessages = ["Consulting the calendar...", "Checking the timeline...", "Peeking into tomorrow...", "Warping time slightly...", "The future is coming..."];
  let messageIndex = 0;

  const messageInterval = setInterval(() => {
    loadingText.textContent = loadingMessages[messageIndex % loadingMessages.length];
    messageIndex++;
  }, 700);

  // 4. Simulate process and show result
  setTimeout(() => {
    clearInterval(messageInterval);
    
    // Logic to find the next day
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDayIndex = daysOfWeek.indexOf(selectedDay);
    const nextDayIndex = (currentDayIndex + 1) % 7; // Use modulo to wrap around from Saturday to Sunday
    const nextDay = daysOfWeek[nextDayIndex];
    
    loadingContainer.classList.add("hidden");
    
    resultText.textContent = nextDay;
    resultContainer.classList.remove("hidden");
    resultContainer.classList.add("result-enter");

    // Trigger the fade-in animation for the result
    setTimeout(() => {
        resultContainer.classList.add("result-enter-active");
    }, 20);

  }, 3500); // Kept the same delay for a dramatic effect
}
