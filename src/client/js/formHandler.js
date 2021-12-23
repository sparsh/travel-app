import StringConstants from "./string";

const WAB_API_KEY = "32c53909dc1b4747bdd9b82007023d07";
const GEO_NAME_USERNAME = "sparshgr8";
const PB_API_KEY = "24954901-1c550521e17ef111e9e85a22d";


/**
 * get whether data using lat and long
 * returns promise
 * @param {*} lat  : latitiude
 * @param {*} long : longitude
 */

const getWeatherData = (lat, long) => {
const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${WAB_API_KEY}`;
return fetch(url).then(response => response.json());
}

/**
 * get photos of city
 * @param {*} city : name of city
 * returns promise
 */
const getPlacePhotos = (city) => {
    const url = `https://pixabay.com/api/?key=${PB_API_KEY}&q=${city}&per_page={8}`;
    return fetch(url).then(response => response.json());
}

/**
 * Funciton to get Lat/long 
 * returns promise
 */
const getCoordinates = (city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GEO_NAME_USERNAME}`;
    return fetch(url).then(response => response.json());
}


const updateUI = (data, from , to) => {
const travelList =  document.getElementById("travel-list");
    data.forEach(item => {
        const travelItem = document.createElement("div");
        travelItem.className = "travel-item";
    
        const image = document.createElement("img");
        image.src = item.image
        travelItem.appendChild(image);
        const title =  document.createElement("div");
        title.className = "title";

        const titleText = document.createTextNode(`Your Trip From ${from} to ${to} Departure Date: ${item.date}`);
        const h2 = document.createElement('h2');
        h2.appendChild(titleText);
        title.appendChild(h2);

        travelItem.appendChild(title);
        const mid = document.createElement("div");
        mid.className = "mid";

        const saveItem = document.createElement("button");
        saveItem.appendChild(document.createTextNode("Save Item"))

        mid.appendChild(saveItem);

        const removeItem = document.createElement("button");
        removeItem.appendChild(document.createTextNode("Remove Item"))


        mid.appendChild(removeItem);


        travelItem.appendChild(mid);
        const description = document.createElement('div');
        description.className = "description";
        const h3 = document.createElement('h3');
        const descriptionText = `${to} is 300 km away, Mostly cloudy throught the day`;
        h3.appendChild(document.createTextNode(descriptionText));
        description.appendChild(h3);
        
        travelItem.appendChild(description);

        travelList.appendChild(travelItem);
    })
    

}


/**
 * Brain of whole application, manages all async functions.
 * @param {*} from : Place travelling from
 * @param {*} to : plave travelling to
 * @param {*} date : date of travel
 */
const getTravelData = (from, to, date) => {
    const travelData = [];
    try{
        getCoordinates(to).then(coordinates => {
            console.log("The cords are", coordinates);
            const geoNames = coordinates.geonames;
            if(Array.isArray(geoNames) && geoNames.length > 0) {
                const lat = geoNames[0].lat;
                const long = geoNames[0].lng;
                console.log("lat long are", lat, long);
                getWeatherData(lat, long).then(weatherInfo => {
                    console.log("weather info is ", weatherInfo);
                    const weatherData = weatherInfo.data;
                    if(Array.isArray(weatherData) && weatherData.length > 0) {
                        console.log("weather data is ", weatherData);
                        getPlacePhotos(to).then((photoResponse = {}) => {
                            const hits = photoResponse.hits;
                            if(Array.isArray(hits) && hits.length > 0) {
                                console.log("the hits are", hits);
                                const data = hits.map(item => ({
                                    image: item.webformatURL,
                                    weatherInfo : weatherData[0].weather.description,
                                    date: date
                                }));
                               updateUI(data, from, to);
                            }
                        })
                    }
                })
            }
        });
    }
    catch(error) {
        console.log("the error is ", error);
    }
}



const handleSubmit = () => {

    const errorElement = document.getElementById("error");
    errorElement.innerText = ""
    const fromPlace = document.getElementById("from").value;
    const toPlace = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    let error = "";
    console.log("Fro", fromPlace, toPlace, date)
    if(!fromPlace) {
        error = StringConstants.emptyFrom;
    }
    else if(!toPlace) {
        error = StringConstants.emptyDestination;
    }
    else if (!date) {
        error = StringConstants.emptyDate;
    }
    else {
        getTravelData(fromPlace, toPlace, date);
    }

    if(error) {
        errorElement.innerText = error;
    }
}

export { handleSubmit }
