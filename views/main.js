const deleteButton = document.getElementById('deleteMovie');
const movieName = document.getElementById('movieName');
const movieId = document.getElementById('movieId');

deleteButton.addEventListener('click', () => {
    alert(movieName.innerText + ' will be deleted once you click OK');
    
    fetch(`http://localhost:3004/delete/${movieId.innerText}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        data === 'success' ? window.location.href = 'http://localhost:3004/': alert('Delete Movie Failed')
    })
    .catch(err => {
        console.log(err);
        alert('Delete Movie Failed');
    })
})

















// const deleteButton = document.getElementById('deleteMovie');
// const movieName = document.getElementById('movieName');
// const movieId = document.getElementById('movieId');


// deleteButton.addEventListener('click', () => {
//     alert(movieName.innerText + ' will be deleted once you click OK');

//     fetch(`http://localhost:3004/delete/${movieId.innerText}`, {
//         method: 'DELETE'
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         data === 'success' ? window.location.href = `http://localhost:3004/` : alert('Delete Movie Failed')
//     })
//     .catch(err => {
//         console.log(err);
//         alert('Delete Movie Failed');
//     });
// })