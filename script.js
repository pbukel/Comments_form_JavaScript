"use strict";
const username = document.getElementById("username");
const rating = document.getElementById("rating");
const comment = document.getElementById("comment");
const submit = document.getElementById("submit");
const dataplace = document.querySelector(".placeholder");
const filtering = document.getElementById("filtering");
let data = [];
function addData(vardas, reitingas, komentaras) {
    // console.log(vardas, reitingas, komentaras);
    // console.log('tast');
    let comentaras = {
        name: vardas,
        rating: reitingas,
        comment: komentaras,
    };
    data.push(comentaras);
    printData();
}
submit.onclick = (e) => {
    e.preventDefault();
    addData(username.value, rating.value, comment.value);
    username.value = "";
    rating.value = "";
    comment.value = "";
};
function printData() {
    dataplace.innerHTML = "";
    data.map((x, i) => {
        let divas = document.createElement("div");
        divas.classList.add("review");
        divas.innerHTML = `
        <div class="display-top">
                <div class="user">${x.name}</div>
                <div class="stars">
                    <i class="sta fa-solid fa-star"></i>
                    <i class="sta fa-solid fa-star"></i>
                    <i class="sta fa-solid fa-star"></i>
                    <i class="sta fa-solid fa-star"></i>
                    <i class="sta fa-solid fa-star"></i>
                </div>
                <div> ${x.rating}/5 </div>

            </div>
            
            <div class="comments">${x.comment}</div>
            <div class="remover">
                    <button class="delete" id=${i}>X</button>
                
                </div>

        `;
        const star = divas.getElementsByClassName("sta");
        for (let i = 0; i < Number(x.rating); i++) {
            star[i].classList.add("green");
        }
        dataplace.append(divas);
    });
    const deleting = document.querySelectorAll(".delete");
    for (let x of deleting) {
        x.addEventListener("click", function (e) {
            e.preventDefault();
            //@ts-ignore
            let index = Number(e.target.id);
            data.splice(index, 1);
            printData();
        });
    }
}
filtering.addEventListener("change", (e) => {
    e.preventDefault();
    if (filtering.value == "Low")
        sortLowtoHigh();
    if (filtering.value == "High")
        sortHightoLow();
});
//sorting function by ranking
function sortLowtoHigh() {
    data.sort((a, b) => (Number(a.rating) > Number(b.rating) ? 1 : -1));
    printData();
}
function sortHightoLow() {
    data.sort((a, b) => (Number(a.rating) > Number(b.rating) ? -1 : 1));
    printData();
}
