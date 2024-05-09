let points = [];
let baricentro

let ladosPol = 4

function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  if (points.length == ladosPol) {
    points = [];
  }

  points.push(createVector(mouseX, mouseY));
}

function draw() {
  background(255);
  noFill();

  if (points.length == ladosPol) {
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < ladosPol; i++) {
      vertex(points[i].x, points[i].y)
    }
    endShape(CLOSE);
    stroke(236, 1, 90);
    strokeWeight(4);
    fill(236, 1, 90, 25);
    
    calcBaricentro(points);
  }

  strokeWeight(16);
  stroke(112, 50, 126)
  
  for (let p of points) {
    point(p.x, p.y);
  }
}

function calcArea(vertices) {
  let soma = 0
  let verticeXProx = 0
  let verticeY = 0
  for (let i = 0; i < 4; i ++) {
    let verticeX = vertices[i].x
    let verticeY = vertices[i].y
      
    if(i == vertices.length - 1) {
      verticeXProx = verticeX
      verticeYProx = verticeY
    } else {
      verticeXProx = vertices[i + 1].x
      verticeYProx = vertices[i + 1].y
    }
    soma = soma + (verticeX * verticeYProx) - (verticeY * verticeXProx)
  }
  
  return soma / 2
}

function calcBaricentro(vertices) {
  let area = calcArea(vertices)
  baricentro = createVector(calcBariX(vertices, area), calcBariY(vertices, area))
  
  strokeWeight(16);
  stroke(112, 50, 126)
  point(baricentro.x, baricentro.y)
   
}

function calcBariX(vertices, area) {
  let somaAuxX = 0
  let somaBariX = 0
  let verticeXProx = 0
  let verticeYProx = 0
  
  for (let i = 0; i < 4; i ++) {
      let verticeX = vertices[i].x
      let verticeY = vertices[i].y
      
      if(i == vertices.length - 1) {
        verticeXProx = verticeX
        verticeYProx = verticeY
      } else {
        verticeXProx = vertices[i + 1].x
        verticeYProx = vertices[i + 1].y
      }
      
      somaAuxX = (verticeXProx + verticeX) * (verticeX * verticeYProx - verticeY * verticeXProx)
      somaBariX += somaAuxX
  }
  let divisor = abs(6 * area)
  return abs(somaBariX) / divisor
}

function calcBariY(vertices, area) {
  let somaAuxY = 0
  let somaBariY = 0
  let verticeXProx = 0
  let verticeYProx = 0
  
  for (let i = 0; i < 4; i ++) {
      let verticeX = vertices[i].x
      let verticeY = vertices[i].y
      
      if(i == vertices.length - 1) {
        verticeXProx = verticeX
        verticeYProx = verticeY
      } else {
        verticeXProx = vertices[i + 1].x
        verticeYProx = vertices[i + 1].y
      }
      
      somaAuxY = (verticeYProx + verticeY) * (verticeX * verticeYProx - verticeY * verticeXProx)
      somaBariY += somaAuxY
  }
  
  let divisor = abs(6 * area)
  return abs(somaBariY) / divisor
}