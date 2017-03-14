// import uuid from 'uuid';

function includeJS() {
   document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/node-uuid/1.4.7/uuid.js"></script>');
}

includeJS();

function newTimer(attrs = {}) {
    return {
        title: attrs.title || 'Timer',
        project: attrs.project || 'Project',
        id: uuid.v4(), // eslint-disable-line no-undef
        elapsed: 0
    };
}

function findById(array, id, cb) {
    cb(array.find(el => el.id === id));
}

function renderElapsedString(elapsed, runningSince) {
    let totalElapsed = elapsed;
    if (runningSince) {
        totalElapsed += Date.now() - runningSince;
    }
    return millisecondsToHuman(totalElapsed);
}

function millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    return [
        pad(hours.toString(), 2),
        pad(minutes.toString(), 2),
        pad(seconds.toString(), 2)
    ].join(':');

}

function pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = '0' + padded;
    return padded;
}

// export {
//     millisecondsToHuman: millisecondsToHuman,
//     newTimer: newTimer,
//     findById: findById,
//     renderElapsedString: renderElapsedString
// };