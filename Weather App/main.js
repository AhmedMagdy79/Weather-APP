wrapper = document.querySelector('.wrapper');
inputPart = document.querySelector('.input-part');
infoText = document.querySelector('.info-text');
inputField = document.querySelector('input');
locationBtn = document.querySelector('button');
icon=document.querySelector('img')
backBtn= document.querySelector('header i')
let api;
let apiKey = `88b5195b7695a247d082b59cf6433898`

locationBtn.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }else{
        alert('Your browser not supp geo loc api')
    }
})

function onSuccess(pos){
    // console.log(pos)
    const lat=pos.coords.latitude;
    const long =pos.coords.longitude;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
    fetchData()
}

function onError(err){
    infoText.innerHTML= err.message
    infoText.classList.add("error")
}


inputField.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter' && inputField.value !=""){
        requestApi(inputField.value);
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    fetchData()
}

function fetchData(){
    infoText.innerHTML="getting weather details"
    infoText.classList.add("pending")
    fetch(api).then(response=> response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info){
    if(info.cod=="404"){
        infoText.classList.replace('pending','error');
        infoText.innerHTML=`${inputField.value} isn't valid city name`
    }else{
        city = info.name
        country= info.sys.country
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        if(id==800){
            icon.src="Weather Icons/clear.svg"
        }else if(id >=200 && id<=232){
            icon.src="Weather Icons/storm.svg"
        }else if(id >=600 && id<=622){
            icon.src="Weather Icons/snow.svg"
        }else if(id >=701 && id<=781){
            icon.src="Weather Icons/haze.svg"
        }else if(id >=801 && id<=804){
            icon.src="Weather Icons/cloud.svg"
        }else if((id >=300 && id<=321) || (id >=500 && id<=531)){
            icon.src="Weather Icons/rain.svg"
        }
        
        wrapper.querySelector('.temp .numb').innerHTML = Math.floor(temp);
        wrapper.querySelector('.weather').innerHTML = description;
        wrapper.querySelector('.location span').innerHTML = `${city}, ${country}`;
        wrapper.querySelector('.temp .numb-2').innerHTML = Math.floor(feels_like);
        wrapper.querySelector('.humidity span').innerHTML =`${humidity}%`;

        infoText.classList.remove("pending","error")
        wrapper.classList.add("active");
        // console.log(info);
    }
}


backBtn.addEventListener('click',()=>{
    wrapper.classList.remove("active");
})