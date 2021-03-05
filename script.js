const searchInputTxt = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const songResult = document.getElementById('song-result')

// add event listener

searchBtn.addEventListener('click', searchSong);


// get song search 
function searchSong(e) {
    e.preventDefault()

    const term = searchInputTxt.value;
    // check empty 
    if (term.trim()) {
        fetch(`https://api.lyrics.ovh/suggest/:${term}`)
        .then(response => response.json())
        .then(data =>{
            let html = "";
            if (data.data) {
                data.data.forEach(song => {
                    html += `
                    <div class="single-result row align-items-center my-3 p-3" data-id="${song.id}">
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <p class="author lead">Album by <span>${song.artist.name}</span></p>
                            <audio controls>
                                <source src="${song.preview}" type="audio/mpeg">
                            </audio>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                        </div>
                    </div>
                    `;
                });
            } else {

            }
            songResult.innerHTML = html;
        })
    }
    
}

const getLyric = (artist, title) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = lyrics => {
    const lyricDive = document.getElementById('lyrics-content');
    lyricDive.innerText = lyrics ;
}