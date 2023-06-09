import { setDataCopy } from './storage';

const list = document.querySelectorAll('.list__item');
const buttonsDelete = document.querySelectorAll('.item__delete');
const buttonMinus = document.querySelectorAll('.minus');
const buttonPlus = document.querySelectorAll('.plus');

const getValues = element => {
	return {
		name: element.querySelector('.item__text').textContent,
		price: element.querySelector('.item__price').textContent,
		quantity: element.querySelector('.form-field').value,
	};
};

const getData = array => {
	const goods = [];
	for (let i = 0; i <= array.length - 1; i++) {
		const element = getValues(array[i]);
		goods.push(element);
	}
	return goods;
}; // записать данные карточек из корзины в массив

let goods = getData(list);
console.log('goods', goods);

function deleteElementFromMarkup() {
	const listItem = this.parentNode; // получить родительский элемент кнопки (li элемент списка)
	const removeObject = {
		name: listItem.querySelector('.item__text').textContent,
		price: listItem.querySelector('.item__price').textContent,
		quantity: listItem.querySelector('.form-field').value,
	}; // записать в объект значения элемента li
	const newData = goods.filter(
		element =>
			element.name !== removeObject.name ||
			element.price !== removeObject.price ||
			element.quantity !== removeObject.quantity
	); // создаем новый массив, исключая удаляемый элемент
	goods = newData;

	console.log('goods', goods);

	listItem.remove(); // Удаляем элемент из разметки
	setDataCopy(goods);
}

const deleteElement = () => {
	buttonsDelete.forEach(element => {
		element.addEventListener('click', deleteElementFromMarkup);
	});
};

deleteElement();

const getkeyObj = (currentObject, value, index) => {
	Object.keys(currentObject).forEach(key => {
		if (key === 'quantity') {
			currentObject[key] = value;
			goods[index] = currentObject;
		}
	});
	return goods;
};

function changeElementQuantity(buttonName) {
	const listItem = this.parentNode.parentNode.parentNode;
	const currrentObject = {
		name: listItem.querySelector('.item__text').textContent,
		price: listItem.querySelector('.item__price').textContent,
		quantity: listItem.querySelector('.form-field').value,
	};
	let indexElement;
	for (let i = 0; i <= goods.length - 1; i++) {
		if (
			goods[i].name === currrentObject.name &&
			goods[i].price === currrentObject.price &&
			goods[i].quantity === currrentObject.quantity
		) {
			indexElement = goods.indexOf(goods[i]);
		}
	}
	if (buttonName.target.className === 'btn-decrease minus' && currrentObject.quantity > 1) {
		currrentObject.quantity = Number(currrentObject.quantity) - 1;
		listItem.querySelector('.form-field').value = currrentObject.quantity;
	} else if (buttonName.target.className === 'btn-increase plus') {
		currrentObject.quantity = Number(currrentObject.quantity) + 1;
		listItem.querySelector('.form-field').value = currrentObject.quantity;
	}
	getkeyObj(currrentObject, listItem.querySelector('.form-field').value, indexElement);

	console.log('new data', goods);
	setDataCopy(goods); // копировать данные корзины в массив.
}

// изменение кол-ва товаров

const changeQuantityMinus = () => {
	buttonMinus.forEach(element => {
		element.addEventListener('click', changeElementQuantity);
	});
};

const changeQuantityPlus = () => {
	buttonPlus.forEach(element => {
		element.addEventListener('click', changeElementQuantity);
	});
};

changeQuantityMinus();
changeQuantityPlus();
setDataCopy(goods); // копировать данные корзины в массив.
