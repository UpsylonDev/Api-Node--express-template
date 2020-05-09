self.addEventListener('push', e => {
    const data = e.data.json() ;
    console.log('push reçu');

    self.registration.showNotification(data.title, {
        body: 'Cool from memorio !',
        icon : ''
    })
    
});