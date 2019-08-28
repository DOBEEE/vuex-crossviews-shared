import storage from './storage';

class Event {
    emit({ type = '', data = {}, success = '', fail = '', complete = '' }) {
        storage.set(type, data);
    }

    on({ type = '', handler, success = '', fail = '', complete = '' }) {
        storage.on(type, handler);
    }

    off({ type = '', handler, success = '', fail = '', complete = '' }) {
        storage.removeHandle(type, handler);
    }
}
const event = new Event();
export default event;
