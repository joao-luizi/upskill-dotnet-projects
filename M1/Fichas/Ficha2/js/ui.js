

function Init(){
    for (i = 0; i < fname.length; i++){
        const container = document.getElementById("container")
        const divContainer = document.createElement("div")
        divContainer.style = "min-width: 250px; border: 1px solid black; width: 25%; display: inline-block; margin: 10px"
        const title = document.createElement("h2")
        title.innerText = fname[i][0];
        const bt = document.createElement("button")
        bt.innerText = "Testar"
        bt.addEventListener('click', fname[i][1]);
        const p = document.createElement("p");
        p.id = `${fname[i][0]}Explain`
        p.textContent = ":"
        divContainer.append(title, bt, p);
        container.appendChild(divContainer)
    }
}