"use strict";
var itemInput = document.getElementById('itemInput');
var addItemBtn = document.getElementById('addItemBtn');
var itemList = document.getElementById('itemList');
var items = [];
function renderItems() {
    itemList.innerHTML = '';
    items.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item.text;
        li.className = 'item';
        li.setAttribute('data-item-id', String(item.id));
        if (item.completed) {
            li.classList.add('completed');
        }
        if (!item.completed) {
            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', function () {
                var confirmDelete = confirm('Are you sure to delete the item?');
                if (confirmDelete) {
                    deleteItem(item.id);
                }
            });
            li.appendChild(deleteBtn);
        }
        itemList.appendChild(li);
        setupItemEventListeners(item.id);
    });
}
function setupItemEventListeners(itemId) {
    var itemI = document.querySelector("[data-item-id=\"".concat(itemId, "\"]"));
    if (itemI) {
        itemI.addEventListener('click', function () {
            var item = items.find(function (item) { return item.id === itemId; });
            if (item) {
                item.completed = !item.completed;
                renderItems();
                localStorage.setItem('items', JSON.stringify(items));
            }
        });
    }
}
function addItem(text) {
    if (text.trim() === "") {
        alert('Value cannot be empty.');
        return;
    }
    if (text.length < 4) {
        alert('Value must be greater than 3 characters.');
        return;
    }
    if (items.length >= 8) {
        alert('Maximum 8 items are allowed to add in the list.');
        return;
    }
    var newItem = {
        id: items.length + 1,
        text: text,
        completed: false
    };
    items.push(newItem);
    renderItems();
    localStorage.setItem('items', JSON.stringify(items));
}
function deleteItem(id) {
    items = items.filter(function (item) { return item.id !== id; });
    renderItems();
    localStorage.setItem('items', JSON.stringify(items));
}
addItemBtn.addEventListener('click', function () {
    var itemText = itemInput.value.trim();
    addItem(itemText);
    itemInput.value = '';
});
var storedItems = localStorage.getItem('items');
if (storedItems) {
    items = JSON.parse(storedItems);
    renderItems();
}
