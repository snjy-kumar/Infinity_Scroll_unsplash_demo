const imageContainer = document.getElementById("imageContainer");
const loader = document.getElementById("loader");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



//Unsplash API

const count = 30;
const apiKey = '2rffzdUxhAZURdRManBLZP-d7No2pnp4b_CAMKP2-iw';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;



//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;

    }
}


//Helper Function to Set Attributes on DOM Elements

function setAttribute(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}





//Create Elements for links & photos Add to DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash

        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');


        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //Even Listener, check when each is finished loading

        img.addEventListener('load',imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get photo from Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        //Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})


//On load

getPhotos();