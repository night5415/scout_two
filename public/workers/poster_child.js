onmessage = function (e) {
    switch (e.data) {
        case 'war':
            reply(e.data, 'for the Horde!');
            break;

        default:
            break;
    }
}

function reply(listener, args) {
    const eventAwesome = new CustomEvent('awesome', {
        bubbles: true,
        detail: { text: 'hello', isNew: true, howMany: 15 }
    });
    console.log('sending awesome event!');
    self.dispatchEvent(eventAwesome);
}