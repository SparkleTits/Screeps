let roleHarvester = {

    run: function (creep) {
        if (creep.memory.role === "harvester1") {
            let sourceContainer1 = Game.getObjectById(creep.room.memory.sourceContainer1)
            let source1 = Game.getObjectById(creep.room.memory.source1)

            if (sourceContainer1 != null && source1 != null) {
                if (creep.pos.inRangeTo(sourceContainer1, 0)) {
                    creep.harvest(source1)
                } else {
                    creep.moveTo(sourceContainer1)
                }
            } else if (source1 != null) {
                if (creep.pos.inRangeTo(source1, 1)) {
                    creep.harvest(source1)
                } else {
                    creep.moveTo(source1)
                }
            }
        }

        if (creep.memory.role === "harvester2") {
            let sourceContainer2 = Game.getObjectById(creep.room.memory.sourceContainer2)
            let source2 = Game.getObjectById(creep.room.memory.source2)

            if (sourceContainer2 != null && source2 != null) {
                if (creep.pos.inRangeTo(sourceContainer2, 0)) {
                    creep.harvest(source2)
                } else {
                    creep.moveTo(sourceContainer2)
                }
            } else if (source2 != null) {
                if (creep.pos.inRangeTo(source2, 1)) {
                    creep.harvest(source2)
                } else {
                    creep.moveTo(source2)
                }
            }
        }
    }
};

module.exports = roleHarvester;



/*
let roleHarvester = {

    run: function (creep) {

        creep.checkIfFull();

        if (!creep.memory.working && !creep.memory.isFull) {
            creep.memory.working = true;
            creep.say('🔄 harvest');
        }
        if (creep.memory.working && creep.memory.isFull) {
            creep.memory.working = false;
            creep.say('🚧 deposit');
        }

        if (!creep.memory.working) {

            let targets = creep.room.find(FIND_STRUCTURES);
            targets = _.filter(targets, function (struct) {
                return (struct.structureType === STRUCTURE_CONTAINER || struct.structureType === STRUCTURE_STORAGE || struct.structureType === STRUCTURE_TOWER || struct.structureType === STRUCTURE_EXTENSION || struct.structureType === STRUCTURE_SPAWN) && struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            });
            if (targets.length) {
                let target = creep.pos.findClosestByPath(targets);

                if (creep.pos.isNearTo(target)) {
                    creep.transfer(target, RESOURCE_ENERGY);
                } else {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffcc00'}});
                }
            }
        } else {
            creep.harvestEnergy();
        }
    }
};

module.exports = roleHarvester;
 */
