//var roomDefense = require('rooms.defense');
//var spawning = require('rooms.spawning');

/*
function identifySources(room) {
    let sources = room.find(FIND_SOURCES);
    room.memory.resources = {};
    _.forEach(sources, function(source) {
        let data = _.get(room.memory, ['resources', room.name, 'energy', source.id]);
        if (data === undefined) {
            _.set(room.memory, ['resources', room.name, 'energy', source.id], {})
        }
    })
    console.log(sources);
}

function rooms() {
    _.forEach(Game.rooms, function(room) {
        if (room.controller && room.controller.my && room.controller.level >= 1) {
            //spawning(room);
            //roomDefense(room);
            if (Game.time % 100 == 0) {
                identifySources(room);
            }
        }
    })
}

 */

module.exports = rooms;