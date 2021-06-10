/*
Creep.prototype.findEnergySource = function findEnergySource() {
    let sources = this.room.find(FIND_SOURCES);
    if (sources.length) {
        let source = _.find(sources, function(s) {
            //console.log(s.pos, s.pos.getOpenPositions())
            return s.pos.getOpenPositions().length > 0;
        });

        //console.log(sources.length, source)
        if (source) {
            this.memory.source = source.id;

            return source;
        }
    }
}

Creep.prototype.harvestEnergy = function harvestEnergy() {
    let storedSource = Game.getObjectById(this.memory.source);
    // if there is no stored source, or if the stored source has no open spots & the creep is not next to the stored source, delete it and find another
    if (!storedSource || (!storedSource.pos.getOpenPositions().length && !this.pos.isNearTo(storedSource))) {
        delete this.memory.source;
        storedSource = this.findEnergySource();
    }
    // if there is a stored source go to it and harvest it
    if (storedSource.energy) {
        if (this.pos.isNearTo(storedSource)) {
            this.harvest(storedSource);
        } else {
            this.moveTo(storedSource, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}
 */


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

/*
Creep.prototype.pickupResources = function (pickupResources) {
    let droppedResource = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
        filter: (s) => s.amount >= 200
    });

    if (droppedResource.length && this.memory.isFull === false) {
        this.memory.pickingUp = true

        if (this.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
            this.moveTo(droppedResource, {visualizePathStyle: {stroke: '#ffcc00'}});
        }
    } else {
        this.memory.pickingUp = false
    }
}
 */

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

/*
Creep.prototype.hauling = function (hauling) {
    if (this.room.storage) {
        var storageEnergy = this.room.storage.store[RESOURCE_ENERGY]
    } else {
        var storageEnergy = 0
    }
    let tower = this.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    })

    if (this.store[RESOURCE_ENERGY] === 0) {
        if ((this.room.energyAvailable < (this.room.energyCapacityAvailable * 0.75) || tower.energy < (tower.energyCapacity * 0.75)) && storageEnergy > 0) {
            this.memory.hauling = true

            let storageAndContainers = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_STORAGE || (s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= 200)
            });

            if (this.withdraw(storageAndContainers, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.moveTo(storageAndContainers, {visualizePathStyle: {stroke: '#ffcc00'}});
            }
        } else {
            this.memory.hauling = false
        }
    }
}
 */

Creep.prototype.checkIfFull = function (checkIfFull) {
    if (this.store.getFreeCapacity() === 0) {
        this.memory.isFull = true
    } else {
        this.memory.isFull = false
    }
}


/*
Creep.prototype.massSuicide = function (massSuicide) {
    if (this.memory.role) {
        this.suicide
    }
}
 */