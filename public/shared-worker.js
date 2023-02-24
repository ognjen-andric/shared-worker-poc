var currentState = 0;
console.log('SharedWorker started :)');
var ports = [];
setInterval(() => {
    currentState++;
    console.log('Number of active connections to SharedWorker : '+ports.length);
    if(ports.length === 0) return;
    ports.forEach(port => {
        port.postMessage({
        type: 'wsMessage',
        payload: currentState
    });
    })
}, 1000);

onconnect = (event) => {
    const port = event.ports[0];
    ports.push(port);

    port.onmessage = (event) => {
        const {data} = event;
        console.log('Received data from a client.');
        console.log(data);
        console.log('Sending data to WS server...');
        if(data.event === "incrementGlobalCounter") currentState += data.payload;
    }
}

ondisconnect = (e) => {
    console.log('Disconnected');
}

/**
 * This is really badly written code, its just PoC to explore posibilities.
 */

