interface Item{
    id:number,
    text:string,
    completed:boolean
}

const itemInput = document.getElementById('itemInput') as HTMLInputElement;
const addItemBtn = document.getElementById('addItemBtn') as HTMLButtonElement;
const itemList = document.getElementById('itemList') as HTMLUListElement;

let items: Item[] = [];

function renderItems(){
    itemList.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.className = 'item';
        li.setAttribute('data-item-id',String(item.id));
        if(item.completed){
            li.classList.add('completed');
        }
        if(!item.completed){
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click',()=>{
                const confirmDelete = confirm('OK = delete | Cancel = abort operation');
                if(confirmDelete){
                    deleteItem(item.id);
                }
            });
            li.appendChild(deleteBtn);
        }
        itemList.appendChild(li);
        setupItemEventListeners(item.id);
        
    });
}

function setupItemEventListeners(itemId:number){
    const itemI = document.querySelector(`[data-item-id="${itemId}"]`);
    if(itemI){
        itemI.addEventListener('click',()=>{
            const item = items.find(item => item.id === itemId);
            if(item){
                item.completed = !item.completed;
                renderItems();
                localStorage.setItem('items',JSON.stringify(items));
            }
        });
    }
}


function addItem(text: string){
    if(text.length < 4){
        alert('Value must be greater than 3 characters.');
        return;
    }
    if(items.length >= 8){
        alert('Maximum 8 items are allowed to add in the list.');
        return;
    }

    const newItem: Item ={
        id: items.length + 1,
        text: text,
        completed: false
    };

    items.push(newItem);
    renderItems();
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItem(id:number){
    items = items.filter(item => item.id !== id);
    renderItems();
    localStorage.setItem('items',JSON.stringify(items));
}

addItemBtn.addEventListener('click', ()=>{
    const itemText = itemInput.value.trim();
    addItem(itemText);
    itemInput.value = '';
});


const storedItems = localStorage.getItem('items');
if(storedItems){
    items = JSON.parse(storedItems);
    renderItems();
}