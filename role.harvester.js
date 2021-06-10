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
