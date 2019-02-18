onmessage = function (e) {
    switch (e.data) {
        case 'war':
            reply(e.data, 'for the Horde!');
            break;

        default:
            break;
    }
}
/**
 * This adds an event that can be listened to on the main thread!!
 */
function reply(listener, args) {
    postMessage({ 'queryMethodListener': listener, 'queryMethodArguments': args });
}