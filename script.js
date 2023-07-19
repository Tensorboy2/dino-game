// Constants for the double pendulum animation
const canvas = document.getElementById('doublePendulumCanvas');
const ctx = canvas.getContext('2d');
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

    const num1 = -g * (2 * mass1 + mass2) * Math.sin(pendulum.angle1);
    const num2 = -mass2 * g * Math.sin(pendulum.angle1 - 2 * pendulum.angle2);
    const num3 = -2 * Math.sin(pendulum.angle1 - pendulum.angle2) * mass2;
    const num4 = pendulum.angle2Velocity * pendulum.angle2Velocity * arm2Length + pendulum.angle1Velocity * pendulum.angle1Velocity * arm1Length * Math.cos(pendulum.angle1 - pendulum.angle2);
    const den = arm1Length * (2 * mass1 + mass2 - mass2 * Math.cos(2 * pendulum.angle1 - 2 * pendulum.angle2));
    const angle1Acceleration = (num1 + num2 + num3 * num4) / den;

    const num5 = 2 * Math.sin(pendulum.angle1 - pendulum.angle2) * (pendulum.angle1Velocity * pendulum.angle1Velocity * arm1Length * (mass1 + mass2));
    const num6 = g * (mass1 + mass2) * Math.cos(pendulum.angle1);
    const num7 = pendulum.angle2Velocity * pendulum.angle2Velocity * arm2Length * mass2 * Math.cos(pendulum.angle1 - pendulum.angle2);
    const den2 = arm2Length * (2 * mass1 + mass2 - mass2 * Math.cos(2 * pendulum.angle1 - 2 * pendulum.angle2));
    const angle2Acceleration = (num5 + num6 + num7) / den2;

    pendulum.angle1Velocity += angle1Acceleration;
    pendulum.angle2Velocity += angle2Acceleration;
    pendulum.angle1 += pendulum.angle1Velocity * 0.01; // Adjust the time step to control the speed
    pendulum.angle2 += pendulum.angle2Velocity * 0.01; // Adjust the time step to control the speed
  }
}

// Function to draw the double pendulum on the canvas for each pendulum
function drawPendulum() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numPendulums; i++) {
    const pendulum = pendulums[i];
    const x1 = canvas.width / 2 + arm1Length * Math.sin(pendulum.angle1);
    const y1 = canvas.height / 3 + arm1Length * Math.cos(pendulum.angle1);
    const x2 = x1 + arm2Length * Math.sin(pendulum.angle2);
    const y2 = y1 + arm2Length * Math.cos(pendulum.angle2);

    ctx.strokeStyle = pendulum.tracerColor;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 3);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.fillStyle = pendulum.tracerColor;
    ctx.beginPath();
    ctx.arc(x2, y2, 1.5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

// Animation loop
function animatePendulum() {
  updatePendulum();
  drawPendulum();
  requestAnimationFrame(animatePendulum);
}


// Function to draw the double pendulum on the canvas for each pendulum
function drawPendulum() {
  pendulumCtx.clearRect(0, 0, pendulumCanvas.width, pendulumCanvas.height);

  for (let i = 0; i < numPendulums; i++) {
    const pendulum = pendulums[i];
    const x1 = pendulumCanvas.width / 2 + arm1Length * Math.sin(pendulum.angle1);
    const y1 = pendulumCanvas.height / 3 + arm1Length * Math.cos(pendulum.angle1);
    const x2 = x1 + arm2Length * Math.sin(pendulum.angle2);
    const y2 = y1 + arm2Length * Math.cos(pendulum.angle2);

    pendulumCtx.strokeStyle = pendulum.tracerColor;
    pendulumCtx.beginPath();
    pendulumCtx.moveTo(pendulumCanvas.width / 2, pendulumCanvas.height / 3);
    pendulumCtx.lineTo(x2, y2);
    pendulumCtx.stroke();

    pendulumCtx.fillStyle = pendulum.tracerColor;
    pendulumCtx.beginPath();
    pendulumCtx.arc(x2, y2, 1.5, 0, 2 * Math.PI);
    pendulumCtx.fill();
  }
}

// Start the animation
animatePendulum();
