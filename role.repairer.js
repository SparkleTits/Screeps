let roleRepairer = {
    
    run: function(creep, spawn) {
	    
	    if( creep.store[RESOURCE_ENERGY] === 0) {
	        
	        let sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => i.structureType === STRUCTURE_SPAWN || i.structureType === STRUCTURE_EXTENSION || i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] >= 50});
	        
            if( creep.withdraw(sources, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffcc00'}});
                
            }
            
        } else {
            
	        const targets = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax && (object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART) || object.hits < 10000 && (object.structureType === STRUCTURE_WALL || object.structureType === STRUCTURE_RAMPART)});

			targets.sort((a, b) => a.hits - b.hits);

	        if(targets.length > 0) {

	        	//var targetsNear = creep.pos.findClosestByRange(targets);

				creep.memory.working = true;

				if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {

					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});

				}

			} else if (targets.length === 0) {

	        	creep.memory.working = false;

			}

	    }

		if ( creep.memory.working === false && creep.store[RESOURCE_ENERGY] > 0) {

			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {

					return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});

			if (targets.length > 0) {

				if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {

					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});

				}

			}

		}

    }

}

module.exports = roleRepairer;