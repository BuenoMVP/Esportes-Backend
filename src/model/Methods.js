let ID = 0;
let esportes = [];

module.exports = {
    new(name, players, time) {
        let esporte = { 
            id: ++ID, 
            name: name, 
            players: players, 
            time: time
        };
        esportes.push(esporte);
        return esportes;
    },

    update(id, name, players, time) {
        let index = this.getPositionById(id)
        if (index >= 0) {
            esportes[index].name = name
            esportes[index].players = players
            esportes[index].time = time
        }
        return esportes[index]
    },

    list() {
        return esportes;
    },

    getElementById(id) {
        let index = this.getPositionById(id)
        if (index >= 0) {
            return esportes[index];
        }
        return null;
    },

    getPositionById(id) {
        for (let i = 0; i < esportes.length; i++) {
            if (esportes[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            let obj = esportes[i]
            esportes.splice(i, 1);
            return obj;
        }
        return null;
    }
}