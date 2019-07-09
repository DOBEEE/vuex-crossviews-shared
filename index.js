import storage from './storage';
import storageEvent from './event';
import merge from 'deepmerge';

export default function({
	key = 'h5_vuex',
	filter,
	event = storageEvent,
	paths = []
}) {
	filter = filter || () => {
		return true;
	};

	function subscriber(store) {
		return function(handler) {
			return store.subscribe(handler);
		};
	}

	function get(object, path, def) {
		return (object = (path.split ? path.split('.') : path).reduce(function(obj, p) {
			return obj && obj[p]
		}, object)) === undefined ? def : object;
	}

	function set(object, path, val, obj) {
		return ((path = path.split ? path.split('.') : path).slice(0, -1).reduce(function(obj, p) {
			return obj[p] = obj[p] || {};
		}, obj = object)[path.pop()] = val), object;
	}

	function reducer(state, paths) {
		return paths.length === 0 ?
			state :
			paths.reduce(function(substate, path) {
				return set(substate, path, get(state, path));
			}, {});
	}
	return function(store) {
		let cachedState = storage.get(key);
		if (typeof cachedState === 'object' && cachedState !== null) {
			// 每次对cachedState进行merge，防止state新增字段初始化时丢失
			store.replaceState(
				merge(store.state, cachedState, {
					arrayMerge: function(store, saved) {
						return saved;
					},
					clone: false,
				})
			);
		}
		subscribe(store)((mutation, state) => {
			if (filter(mutation)) {
				storage.set(key, reducer(state, paths));
				event.emit({
					type: key,
					data: state,
				});
			}
		});

		window._vuexhandle = data => {
			store.replaceState(data);
		};
		event.off({
			type: key,
			handler: window._vuexhandle,
		});
		event.on({
			type: key,
			handler: window._vuexhandle,
		});
	};
}