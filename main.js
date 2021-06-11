let creepFunctions = require('creepFunctions');
let towers = require('module.towers');

var roleHarvester = require('role.harvester');
var roleTransport = require('role.transport');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require("role.builder");
var roleBarricader = require("role.barricader");

var spawns = require('module.spawning');
let constants = require("module.constants")
let visuals = require("module.roomVisuals")

module.exports.loop = function () {

    console.log("----------------------------------------");
    console.log("start: " + Game.cpu.getUsed().toFixed(2))

    // count creeps
    let role_harvesters1 = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester1');
    let role_harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester2');
    let role_transports = _.filter(Game.creeps, (creep) => creep.memory.role === 'transport');
    let role_upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
    let role_builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
    let role_barricaders = _.filter(Game.creeps, (creep) => creep.memory.role === 'barricader');


    console.log("--------------------");
    console.log("** Tick: " + Game.time + " **");
    console.log('Harvesters: ' + (role_harvesters1.length + role_harvesters2.length));
    console.log('Upgraders: ' + role_upgraders.length);
    console.log('Builders: ' + role_builders.length);
    console.log('Transports: ' + role_transports.length);
    console.log('Barricaders: ' + role_barricaders.length);
    console.log("--------------------");

    constants.run()
    spawns.run()



    // clear dead creeps from memory
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for (let rooms in Game.rooms) {
        towers.run();
        visuals.run()
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester1':
                roleHarvester.run(creep);
                break;
            case 'harvester2':
                roleHarvester.run(creep);
                break;
            case 'transport':
                roleTransport.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'barricader':
                roleBarricader.run(creep);
                break;
        }
    }
}