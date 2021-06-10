let roleTransport = {

    run: function (creep, spawn) {

        creep.checkIfFull()

        // PICK UP RESOURCES
        let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (s) => s.resourceType === RESOURCE_ENERGY && s.energy >= creep.store.getCapacity()
        })

        if (droppedEnergy[0] && creep.memory.isFull === false) {
            creep.memory.pickingUp = true
            creep.pickupResources()
        } else {
            creep.memory.pickingUp = false
        }

        // HAUL FROM STORAGE TO SPAWN / EXTENSIONS or TOWER
        if (creep.memory.pickingUp === false) {
            if (creep.memory.isFull === false && creep.room.storage.store[RESOURCE_ENERGY] > 0) {
                if (creep.room.energyAvailable < (creep.room.energyCapacityAvailable * 0.99)) {
                    creep.memory.hauling = true
                    creep.hauling()
                } else {
                    let tower = this.room.find(FIND_STRUCTURES, {
                        filter: (s) => s.structureType === STRUCTURE_TOWER
                    })
                    if (tower.energy < (tower.energyCapacity * 0.75)) {
                        creep.memory.hauling = true
                        creep.hauling()
                    }
                }
            }
        }

        if (creep.memory.hauling === false && creep.memory.pickingUp === false && creep.memory.isFull === false) {

                let sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] >= 200});

                if (creep.withdraw(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {

                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffcc00'}});

            }
        } else if (creep.memory.pickingUp === false) {
            if (creep.memory.hauling === true && creep.memory.isFull === true) {
                let targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {

                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});

                }

            } else {
                let targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {

                        return (structure.structureType === STRUCTURE_TOWER || structure.structureType === STRUCTURE_STORAGE || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (creep.transfer(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {

                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});

                }
            }
        }
    }
}

module.exports = roleTransport;