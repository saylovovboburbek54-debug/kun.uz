let btn = document.getElementById("btn");
let score = document.getElementById("score");

let count = 0;

btn.addEventListener("mouseover", () => {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);

    btn.style.left = x + "px";
    btn.style.top = y + "px";
});

btn.addEventListener("click", () => {
    count++;
    score.innerText = count;
});