module.exports = {


    run: function spawns() {

        let rolesList = ["harvester1", "harvester2", "transport", "upgrader", "builder", "barricader"]

        let creepsOfRole = {}

        for (let name in Game.creeps) {
            let creep = Game.creeps[name]
            let creepValues = _.chunk([creep.memory.role, creep.memory.roomFrom], 2)

            if (!creepsOfRole[creepValues]) {
                creepsOfRole[creepValues] = 1
            } else {
                creepsOfRole[creepValues]++
            }
        }


        _.forEach(Game.rooms, function (room) {
            if (room.controller && room.controller.my) {

                for (let role of rolesList) {
                    if (!creepsOfRole[[role, room.name]]) {
                        creepsOfRole[[role, room.name]] = 0
                    }
                }

                let roomConstructionSite = room.find(FIND_CONSTRUCTION_SITES)
                let wallRepair = room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (s) => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) && s.hits <= 20000
                })

                let stage = room.memory.stage

                if (room.energyCapacityAvailable >= 3300) {
                    room.memory.stage = 8
                } else if (room.energyCapacityAvailable >= 2800) {
                    room.memory.stage = 7
                } else if (room.energyCapacityAvailable >= 2300) {
                    room.memory.stage = 6
                } else if (room.energyCapacityAvailable >= 1800) {
                    room.memory.stage = 5
                } else if (room.energyCapacityAvailable >= 1300) {
                    room.memory.stage = 4
                } else if (room.energyCapacityAvailable >= 800) {
                    room.memory.stage = 3
                } else if (room.energyCapacityAvailable >= 550) {
                    room.memory.stage = 2
                } else if (room.energyCapacityAvailable >= 300) {
                    room.memory.stage = 1
                }

                let minCreeps = {}

                for (let role of rolesList) {
                    minCreeps[role] = 0
                }

                switch (stage) {
                    case 1:
                        minCreeps["harvester1"] = 3
                        minCreeps["harvester2"] = 3
                        minCreeps["transport"] = 2
                        break
                    case 2:
                        minCreeps["harvester1"] = 2
                        minCreeps["harvester2"] = 2
                        minCreeps["transport"] = 2
                        break
                    case 3:
                        minCreeps["harvester1"] = 1
                        minCreeps["harvester2"] = 1
                        minCreeps["transport"] = 3
                        break
                    case 4:
                        minCreeps["harvester1"] = 1
                        minCreeps["harvester2"] = 1
                        minCreeps["transport"] = 3
                        break
                    case 5:
                        minCreeps["harvester1"] = 1
                        minCreeps["harvester2"] = 1
                        minCreeps["transport"] = 3
                        break
                    case 6:
                        minCreeps["harvester1"] = 1
                        minCreeps["harvester2"] = 1
                        minCreeps["transport"] = 3
                        break
                    case 7:
                        minCreeps["harvester1"] = 1
                        minCreeps["harvester2"] = 1
                        minCreeps["transport"] = 2
                        break
                    case 8:
                        minCreeps["harvester1"] = 1
                        minCreeps["harvester2"] = 1
                        minCreeps["transport"] = 2
                        break
                }

                if (roomConstructionSite.length > 0) {
                    if (!room.storage) {
                        if (stage <= 2) {
                            minCreeps["builder"] = 2
                        } else {
                            minCreeps["builder"] = 2
                        }
                    } else if (room.storage) {
                        if (room.storage.store[RESOURCE_ENERGY] >= 30000) {
                            minCreeps["builder"] = 3
                        } else {
                            minCreeps["builder"] = 2
                        }
                    }
                }

                if (wallRepair) {
                    if (!room.storage) {
                        if (stage <= 3) {
                            minCreeps["barricader"] = 1
                        } else {
                            minCreeps["barricader"] = 1
                        }
                    } else {
                        if (room.storage && room.storage.store[RESOURCE_ENERGY] >= 40000) {
                            minCreeps["barricader"] = 2
                        } else if (room.storage && room.storage.store[RESOURCE_ENERGY] >= 30000) {
                            minCreeps["barricader"] = 1
                        }
                    }
                }

                if (!room.storage) {
                    if (stage <= 3) {
                        minCreeps["upgrader"] = 3
                    } else {
                        minCreeps["upgrader"] = 2
                    }
                } else if (room.storage && room.storage.store[RESOURCE_ENERGY] >= 30000) {
                    minCreeps["upgrader"] = 1
                    if (stage <= 5) {
                        minCreeps["upgrader"] = 2
                    } else {
                        minCreeps["upgrader"] = 1
                    }
                }

                if (!requiredCreeps) {
                    var requiredCreeps = {}
                }

                for (let role of rolesList) {
                    if (minCreeps[role] > creepsOfRole[[role, room.name]]) {
                        requiredCreeps[role] = minCreeps[role] - creepsOfRole[[role, room.name]]
                        console.log(role + ", " + requiredCreeps[role] + ", " + room.name)
                    }
                }

                let roomFix = room.memory.roomFix

                if (roomFix == null) {
                    room.memory.roomFix = false
                }

                let roomFixMessage = ""

                if (creepsOfRole[['harvester1', room.name]] + creepsOfRole[['harvester2', room.name]] === 0 || creepsOfRole[["transport", room.name]] === 0) {
                    room.memory.roomFix = true
                    roomFixMessage = "rf"
                    console.log(room.name + ": roomFix is true")
                } else if (requiredCreeps["harvester1"] + requiredCreeps["harvester2"]+ requiredCreeps["transport"] === 0) {
                    room.memory.roomFix = false
                }

                let freeEnergy = room.energyAvailable
                let capacityEnergy = room.energyCapacityAvailable

                function roleValues(parts, role) {

                    let body = []
                    let bodyTier = 1
                    let sliceAmount

                    for (let object of parts) {

                        sliceAmount = object.sliceAmount

                        if (roomFix && stage >= object.stage) {
                            getParts(freeEnergy)
                            break
                        } else if (!roomFix && stage >= object.stage) {
                            getParts(capacityEnergy)
                            break
                        }

                        function getParts(energyType) {

                            if (object.defaultParts[0]) {
                                body.push(object.defaultParts)
                                bodyTier++
                            }

                            let bodyAmount = Math.floor((energyType - object.defaultCost) / object.extraCost)

                            if (bodyAmount !== Infinity) {
                                for (let i = 0; i < bodyAmount; i++) {
                                    body.push(object.extraParts)
                                    bodyTier++
                                }
                            }
                        }
                    }

                    body = _.flattenDeep(body).slice(0, sliceAmount)

                    return {
                        body: body,
                        tier: bodyTier,
                        role: role

                    }
                }

                let transportBody = roleValues(
                    [{
                        stage: 5,
                        defaultParts: [],
                        defaultCost: 0,
                        extraParts: [CARRY, CARRY, MOVE],
                        extraCost: 150,
                        sliceAmount: 36
                    },
                        {
                            stage: 1,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [CARRY, MOVE],
                            extraCost: 100,
                            sliceAmount: 50
                        }
                    ], "transport");

                let harvester1Body = roleValues(
                    [{
                        stage: 6,
                        defaultParts: [],
                        defaultCost: 0,
                        extraParts: [WORK, WORK, MOVE],
                        extraCost: 250,
                        sliceAmount: 13
                    },
                        {
                            stage: 5,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, WORK, MOVE],
                            extraCost: 250,
                            sliceAmount: 12
                        },
                        {
                            stage: 3,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, WORK, MOVE],
                            extraCost: 250,
                            sliceAmount: 12
                        },
                        {
                            stage: 1,
                            defaultParts: [MOVE],
                            defaultCost: 50,
                            extraParts: [WORK],
                            extraCost: 100,
                            sliceAmount: 9
                        }
                    ], "harvester1")
                let harvester2Body = roleValues(
                    [{
                        stage: 6,
                        defaultParts: [],
                        defaultCost: 0,
                        extraParts: [WORK, WORK, MOVE],
                        extraCost: 250,
                        sliceAmount: 13
                    },
                        {
                            stage: 5,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, WORK, MOVE],
                            extraCost: 250,
                            sliceAmount: 12
                        },
                        {
                            stage: 3,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, WORK, MOVE],
                            extraCost: 250,
                            sliceAmount: 12
                        },
                        {
                            stage: 1,
                            defaultParts: [MOVE],
                            defaultCost: 50,
                            extraParts: [WORK],
                            extraCost: 100,
                            sliceAmount: 9
                        }
                    ], "harvester2")

                let upgraderBody = roleValues(
                    [{
                        stage: 8,
                        defaultParts: [CARRY, CARRY, MOVE],
                        defaultCost: 150,
                        extraParts: [WORK, WORK, MOVE],
                        extraCost: 250,
                        sliceAmount: 24
                    },
                        {
                            stage: 3,
                            defaultParts: [CARRY, CARRY],
                            defaultCost: 100,
                            extraParts: [WORK, WORK, MOVE],
                            extraCost: 250,
                            sliceAmount: 25
                        },
                        {
                            stage: 2,
                            defaultParts: [CARRY, CARRY],
                            defaultCost: 100,
                            extraParts: [WORK, WORK, MOVE],
                            extraCost: 250,
                            sliceAmount: 25
                        },
                        {
                            stage: 1,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, WORK, CARRY, MOVE],
                            extraCost: 300,
                            sliceAmount: 25
                        }
                    ], "upgrader")

                let builderBody = roleValues(
                    [{
                        stage: 5,
                        defaultParts: [],
                        defaultCost: 0,
                        extraParts: [WORK, CARRY, MOVE],
                        extraCost: 200,
                        sliceAmount: 24
                    },
                        {
                            stage: 1,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, CARRY, MOVE, MOVE],
                            extraCost: 250,
                            sliceAmount: 24
                        }], "builder")

                let barricaderBody = roleValues(
                    [{
                        stage: 5,
                        defaultParts: [],
                        defaultCost: 0,
                        extraParts: [WORK, WORK, CARRY, MOVE],
                        extraCost: 300,
                        sliceAmount: 25
                    },
                        {
                            stage: 1,
                            defaultParts: [],
                            defaultCost: 0,
                            extraParts: [WORK, CARRY, MOVE, MOVE],
                            extraCost: 250,
                            sliceAmount: 24
                        }], "barricader")

                let bodies = [harvester1Body, harvester2Body, transportBody, upgraderBody, builderBody, barricaderBody]

                let i = 0

                for (let role in requiredCreeps) {
                    i++

                    if (i <= room.memory.spawns.length) {

                        let correctBody = _.filter(bodies, function (body) {
                            return body.role == role
                        })
                        let bodyRole = correctBody[0]

                        if (bodyRole.role == role && freeEnergy >= 300 && requiredCreeps[role] && requiredCreeps[role] > 0) {

                            for (let spawns of room.memory.spawns) {

                                let spawn = Game.getObjectById(spawns)
                                let testSpawn = spawn.spawnCreep(bodyRole.body, bodyRole.role, {dryRun: true})

                                if (testSpawn == 0 && freeEnergy >= 300) {
                                    let number = (Game.time * (Math.random()) * 0.0000125).toFixed(0)
                                    spawn.spawnCreep(bodyRole.body, (bodyRole.role + " MK" + bodyRole.tier + "-" + number), {
                                        memory: {
                                            role: bodyRole.role,
                                            isFull: false,
                                            roomFrom: room.name
                                        }
                                    })

                                    requiredCreeps[role] - 1

                                } else if (testSpawn != -4) {
                                    console.log("Failed to spawn: " + testSpawn + ", " + bodyRole.role + ", " + bodyRole.body.length + ", " + bodyRole.tier)
                                }
                            }
                        }
                    }
                }
            }
        })
    }
};

