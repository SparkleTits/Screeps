module.exports = {
    run: function constants() {

        _.forEach(Game.rooms, function (room) {
            if (room.controller && room.controller.my && room.controller.level >= 0) {

                spawns()
                containers()
                sources()


                function spawns() {
                    let spawns = room.find(FIND_MY_SPAWNS)

                    sortedSpawns = []

                    for (let spawn of spawns) {
                        sortedSpawns.push(spawn.id)
                    }
                    room.memory.spawns = sortedSpawns
                }

                function containers() {
                    let containers = room.find(FIND_STRUCTURES, {
                        filter: (s) => s.structureType === STRUCTURE_CONTAINER
                    })

                    for (let container of containers) {
                        let source1 = Game.getObjectById(room.memory.source1)
                        let source2 = Game.getObjectById(room.memory.source2)

                        sourceContainer1 = Game.getObjectById(room.memory.sourceContainer1)
                        sourceContainer2 = Game.getObjectById(room.memory.sourceContainer2)

                        if (sourceContainer1 == null && source1 && container.pos.inRangeTo(source1, 1)) {
                            room.memory.sourceContainer1 = container.id
                        } else if (sourceContainer2 == null && source2 && container.pos.inRangeTo(source2, 1)) {
                            room.memory.sourceContainer2 = container.id
                        }
                    }

                }

                function sources() {
                    let sources = room.find(FIND_SOURCES)

                    let source1 = Game.getObjectById(room.memory.source1)
                    let source2 = Game.getObjectById(room.memory.source2)

                    if (source1 == null) {
                        room.memory.source1 = sources[0].id
                    } else if (source2 == null) {
                        room.memory.source2 = sources[1].id
                    }
                }
            }
        })
    }
}