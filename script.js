// Constants for the double pendulum animation
const canvas = document.getElementById('doublePendulumCanvas');
const ctx = canvas.getContext('2d');
const g = 9.81; // gravitational constant
const arm1Length = 100;
const arm2Length = 100;
const mass1 = 1;
const mass2 = 2;

// Variables to track angles and angular velocities
let angle1 = Math.PI / 2;
let angle2 = Math.PI / 2;
let angle1Velocity = 0;
let angle2Velocity = 0;

// Function to update the double pendulum positions
function updatePendulum() {
  const num1 = -g * (2 * mass1 + mass2) * Math.sin(angle1);
  const num2 = -mass2 * g * Math.sin(angle1 - 2 * angle2);
  const num3 = -2 * Math.sin(angle1 - angle2) * mass2;
  const num4 = angle2Velocity * angle2Velocity * arm2Length + angle1Velocity * angle1Velocity * arm1Length * Math.cos(angle1 - angle2);
  const den = arm1Length * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2));
  const angle1Acceleration = (num1 + num2 + num3 * num4) / den;

  const num5 = 2 * Math.sin(angle1 - angle2) * (angle1Velocity * angle1Velocity * arm1Length * (mass1 + mass2));
  const num6 = g * (mass1 + mass2) * Math.cos(angle1);
  const num7 = angle2Velocity * angle2Velocity * arm2Length * mass2 * Math.cos(angle1 - angle2);
  const den2 = arm2Length * (2 * mass1 + mass2 - mass2 * Math.cos(2 * angle1 - 2 * angle2));
  const angle2Acceleration = (num5 + num6 + num7) / den2;

  angle1Velocity += angle1Acceleration;
  angle2Velocity += angle2Acceleration;
  angle1 += angle1Velocity;
  angle2 += angle2Velocity;
}

// Function to draw the double pendulum on the canvas
function drawPendulum() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const x1 = canvas.width / 2 + arm1Length * Math.sin(angle1);
  const y1 = canvas.height / 3 + arm1Length * Math.cos(angle1);
  const x2 = x1 + arm2Length * Math.sin(angle2);
  const y2 = y1 + arm2Length * Math.cos(angle2);

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 3);
  ctx.lineTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x1, y1, mass1, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x2, y2, mass2, 0, 2 * Math.PI);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

// Animation loop
function animatePendulum() {
  updatePendulum();
  drawPendulum();
  requestAnimationFrame(animatePendulum);
}

// Start the animation
animatePendulum();
