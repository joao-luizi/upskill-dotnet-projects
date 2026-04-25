


function Init(){
    for (i = 0; i < fname.length; i++){
        const container = document.getElementById("container")
        const divContainer = document.createElement("div")
        divContainer.style = "min-width: 250px; border: 1px solid black; width: 25%; display: inline-block; margin: 10px"
        const title = document.createElement("h2")
        title.innerText = fname[i];
        const bt = document.createElement("button")
        bt.innerText = "Testar"
        bt.addEventListener('click', window[`Teste${fname[i]}`]);
        const p = document.createElement("p");
        p.id = `${fname[i]}Explain`
        p.textContent = ":"
        divContainer.append(title, bt, p);
        container.appendChild(divContainer)
    }
}