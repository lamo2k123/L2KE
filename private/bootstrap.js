"use strict";

var os      = require('os'),
    cluster = require('cluster');

if(os.platform() !== 'linux') {
    console.log('Sorry, need linux platform! :(');
    process.exit(0);
}

if(cluster.isMaster) {
    let cpus = os.cpus().length;

    for(let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
    });
} else {
    require('./app');
}