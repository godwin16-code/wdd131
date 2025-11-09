const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// const li = document.createElement('p');
// const deleteButton = document.createElement('button');

// li.textContent = input.value;

// deleteButton.textContent = '❌';

// li.append(deleteButton);

// list.append(li);

button.addEventListener("click", function() {
    if (input.value.trim() === '') {
        alert("Please enter a chapter")
        input.focus();
        return;
    };

    const li = document.createElement('p');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;

    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete')

    li.appendChild(deleteButton);

    list.appendChild(li);

    input.value = '';
    input.focus();

});

list.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.parentElement;
        list.removeChild(li);
        input.focus();
    }
});