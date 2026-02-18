// console.log("Client side javascript file is loaded... !!!  ");

// fetch('https://api.restful-api.dev/objects?id=3&id=5&id=10').then(response=>{
//     response.json().then(data=>{
//         console.log(data)
//     });
// })

// fetch('http://localhost:3000/weather?address=Bhayander').then(response=>{
//     response.json().then(data=>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data);
//         }
        
//     });
// })
// .catch(error=>{
//     console.log(error)
// })

// fetch('http://localhost:3000/weather?address=!').then(response=>{
//     response.json().then(data=>{
//         console.log(data)
//     });
// })
// .catch(error=>{
//     console.log(error)
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
// message1.textContent = 'From Javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    message1.textContent = "Loading";
message2.textContent = " ";
    const location = search.value;
    console.log(location);
    // fetch('http://localhost:3000/weather?address='+location).then(response=>{
    fetch('/weather?address='+location).then(response=>{
    response.json().then(data=>{
        if(data.error){
            console.log(data.error);
            message1.textContent =data.error; 
        }else{
            console.log(data);
            message1.textContent = data.address;
            message2.textContent =  data.forecast;
        }
        
    });
})
    console.log('Testing');
})