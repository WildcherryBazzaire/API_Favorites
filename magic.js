console.log('linked');

const cardContainer = document.querySelector('#cardContainer');
const searchData = document.querySelector('#searchBar');
const searchContainer = document.querySelector('#searchContainer')
const exitButton = document.querySelector('#exitButton');
const RickAndMortyApi = 'https://rickandmortyapi.com/api/character/';

var data; //where all JSON will be

function Cards(apiLink,appendTo) {
    let request = new XMLHttpRequest(); //assigns a new XMLHttpRequest object 

    //open new connection, using GET to get url endpoint
    request.open('GET',apiLink,true);

    //when request is loaded 
    request.onload = function() {
        //JSON Stuff Here
        let data = JSON.parse(this.response); //gets the the JSON and converts it to an array, so data=[];

        //console logs the data
        data.results.map(cur => {
           // console.log(cur); //all the characters from rick and morty out of 1 page

            const actualCard = document.createElement('div'); //creates the card
            actualCard.classList.add('card');

            actualCard.innerHTML = templateBuilder('RickMorty',cur);

            let tempStatus = actualCard.getElementsByClassName('status')[0]; //gets their status

            actualCard.getElementsByClassName('profileImage')[0].style.backgroundImage = `url('${cur.image}')`; //adds image to background

            cur.status === 'Dead' ? tempStatus.style.color = 'red' : tempStatus.style.color = 'green';

            return appendTo.appendChild(actualCard);

        });
    }
    //Send request to website
    request.send();
}

function templateBuilder(templateOption,loopedElement) {
    
    if(templateOption === 'RickMorty') {
        return `
                <p class='name'>${loopedElement.name}</p>

                <div class='profileImage'> 
                    <p class='status'>${loopedElement.status}</p>
                </div> 

                <p class='origin'>${loopedElement.origin.name}</p>
                <p class='race'>${loopedElement.species}</p>
            `
    }
}

function clearDiv(div) {
    console.log(div.childNodes.length);
    while(div.firstChild) {
        div.removeChild(div.lastChild);
    }
}

function Search() {
    if(searchData.value !== ' ') {
        clearDiv(searchContainer);
        exitButton.style.display = 'inline-block';
        cardContainer.style.display = 'none';
        searchContainer.style.display = 'inline-flex';
        //console.log(RickAndMortyApi + searchData.value.toLowerCase());
        Cards(RickAndMortyApi + `?name=${searchData.value.toLowerCase()}`,searchContainer);
    }
}

function exitSearch() {
    exitButton.style.display = 'none';
    searchContainer.style.display = 'none';
    cardContainer.style.display = 'inline-flex';
}

Cards(RickAndMortyApi + `?page=${Math.floor(Math.random() * 25)}`,cardContainer)

// will appear undefined cause JS is asymetrical and will run this before the onload; UPDATE *Moving Everything in a function *

//Tianmen Mountain cave, China

//strech goal: put all functions in a class or use a instance of a class for something