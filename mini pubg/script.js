let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Player
let playerGeo = new THREE.BoxGeometry(1,1,1);
let playerMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let player = new THREE.Mesh(playerGeo, playerMat);
scene.add(player);

player.position.z = 5;

// Camera
camera.position.z = 10;

// Bullets
let bullets = [];

// Enemies
let enemies = [];

// Score
let score = 0;

// Controls
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.position.x -= 0.5;
  if (e.key === "ArrowRight") player.position.x += 0.5;

  if (e.code === "Space") {
    let bulletGeo = new THREE.SphereGeometry(0.2);
    let bulletMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let bullet = new THREE.Mesh(bulletGeo, bulletMat);

    bullet.position.set(player.position.x, player.position.y, player.position.z);
    scene.add(bullet);
    bullets.push(bullet);
  }
});

// Spawn enemy
function spawnEnemy() {
  let geo = new THREE.BoxGeometry(1,1,1);
  let mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  let enemy = new THREE.Mesh(geo, mat);

  enemy.position.x = (Math.random() - 0.5) * 10;
  enemy.position.z = -20;

  scene.add(enemy);
  enemies.push(enemy);
}

setInterval(spawnEnemy, 1000);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Move bullets
  bullets.forEach((b, i) => {
    b.position.z -= 0.5;
  });

  // Move enemies
  enemies.forEach((e, ei) => {
    e.position.z += 0.1;

    // collision with player
    if (
      Math.abs(e.position.x - player.position.x) < 1 &&
      Math.abs(e.position.z - player.position.z) < 1
    ) {
      alert("Game Over! Score: " + score);
      location.reload();
    }

    // bullet collision
    bullets.forEach((b, bi) => {
      if (
        Math.abs(b.position.x - e.position.x) < 1 &&
        Math.abs(b.position.z - e.position.z) < 1
      ) {
        scene.remove(e);
        scene.remove(b);

        enemies.splice(ei, 1);
        bullets.splice(bi, 1);

        score++;
        document.getElementById("score").innerText = "Score: " + score;
      }
    });
  });

  renderer.render(scene, camera);
}

animate();