let roleUpgrader = {
    
    run: function (creep) {

        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🚧 filling');
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
            creep.say('🔄 upgrade');
        }

        if (!creep.memory.working) {
            let storage = creep.room.storage
            let sources = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (struct) => struct.structureType === STRUCTURE_EXTENSION || struct.structureType === STRUCTURE_SPAWN});

            if (storage) {
                var storageEnergy = storage.store[RESOURCE_ENERGY]
            } else {
                var storageEnergy = 0
            }

            if (storageEnergy !== 0) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffcc00'}});
                }
            } else {
                if (creep.withdraw(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffcc00'}});
                }
            }

        } else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}


module.exports = roleUpgrader;