let data = [];
let updateCallback = null;

export const setDataCopy = newData => {
	data = newData;

	if (updateCallback) {
		updateCallback(); // Вызываем колбэк при изменении данных
	}
};

export const getDataCopy = () => data;
export const setUpdateCallback = callback => {
	updateCallback = callback; // Устанавливаем колбэк обновления данных
};
