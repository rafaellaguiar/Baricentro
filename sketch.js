let points = [];
let verticeX, verticeY, verticeXProx, verticeYProx
let baricentro
function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  if (points.length == 4) {
    points = [];
  }

  points.push(createVector(mouseX, mouseY));
}

function draw() {
  background(255);
  noFill();

  if (points.length == 4) {
    let [a, b, c, d] = points;

    strokeWeight(2);
    beginShape();
    vertex(a.x, a.y);
    vertex(b.x, b.y);
    vertex(c.x, c.y);
    vertex(d.x, d.y);
    endShape(CLOSE);
    stroke(236, 1, 90);
    strokeWeight(4);
    fill(236, 1, 90, 25);
    
    calcBaricentro([a, b, c, d]);
  }

  strokeWeight(16);
  stroke(112, 50, 126)
  
  for (let p of points) {
    point(p.x, p.y);
  }
}

function calcArea(vertices) {
  let soma = 0
  for (let i = 0; i < 3; i ++) {
    soma = soma + (vertices[i].x * vertices[i+1].y) - (vertices[i].y * vertices[i + 1].x)
  }
  
  soma = soma + (vertices[3].x * vertices[0].y - (vertices[3].y * vertices[0].x))
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
  for (let i = 0; i < 4; i ++) {
      verticeX = vertices[i].x
      verticeY = vertices[i].y
    
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
  
  for (let i = 0; i < 4; i ++) {
      verticeX = vertices[i].x
      verticeY = vertices[i].y
    
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