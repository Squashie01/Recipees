
document.querySelector(".button-container").addEventListener("click", () =>{
    let text = document.getElementById("filter-items").value;
    getItems().then(items => {
        let filteredItems = filterItems(items, text);
        showItems(filteredItems);
    })
});

function getItems(){
    return fetch("items.json")
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

function filterItems(items, searchText){
    if(searchText){
        let filteredItems = items.filter(item =>{
            if(
                item.name.toLowerCase().includes(searchText) || 
                item.about.toLowerCase().includes(searchText)
                )
            {
                return true;
            } 
            else 
            {
                return false;
            }
        })

        return filteredItems;
    } else {
        return items;
    }
}

function showItems(items){
    let itemContainer = document.querySelector(".items-container");
    
    let itemsHTML = "";

    items.forEach(item => {
        
        itemsHTML += `

            <div class="item-tile">
                <div class="top">
                    <img src="${item.img}" alt="">
                    <span> <i class="fas fa-ellipsis-h"></i> </span>
                </div>
                <div class="itemname">
                    <span> ${item.name} </span>
                </div>
                <div class="description">
                    <span> ${item.about} </span>
                </div>
                <div class="button">
                    <a href="${item.article}">
                        View More
                    </a>
                </div>
            </div>

        `
    });

    itemContainer.innerHTML = itemsHTML;
}

getItems().then(data => {
    showItems(data);
});