/**
 * 本地存储api
 * @author https://github.com/DOBEEE
 * @date 2019.6.3
 */

const localStorage = window.localStorage;

class Storage {
    constructor() {
        this.uniqueStorageKey = 'h5_vuex';
    }

    setStorageKey(key) {
        this.uniqueStorageKey = key;
    }

    getStorage() {
        const value = localStorage.getItem(this.uniqueStorageKey);
        if (value) {
            return JSON.parse(value);
        }
        return {};
    }

    setStorage(data) {
        let jsonData = data;
        if (typeof data === 'object') {
            jsonData = JSON.stringify(data);
        } else if (typeof data === 'function') {
            throw new Error('cannot set storeage function');
        }
        const oldValue = localStorage.getItem(this.uniqueStorageKey);

        const setItemEvent = new Event('storageCurrent');
        setItemEvent.newValue = jsonData;
        setItemEvent.oldValue = oldValue;
        window.dispatchEvent(setItemEvent);
        localStorage.setItem(this.uniqueStorageKey, jsonData);
    }

    get(key) {
        const data = this.getStorage();
        return data[key];
    }

    set(key, value) {
        if (typeof value === 'function') {
            throw new Error('cannot set storeage function');
        }

        const data = this.getStorage();
        data[key] = value;
        this.setStorage(data);
    }

    remove(key) {
        const data = this.getStorage();
        delete data[key];
    }

    removeHandle(key, handle) {
        window.removeEventListener('storage', window[handle.name + key]);
        window.removeEventListener('storageCurrent', window[handle.name + key]);
    }

    clear() {
        localStorage.removeItem(this.uniqueStorageKey);
    }

    on(key, cb) {
        window[cb.name + key] = e => {
            if (e.key !== this.uniqueStorageKey) {
                // 判断是否是当前storge的修改，不是则退出
                return;
            }
            const newData = JSON.parse(e.newValue)[key];
            const oldData = JSON.parse(e.oldValue)[key];
            if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
                cb(newData, oldData);
            }
        };

        window.addEventListener('storageCurrent', window[cb.name + key]);
        window.addEventListener('storage', window[cb.name + key]);
    }
}

const storage = new Storage();
// storage.setStorageKey();

export default storage;
