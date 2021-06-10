var spawnCreeps = {

	spawnHarvester: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
		let room = spawn.room;

		if (creepsSpawned < creepsNeeded) {
			let newName = 'Harvester-0' + Game.time;
			let partsList = [WORK, CARRY, MOVE];
			var result = spawn.spawnCreep(partsList, newName, {
				memory: {
					role: 'harvester', room_dest: room.name
				}
			});
			if (result === OK) {
				console.log('Spawning new harvester: ' + newName);
			}
		}
	},

	spawnTransport: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
		let room = spawn.room;

		if (creepsSpawned < creepsNeeded) {
			var partsList = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
			let newName = 'Transport-0' + Game.time;
			var result = spawn.spawnCreep(partsList, newName, {
				memory: {
					role: 'transport', room_dest: room.name
				}
			});
			if (result === OK) {
				console.log('Spawning new transport: ' + newName);
			}
		}
	},

	spawnBuilder: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
		let room = spawn.room;

		if (creepsSpawned < creepsNeeded) {
			var partsList = [];
			let newName = 'Builder-0' + Game.time;
			var result = spawn.spawnCreep(partsList, newName, {
				memory: {
					role: 'builder', room_dest: room.name
				}
			});
			if (result === OK) {
				console.log('Spawning new builder: ' + newName);
			}
		}
	},

	spawnUpgrader: function (spawn, roomDestination, creepsSpawned, creepsNeeded) {
		let room = spawn.room;

		if (creepsSpawned < creepsNeeded) {
			var partsList = [WORK, WORK, CARRY, MOVE];
			let newName = 'Upgrader-0' + Game.time;
			var result = spawn.spawnCreep(partsList, newName, {
				memory: {
					role: 'upgrader', room_dest: room.name
				}
			});
			if (result === OK) {
				console.log('Spawning new upgrader: ' + newName);
			}
		}
	},
}

module.exports = spawnCreeps;