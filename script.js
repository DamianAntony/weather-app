const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "522c6bad8d7150876604ce940a316e30" //

weatherForm.addEventListener("submit", async(event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try{
    const weatherdata = await getWeatherdata(city);
    displayWeatherInfo(weatherdata);
    }
    catch(error){
      displayError(error);
      console.error(error);

    }

  } else {
    displayError("Enter a city name");
  }

});
async function getWeatherdata(city) {
apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
const response = await fetch(apiUrl);
console.log(response);
if(!response.ok){
 throw new Error("invalid weather data")
}
  return await response.json();


}
function displayWeatherInfo(data){
  console.log(data);
  const {name:city, 
        main:{temp,humidity},
       weather:[{description,id}]}= data;
       card.textContent="";
       card.style.display="flex"
       cityInput.textContent="";
 const cityName= document.createElement('h1');
 cityName.classList.add("cityName");
  // Using Font Awesome icon
  const locationIcon = document.createElement("i");
  locationIcon.classList.add("fas", "fa-location-dot");

  // Append icon and city name
  cityName.appendChild(locationIcon);
  cityName.append(` ${city}`);
 card.appendChild(cityName);
 locationIcon.style.color="#232108da";
 locationIcon.style.fontSize="1.5rem"

 const temperature= document.createElement('p');
 temperature.classList.add('temperature');
 
 
 const temperatureIcon =document.createElement("i");
 temperatureIcon.classList.add("fa-solid","fa-temperature-three-quarters");
 temperature.appendChild(temperatureIcon)
 temperature.append(`${(temp-273.15).toFixed(1)}°C`);
 temperatureIcon.style.padding="5px"
 card.appendChild(temperature);



 const humidityDisplay= document.createElement('p');
 humidityDisplay.classList.add('humidity');
 humidityDisplay.textContent=`humidity:${humidity}%`;
 card.appendChild(humidityDisplay);

 const weatherDescription= document.createElement('p');
 weatherDescription.classList.add('weatherDescription');
 weatherDescription.textContent=`${description}`;
 card.appendChild(weatherDescription);
 const weatherEmoji= document.createElement('p');
 weatherEmoji.classList.add('weatherEmoji');
 weatherEmoji.textContent=getweatherEmoji(id);
 card.appendChild(weatherEmoji);


}
function getweatherEmoji(id){
  switch(true){
    case(id>200&&id<300):
    return "⛈️";
    
    case(id>=300&& id<500):
    return "🌦️";
    case(id>=500&& id< 701):
    return "❄️";
    case(id>=701 && id<800):
    return "🌨️";
    case(id===800):
      return "☀️";
    case(id>=801):
    return "☁️";
    default:
      return "❓";
  }
 

}
function displayError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add('errorMesssage');
  card.textContent = ""
  card.style.display = "flex";
  card.appendChild(errorMessage)

}