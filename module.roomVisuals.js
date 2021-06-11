module.exports = {

    run: function visuals() {
        _.forEach(Game.rooms, function (room) {

            let containers = room.find(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_CONTAINER
            });

            let storage = room.storage

            if (storage) {
                room.visual.text(storage.store[RESOURCE_ENERGY], storage.pos.x, storage.pos.y, {font: 0.5, align: 'center', opacity: 0.5, backgroundColor: "#8c1f89", backgroundPadding: "0.1"})
            }

            for (let container of containers) {
                room.visual.text(container.store[RESOURCE_ENERGY], container.pos.x, container.pos.y - 1, {align: 'center', opacity: 0.5})
            }

        })
    }
}