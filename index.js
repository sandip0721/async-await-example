var randomWordUri = 'https://random-word-api.herokuapp.com/word?number=1';

var gifyApiKey = 'rf72tc2pB5ctlSVEZ0GTgTjYKfEMSzjD';

var giphyUri = 'https://api.giphy.com/v1/gifs/search?api_key=';

var title;



// fetch(randomWordUri).then((response) => {
//     return response.json();
// }).then((result) => {
//     console.log(result[0])
//     title = result[0];
//     return fetch(giphyUri + gifyApiKey + '&q=' + result[0] + '&limit=5&offset=0&rating=g&lang=en')
// }).then((gifyResponse) => {
//     return gifyResponse.json()
// }).then((gifyResult) => {
//     console.log('gifyResult', gifyResult.data);

//     let data = gifyResult.data;

//     var container = document.createElement('div');
//     container.setAttribute('class', 'container');

//     var row = document.createElement('div');
//     row.setAttribute('class', 'row');

//     data.forEach(element => {
//         row.append(countryCard(element.images.original, title))
//     });

//     container.append(row);

//     document.body.append(container)


// })
//     .catch((err) => {
//         console.error(err)
//     });



//function to create cards for Gifs

function countryCard(obj, title) {
    let outerDiv = document.createElement('div');
    outerDiv.setAttribute('class', 'col-12 col-md-6 col-lg-4 col-sm-12 align-bottom');
    outerDiv.style = 'height:412px;'

    let card = document.createElement('div')
    card.setAttribute('class', 'card rounded');
    card.style = ' height: 99%;'

    let cardHeader = document.createElement('div')
    cardHeader.setAttribute('class', 'card-header text-center bg-dark text-light');
    cardHeader.innerHTML = title;


    obj.images

    let cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body text-center rounded');

    let cardImage = document.createElement('video');
    cardImage.setAttribute('loop', true);
    cardImage.setAttribute('autoplay', true);
    let imageSource = document.createElement('source');
    imageSource.src = obj.mp4;
    imageSource.type = 'video/mp4';
    // cardImage.setAttribute('class', 'card-img-top img-fluid');
    cardImage.append(imageSource);

    cardBody.append(cardImage);

    let pTag = document.createElement('p')
    pTag.setAttribute('class', 'card-text');


    let tempDiv = document.createElement('div')
    tempDiv.setAttribute('class', 'col-lg-4 col-sm-12 text-center pt-1');
    tempDiv.innerText = 'Size: ' + obj.height + 'x' + obj.width;



    pTag.append(tempDiv);

    cardBody.append(pTag);

    card.append(cardHeader, cardBody);

    outerDiv.append(card);

    return outerDiv;

}


async function getword() {
    let word = await fetch(randomWordUri);
    let data = await word.json();
    console.log(data);
    let images = await fetch(giphyUri + gifyApiKey + '&q=' + data[0] + '&limit=5&offset=0&rating=g&lang=en');
    let imagesData = await images.json();
    console.log(imagesData.data);

    let result = imagesData.data;
    try {
        var container = document.createElement('div');
        container.setAttribute('class', 'container');

        var row = document.createElement('div');
        row.setAttribute('class', 'row');

        result.forEach(element => {
            row.append(countryCard(element.images.original, data[0]))
        });

        container.append(row);

        document.body.append(container)
    } catch (err) {
        console.log(err);
    }


}

getword();