const publicVapidKey = 'BJcrAguT-qzScfaVCSJrJhgLpHGll48aiXjGyPIZrZtYplFjI2F56NFkAVC_qrph67A5qsrJQ8gl9bIjFVdmwa8';

// verifier la presence du service worker
if ('serviceWorker' in navigator) {
    send().catch((err)=> console.log(err));
};

async function send() {
    console.log('reritering s worker')
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope:'/'
    }); 
    
    console.log('service enregistré ')

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey: urlBase64ToUint8Array('publicVapidKey')
    })

    console.log('notif entrergistrée  ! ')
    
    await fetch('/subscribe', {
        method : 'POST',
        body : JSON.stringify(subscription),
        headers : {
            'content-type' : 'application/json'
        }
    });
    
    console.log('push envoyé !!!')
    
    
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }