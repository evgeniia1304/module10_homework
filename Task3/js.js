const input = document.querySelector('.inputMessage');
const btnMess = document.querySelector('.btnPushMessage');
const btnGeo = document.querySelector('.btnGeo-location');
const userMessages = document.querySelector('.user-messages');
const wrapperChat =  document.querySelector('.wrapper-chat');


function addMessage(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
    userMessages.innerHTML += element;
    wrapperChat.scrollTop = wrapperChat.scrollHeight;
  }

 let websocket = new WebSocket('wss://echo-ws-service.herokuapp.com'); 
    
      websocket.onopen = function() {
          console.log("CONNECTED");
    };
      websocket.onmessage = function(evt) {
        addMessage(`ответ сервера: ${evt.data}`, 'flex-start');
    };
      websocket.onerror = function(evt) {
        addMessage(`server: ${evt.data}`, 'flex-start');
    };
  
  btnMess.addEventListener('click', () => {
      let message = input.value;
          websocket.send(message);
          addMessage(message);
          input.value = ''
  });

const error = () => {
    let textErr0r = 'Невозможно получить ваше местоположение';
    addMessage(textErr0r);
  };
  
  const success = (position) => {
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;
      let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      addMessage(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
    };
  
  btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
      console.log('Geo-location не поддерживается вашим браузером');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });

