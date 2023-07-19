// Constants for the double pendulum animation
const pendulumCanvas = document.getElementById('pendulumCanvas');
const pendulumCtx = pendulumCanvas.getContext('2d');
const g = 9.81; // gravitational constant
const arm1Length = 100;
const arm2Length = 100;
const mass1 = 10;
const mass2 = 10;
const numPendulums = 100;

// Function to generate a random initial angle between 0 and 2 * PI
function randomAngle() {
  return Math.random() * (2 * Math.PI);
}

// Function to create an array of random initial conditions for the pendulums
function generateRandomInitialConditions() {
  const initialConditions = [];
  for (let i = 0; i < numPendulums; i++) {
    initialConditions.push({
      angle1: randomAngle(),
      angle2: randomAngle(),
      angle1Velocity: 0,
      angle2Velocity: 0,
      tracerColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`
    });
  }
  return initialConditions;
}

// Variables to track angles and angular velocities for each pendulum
let pendulums = generateRandomInitialConditions();

// Function to update the double pendulum positions for each pendulum
function updatePendulum() {
  for (let i = 0; i < numPendulums; i++) {
    const pendulum = pendulums[i];
    // ... (rest of the updatePendulum function remains unchanged) ...
  }
}

// Function to draw the double pendulum on the canvas for each pendulum
function drawPendulum() {
  pendulumCtx.clearRect(0, 0, pendulumCanvas.width, pendulumCanvas.height);
  // ... (rest of the drawPendulum function remains unchanged) ...
}

// Animation loop
function animatePendulum() {
  updatePendulum();
  drawPendulum();
  requestAnimationFrame(animatePendulum);
}

// Start the animation
animatePendulum();
