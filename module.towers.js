module.exports = {

    run: function towers() {
        _.forEach(Game.rooms, function (room) {
            if (room.controller && room.controller.my && room.controller.level >= 3) {
                let towers = room.find(FIND_STRUCTURES, {
                    filter: s => s.structureType === STRUCTURE_TOWER})

                let hostile = room.find(FIND_HOSTILE_CREEPS, {
                    filter: (c) => {
                        return (c.getActiveBodyparts(ATTACK) != 0 || c.getActiveBodyparts(RANGED_ATTACK) != 0 || c.getActiveBodyparts(WORK) != 0)
                    }
                })[0]

                if (hostile) {
                    for (let tower of towers) {
                        tower.attack(hostile)

                        room.visual.text("🚨🚨🚨", tower.pos.x, tower.pos.y + 1, {align: 'left', opacity: 0.8})
                    }
                } else {
                    let logisticStructure = room.find(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType === STRUCTURE_ROAD || s.structureType === STRUCTURE_CONTAINER) && s.hits < s.hitsMax * 0.1
                    })[0]

                    if (logisticStructure) {
                        for (let tower of towers) {
                            if (tower.energy > (tower.energyCapacity * 0.7)) {
                                tower.repair(logisticStructure)

                                room.visual.text("🛠🛠🛠", tower.pos.x, tower.pos.y + 1, {align: 'left', opacity: 0.8})
                            }
                        }
                    } else {
                        let lowRampart = room.find(FIND_MY_STRUCTURES, {
                            filter: s => s.structureType === STRUCTURE_RAMPART && s.hits <= 5000})[0]
                        if (lowRampart) {
                            for (let tower of towers) {
                                if (tower.energy > (tower.energyCapacity * 0.6)) {
                                    tower.repair(lowRampart)

                                    room.visual.text("🛠🛠🛠", tower.pos.x + 1, tower.pos.y, {align: 'left', opacity: 0.8})
                                }
                            }
                        }
                    }
                }
            }
        })
    }
};
