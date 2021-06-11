let roleTransport = {

    run: function (creep) {

        creep.checkIfFull()


        let spawnEnergyCapacity = 0.99
        let towerEnergyCapacity = 0.75

        let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (s) => s.resourceType === RESOURCE_ENERGY
        })
        let spawnAndExtensions = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        })
        let closestTower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < (s.store.getCapacity(RESOURCE_ENERGY) * towerEnergyCapacity)
        })



        if ((creep.room.energyAvailable < (creep.room.energyCapacityAvailable * spawnEnergyCapacity) || closestTower) && creep.room.storage.store[RESOURCE_ENERGY] > 0) {
            creep.memory.hauling = true
        } else {
            creep.memory.hauling = false
        }

        // PICK UP RESOURCES
        if (droppedEnergy[0] && creep.memory.hauling === false) {
            creep.memory.pickingUp = true
        } else {
            creep.memory.pickingUp = false
        }


        if (closestTower) {
            console.log(closestTower.store.getUsedCapacity(RESOURCE_ENERGY))
        }


        if (creep.memory.pickingUp === true) {
            creep.pickupResources()
            if (creep.room.storage && creep.memory.isFull) {
                if (creep.pos.isNearTo(creep.room.storage)) {
                    creep.transfer(creep.room.storage, RESOURCE_ENERGY)
                } else {
                    creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}})
                }
            } else if (!creep.room.storage && creep.memory.isFull) {
                if (creep.pos.isNearTo(spawnAndExtensions)) {
                    creep.transfer(spawnAndExtensions, RESOURCE_ENERGY)
                } else {
                    creep.moveTo(spawnAndExtensions, {visualizePathStyle: {stroke: '#ffffff'}})
                }
            }
        }


        if (creep.memory.hauling === true) {
            if (creep.room.storage.store[RESOURCE_ENERGY] > 0) {
                if (creep.room.energyAvailable < (creep.room.energyCapacityAvailable * spawnEnergyCapacity)) {
                    if (creep.memory.isFull === false) {
                        creep.hauling()
                    } else if (creep.store.getCapacity(RESOURCE_ENERGY) > 0) {
                        if (creep.pos.isNearTo(spawnAndExtensions)) {
                            creep.transfer(spawnAndExtensions, RESOURCE_ENERGY)
                        } else {
                            creep.moveTo(spawnAndExtensions, {visualizePathStyle: {stroke: '#ffffff'}})
                        }
                    }
                } else if (closestTower) {
                    if (creep.memory.isFull === false) {
                        creep.hauling()
                    } else if (creep.store.getCapacity(RESOURCE_ENERGY) > 0) {
                        if (creep.pos.isNearTo(closestTower)) {
                            creep.transfer(closestTower, RESOURCE_ENERGY)
                        } else {
                            creep.moveTo(closestTower, {visualizePathStyle: {stroke: '#ffffff'}})
                        }
                    }
                }
            }
        }


        if (creep.memory.hauling === false && creep.memory.pickingUp === false) {
            if (creep.memory.isFull === false) {
                let containers = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] >= 200});

                if (creep.pos.isNearTo(containers)) {
                    creep.withdraw(containers, RESOURCE_ENERGY)
                } else {
                    creep.moveTo(containers, {visualizePathStyle: {stroke: '#ffcc00'}});
                }
            } else {
                if (creep.room.storage) {
                    if (creep.pos.isNearTo(creep.room.storage)) {
                        creep.transfer(creep.room.storage, RESOURCE_ENERGY)
                    } else {
                        creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}})
                    }
                } else if (!creep.room.storage) {
                    if (creep.pos.isNearTo(spawnAndExtensions)) {
                        creep.transfer(spawnAndExtensions, RESOURCE_ENERGY)
                    } else {
                        creep.moveTo(spawnAndExtensions, {visualizePathStyle: {stroke: '#ffffff'}})
                    }
                }
            }
        }
    }
}

module.exports = roleTransport;