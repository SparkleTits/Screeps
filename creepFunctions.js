

Creep.prototype.buildSites = function buildSites() {
    let sites = this.room.find(FIND_CONSTRUCTION_SITES);

    if (sites.length) {
        let prioritySites = this.room.find(FIND_CONSTRUCTION_SITES, {filter: (i) => /*i.structureType === STRUCTURE_RAMPART ||*/ i.structureType === STRUCTURE_ROAD || i.structureType === STRUCTURE_CONTAINER});
        let site = this.pos.findClosestByRange(sites);

        if (prioritySites.length) {
            let prioritysite = this.pos.findClosestByRange(prioritySites);

            if (this.build(prioritysite) === ERR_NOT_IN_RANGE) {
                this.moveTo(prioritysite, {visualizePathStyle: {stroke: '#ffffff'}})
            }
        } else if (!prioritySites.length) {
            if (this.build(site) === ERR_NOT_IN_RANGE) {
                this.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}})
            }
        }
    }
}


Creep.prototype.wallRepair = function wallRepair() {
    let sites = this.room.find(FIND_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) && s.hits <= 25000
    });

    if (sites.length) {
        let site = this.pos.findClosestByRange(sites);

        if (this.repair(site) === ERR_NOT_IN_RANGE) {
            this.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}})
        }
    }
}


Creep.prototype.pickupResources = function (pickupResources) {
    let droppedResource = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
        filter: (s) => s.resourceType === RESOURCE_ENERGY
    });
    if (this.pos.isNearTo(droppedResource)) {
        this.pickup(droppedResource, RESOURCE_ENERGY)
    } else {
        this.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffcc00'}})
    }
}


Creep.prototype.hauling = function (hauling) {
    let storageAndContainers = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_STORAGE || (s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= 200)
    });

    if (this.pos.isNearTo(storageAndContainers)) {
        this.withdraw(storageAndContainers, RESOURCE_ENERGY)
    } else {
        this.moveTo(storageAndContainers, {visualizePathStyle: {stroke: '#ffcc00'}})
    }
}


Creep.prototype.checkIfFull = function (checkIfFull) {
    if (this.store.getFreeCapacity() === 0) {
        this.memory.isFull = true
    } else {
        this.memory.isFull = false
    }
}
