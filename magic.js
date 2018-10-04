console.log('linked');

const cardContainer = document.querySelector('#cardContainer');
var cardData = [];
var randomPageMorty = '?page=' + Math.floor(Math.random() * 25);

var request = new XMLHttpRequest(); //assigns a new XMLHttpRequest object 
var data; //where all JSON will be

//open new connection, using GET to get url endpoint
request.open('GET',`https://rickandmortyapi.com/api/character/${randomPageMorty}`,true);

//when request is loaded 
request.onload = function() {
    //JSON Stuff Here
    data = JSON.parse(this.response); //gets the the JSON and converts it to an array, so data=[];

    //console logs the data
    data.results.forEach(cur => {
        console.log(cur); //all the characters from rick and morty out of 1 page

        const actualCard = document.createElement('div'); //creates the card
        actualCard.classList.add('card');

        actualCard.innerHTML = `
            <p class='name'>${cur.name}</p>

            <div class='profileImage'> 
                <p class='status'>${cur.status}</p>
            </div> 

            <p class='origin'>${cur.origin.name}</p>
            <p class='race'>${cur.species}</p>
        `;

        var tempStatus = actualCard.getElementsByClassName('status')[0]; //gets their status

        actualCard.getElementsByClassName('profileImage')[0].style.backgroundImage = `url('${cur.image}')`; //adds image to background

        cur.status === 'Dead' ? tempStatus.style.color = 'red' : tempStatus.style.color = 'green';

        cardContainer.appendChild(actualCard);
        
        cardData.push(cardContainer); //data for cards

    });
}

//Send request to website
request.send();

console.log(data); // will appear undefined cause JS is asymetrical and will run this before the onload