let circles = [];
let rectangles = [];
let semiCircles = [];
let timeOffset = 0;
let lightning = false;


class NeonCircle {
    constructor(x, y, diameter, angle, proportion) {
        this.baseX = x;
        this.baseY = y;
        this.baseDiameter = diameter;
        this.angle = angle;
        this.proportion = proportion;
    }


    draw(scale) {

        // Adjust positions based on window size and scale
        let newX = width / 2 + (this.baseX - 265) * scale;
        let newY = height / 2 + (this.baseY - 390) * scale;
        let newDiameter = this.baseDiameter * scale;


        // Generate new angles and positions using Perlin noise
        let noiseFactorAngle = noise(newX * 0.01, newY * 0.01, timeOffset);
        let newAngle = this.angle + noiseFactorAngle * PI;

        let noiseFactorX = noise(newX * 0.01, timeOffset);
        let noiseFactorY = noise(newY * 0.01, timeOffset + 1000);  // Use different offsets to avoid syncing X and Y changes
        newX += (noiseFactorX - 0.5) * 50 * scale; // The movement range is -25 to 25
        newY += (noiseFactorY - 0.5) * 50 * scale; // The movement range is -25 to 25
        circleNeon(newX, newY, newDiameter, color(120, 100, 100, 100), color(0, 100, 100, 100), newAngle, this.proportion);
    }
}


class NeonRectangle {
    constructor(x, y, w, h, fillColor, strokeColor) {
        this.baseX = x;
        this.baseY = y;
        this.baseW = w;
        this.baseH = h;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }


    draw(scale) {
        // Adjust positions based on window size and scale
        let newX = width / 2 + (this.baseX - 265) * scale;
        let newY = height / 2 + (this.baseY - 390) * scale;
        let newW = this.baseW * scale;
        let newH = this.baseH * scale;
        fill(this.fillColor);
        if (this.strokeColor) {
            stroke(this.strokeColor);
        } else {
            noStroke();
        }
        rect(newX, newY, newW, newH);
    }
}


class NeonSemiCircle {
    constructor(x, y, w, h, fillColor) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fillColor = fillColor;
    }


    draw(scale) {
        // Adjust positions based on window size and scale
        let newX = width / 2 + (this.baseX - 265) * scale;
        let newY = height / 2 + (this.baseY - 390) * scale;
        let newW = this.baseW * scale;
        let newH = this.baseH * scale;
        fill(this.fillColor);
        noStroke();
        arc(newX, newY, newW, newH, PI, 0, CHORD);
    }
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);


    noFill();
    stroke(255);
    strokeWeight(3);


    imageMode(CENTER);
    pixelDensity(2);


    // Initialize circles
    // Initialize circles on the left side
    circles.push(new NeonCircle(60, 0, 50, PI / 1.7, 0.4));
    circles.push(new NeonCircle(50, 55, 60, -PI / 2.2, 0.45));
    circles.push(new NeonCircle(55, 103, 33, PI / 2, 0.5));
    circles.push(new NeonCircle(87, 120, 40, PI, 0.5));
    circles.push(new NeonCircle(116, 137, 30, PI / 2, 0.5));
    circles.push(new NeonCircle(109, 181, 55, -PI / 2.5, 0.4));
    circles.push(new NeonCircle(122, 245, 70, PI / 1.83, 0.45));


    // Initialize circles in the middle
    circles.push(new NeonCircle(160, 280, 40, PI, 0.5));
    circles.push(new NeonCircle(200, 287, 40, -PI / 10, 0.6));
    circles.push(new NeonCircle(237, 278, 30, PI / 1.05, 0.55));
    circles.push(new NeonCircle(278, 287, 50, -PI / 10, 0.6));
    circles.push(new NeonCircle(325, 278, 40, PI / 20, 0.45));
    circles.push(new NeonCircle(371, 273, 48, PI / 1.11, 0.6));
    circles.push(new NeonCircle(253, 253, 30, -PI / 2, 0.5));
    circles.push(new NeonCircle(253, 207, 55, PI / 2, 0.5));
    circles.push(new NeonCircle(215, 178, 45, PI, 0.5));
    circles.push(new NeonCircle(175, 181, 30, -PI / 20, 0.55));
    circles.push(new NeonCircle(295, 181, 45, PI / 200, 0.5));
    circles.push(new NeonCircle(195, 140, 40, PI / 1.68, 0.4));
    circles.push(new NeonCircle(322, 150, 37, PI / 2.4, 0.58));


    // Initialize circles on the right side
    circles.push(new NeonCircle(390, 240, 50, -PI / 2.5, 0.4));
    circles.push(new NeonCircle(396, 192, 40, PI / 2, 0.5));
    circles.push(new NeonCircle(396, 140, 60, -PI / 2, 0.5));
    circles.push(new NeonCircle(388, 95, 30, PI / 3.4, 0.7));
    circles.push(new NeonCircle(413, 90, 20, PI / 8, 0.5));
    circles.push(new NeonCircle(450, 100, 50, -PI / 1.08, 0.55));
    circles.push(new NeonCircle(486, 120, 28, PI / 8, 0.5));
    circles.push(new NeonCircle(500, 100, 20, PI / 1.8, 0.45));


    // Initialize circles below
    circles.push(new NeonCircle(264, 340, 70, PI / 1.67, 0.4));
    circles.push(new NeonCircle(248, 417, 81, -PI / 2.25, 0.45));
    circles.push(new NeonCircle(250, 483, 45, PI / 2.22, 0.55));
    circles.push(new NeonCircle(261, 521, 30, PI / 1.42, 0.3));
    circles.push(new NeonCircle(240, 557, 50, -PI / 3.3, 0.3));
    circles.push(new NeonCircle(205.5, 577, 30, -PI / 0.95, 0.55));
    circles.push(new NeonCircle(164, 580, 50, PI / 200, 0.5));
    circles.push(new NeonCircle(283, 575, 40, PI / 10, 0.4));
    circles.push(new NeonCircle(332, 580, 60, PI / 1, 0.5));
   
    // Initialize rectangles
    rectangles.push(new NeonRectangle(58, 595, 433, 90, color(142, 66, 70), color(0, 0, 0)));
    rectangles.push(new NeonRectangle(82, 580, 325, 90, color(60, 100, 100), color(0, 0, 0)));
    rectangles.push(new NeonRectangle(138, 582.5, 50, 83, color(0, 100, 100, 100), null));
    rectangles.push(new NeonRectangle(193, 582.5, 62, 83, color(120, 100, 100, 100), null));
    rectangles.push(new NeonRectangle(303, 582.5, 60, 85, color(120, 100, 100, 100), null));
    rectangles.push(new NeonRectangle(0, 595, 58, 90, color(142, 66, 70), color(0, 0, 0)));
    rectangles.push(new NeonRectangle(479, 595, 58, 90, color(142, 66, 70), color(0, 0, 0)));


    // Initialize semi-circles
    semiCircles.push(new NeonSemiCircle(163, 667, 55, 40, color(60, 100, 100)));
    semiCircles.push(new NeonSemiCircle(110.5, 668, 52, 55, color(120, 100, 100, 100)));
    semiCircles.push(new NeonSemiCircle(224, 667, 63, 85, color(60, 100, 100)));
    semiCircles.push(new NeonSemiCircle(223.5, 667, 57, 78, color(0, 100, 100, 100)));
    semiCircles.push(new NeonSemiCircle(278, 667, 48, 58, color(0, 100, 100, 100)));
    semiCircles.push(new NeonSemiCircle(333, 667, 60, 20, color(60, 100, 100)));
    semiCircles.push(new NeonSemiCircle(384, 668, 41, 55, color(120, 100, 100, 100)));
}


function draw() {
    // Determine the scaling factor based on the window size
    let scale = min(windowWidth / 530, windowHeight / 780);


    //A random number check determines if lightning should start. This happens only 1% of the time.
    //If lightning is triggered, the background turns white, simulating a lightning flash. There's a 10% chance the lightning will stop on each frame, returning to the normal state.
    //When there's no lightning, the background is black, representing a clear or unlit sky.
    if (random(1) > 0.99) {
        lightning = true;
    }
    if (lightning) {
        background(255);
        if (random(1) > 0.9) {
            lightning = false;
        }
    } else {
        background(0);
    }


    timeOffset += 0.01; // Add time offset for Perlin noise


    // Draw rectangles
    for (let rect of rectangles) {
        rect.draw(scale);
    }


    // Draw semi-circles
    for (let semiCircle of semiCircles) {
        semiCircle.draw(scale);
    }


    // Draw circles
    for (let circle of circles) {
        circle.draw(scale);
    }

    drawRain();

}

    // Draw rains
function drawRain() {
    stroke(190, 100, 100, 50); // Use light blue to represent raindrops
    let rainIntensity = 50; // Number of raindrops
    for (let i = 0; i < rainIntensity; i++) {
        let x = random(width);
        let y = random(height);
        let length = random(20, 30); // Raindrop length
        line(x, y, x - length / 2, y + length); // Tilt the raindrops, from top right to bottom left
    }
}


function circleNeon(x, y, diameter, color1, color2, angle, proportion) {
    let greenAngle = proportion * PI * 2;
    let redAngle = (1 - proportion) * PI * 2;


    // Apply glow effect for the first part (green)
    glow(color1, 400);
    drawPartialCircle(x, y, diameter, color1, angle, greenAngle);


    // Apply glow effect for the second part (red)
    glow(color2, 400);
    drawPartialCircle(x, y, diameter, color2, angle + greenAngle, redAngle);


    // Apply additional layers of glow effect
    glow(color1, 80);
    drawPartialCircle(x, y, diameter, color1, angle, greenAngle);
    glow(color2, 80);
    drawPartialCircle(x, y, diameter, color2, angle + greenAngle, redAngle);


    glow(color1, 12);
    drawPartialCircle(x, y, diameter, color1, angle, greenAngle);
    glow(color2, 12);
    drawPartialCircle(x, y, diameter, color2, angle + greenAngle, redAngle);


    // Draw yellow line with glow
    glowLine(x, y, diameter, angle, greenAngle, color(60, 100, 100), [80, 40, 12]);
}


function drawPartialCircle(x, y, diameter, col, startAngle, arcLength) {
    fill(col);
    noStroke();
    beginShape();
    for (let a = startAngle; a < startAngle + arcLength; a += 0.01) {
        let sx = x + cos(a) * diameter / 2;
        let sy = y + sin(a) * diameter / 2;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


function drawLineSegment(x, y, diameter, angle, arcLength) {
    stroke(60, 100, 100); // Yellow color in HSB
    strokeWeight(4); // Line thickness
    let reduction = 1;
    let x1 = x + cos(angle) * (diameter / 2 - reduction);
    let y1 = y + sin(angle) * (diameter / 2 - reduction);
    let x2 = x + cos(angle + arcLength) * (diameter / 2 - reduction);
    let y2 = y + sin(angle + arcLength) * (diameter / 2 - reduction);
    line(x1, y1, x2, y2);
}


function glowLine(x, y, diameter, angle, arcLength, col, blurs) {
    for (let blur of blurs) {
        glow(col, blur);
        drawLineSegment(x, y, diameter, angle, arcLength);
    }
}


function glow(glowColor, blurriness) {
    drawingContext.shadowBlur = blurriness;
    drawingContext.shadowColor = glowColor;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
