export const storage = {
    set(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    add(key, value) {
        const data = this.get(key) || [];
        data.push(value);
        this.set(key, data);
    },
    get(key) {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    remove(key) {
        sessionStorage.removeItem(key);
    },
    clear() {
        sessionStorage.clear();
    }
};

export default storage;