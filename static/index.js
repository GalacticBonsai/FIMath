console.log("made it to js")

let clicks = 0;

function onClick() {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;

  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, 80, 80);
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let ccDisp = 0;
function square(n) {
  return n * n;
}

function displacement() {
  var mmBore = Number(document.getElementById("mmBore").value);
  var mmStroke = Number(document.getElementById("mmStroke").value);
  var cCyl = Number(document.getElementById("cCyl").value);

  console.log(`Bore: ${mmBore}, Stroke: ${mmStroke}, Cylinder Count: ${cCyl}`);

  var ccDisp = (Math.PI / 4) * Math.pow((mmBore / 10), 2) * (mmStroke / 10) * cCyl;
  
  console.log(`Displacement: ${ccDisp}`);

  document.getElementById("ccDisp").textContent = Math.floor(ccDisp);
}

// Function to update the displayed values next to the sliders
function updateSliderValues() {
  // Update Bore value
  document.getElementById('mmBoreValue').textContent = document.getElementById('mmBore').value;
  // Update Stroke value
  document.getElementById('mmStrokeValue').textContent = document.getElementById('mmStroke').value;
  // Update Cylinder Count value
  document.getElementById('cCylValue').textContent = document.getElementById('cCyl').value;
}

// Event listeners to update the displayed values as the sliders change
document.getElementById('mmBore').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('mmStroke').addEventListener('input', function() {
  updateSliderValues();
});

document.getElementById('cCyl').addEventListener('input', function() {
  updateSliderValues();
});

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

ctx.fillStyle = getRandomColor();
ctx.fillRect(0, 0, 80, 80);

//https://www.w3schools.com/graphics/canvas_intro.asp
//https://www.w3schools.com/TAGs/