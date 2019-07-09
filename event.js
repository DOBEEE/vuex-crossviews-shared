import storage from './storage';

class Event {
    static emit({ type = '', data = {}, success = '', fail = '', complete = '' }) {
        storage.set(type, data);
    }

    static on({ type = '', handler, success = '', fail = '', complete = '' }) {
        storage.on(type, handler);
    }

    static off({ type = '', handler, success = '', fail = '', complete = '' }) {
        storage.removeHandle(type, handler);
    }
}
const event = new Event();
export default event;
