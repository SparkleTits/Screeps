let roleBarricader = {

    run: function (creep) {

        if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.working = false;
            creep.say('🔄 loading');
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true;
            creep.say('🚧 build');
        }

        if (!creep.memory.working) {
            let storage = creep.room.storage
            let sources = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store.getUsedCapacity(RESOURCE_ENERGY) > 50});

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
        } else {
            creep.wallRepair();
        }
    }
};

module.exports = roleBarricader;