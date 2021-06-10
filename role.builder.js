let roleBuilder = {

    run: function (creep, spawn) {

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
		} else {
			creep.buildSites();
		}
    }
};

module.exports = roleBuilder;

    	/*
		let targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

		if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {

			var sources = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType === STRUCTURE_SPAWN || i.structureType === STRUCTURE_EXTENSION && i.store[RESOURCE_ENERGY] >= 50});

			if (creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {

				creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffcc00'}});

			}

			/*
			let sources = creep.pos.findClosestByPath(FIND_SOURCES);

			if( creep.harvest(sources) === ERR_NOT_IN_RANGE) {

				creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffcc00'}});

			}



		} else {

			const targetWalls = creep.room.find(FIND_CONSTRUCTION_SITES, {filter: (i) => i.structureType === STRUCTURE_WALL || i.structureType === STRUCTURE_RAMPART});

			if(targetWalls.length > 0) {

				if (creep.build(targetWalls[0]) === ERR_NOT_IN_RANGE) {

					creep.moveTo(targetWalls[0], {visualizePathStyle: {stroke: '#ffffff'}});

			}

			} else if (creep.build(targets) === ERR_NOT_IN_RANGE) {

				creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});

			}

		}

    }

}
*/

