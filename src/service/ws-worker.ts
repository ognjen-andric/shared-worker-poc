class WebsocketWorker extends SharedWorker{
    constructor(){
        if (typeof(window.SharedWorker) === 'undefined') {
            throw("Your browser does not support SharedWorkers");
            //Fallback to default behavior currently implemented maybe?
        }
        super('./shared-worker.js');
    }
}

const worker = new WebsocketWorker();

export {worker as WebsocketWorker};