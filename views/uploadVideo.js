const form = document.getElementById('updateVideo');
const movieName = document.getElementById('movieTitle');
const movieYear = document.getElementById('movieYear');
const movieRating = document.getElementById('movieRating');
const movieId = document.getElementById('movieId');
alert('working');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(movieName.value + ' will be Updated once you click OK');

    fetch(`http://localhost:3004/updatevideo/${+movieId.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: movieId.value, name: movieName.value, year: movieYear.value, rating: movieRating.value})
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.sucess)
        data.sucess ? window.location.href = `http://localhost:3004/` : alert('Update Movie Failed')
    })
    .catch(err => {
        console.log(err);
        alert('Update Movie Failed');
    });
})