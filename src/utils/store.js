const localStore = {
    get: function getStoreItem(key) {
        return JSON.parse(localStorage.getItem(key))
    },

    set: function setStoreItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export default localStore;