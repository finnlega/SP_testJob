import { getDataCopy, setUpdateCallback } from './storage';

const subTotal = document.querySelector('#subtotal');
const tax = document.querySelector('#tax').textContent;
const shipping = document.querySelector('#shipping').textContent;
const totalGoods = document.querySelector('#total');

const update = () => {
	const array = getDataCopy();
	const updateData = array.map(item => ({
		name: item.name,
		price: item.price.replace('$ ', ''),
		quantity: item.quantity,
	}));

	console.log(updateData); // обновленные данные

	const sumPosition = updateData.reduce(function (accumulator, currentValue) {
		currentValue = Number(currentValue.price) * Number(currentValue.quantity);
		return accumulator + currentValue;
	}, 0);
	const str = String(sumPosition);
	subTotal.textContent = `$ ${str.substring(0, 1)} ${str.substring(1, 4)}`;

	const total = sumPosition + Number(tax.replace('$ ', '')) + Number(shipping.replace('$ ', ''));
	const strTotal = String(total);
	totalGoods.textContent = `$ ${strTotal.substring(0, 1)} ${strTotal.substring(1, 4)}`;
	if (updateData.length === 0) {
		totalGoods.textContent = `$ 0`;
	}
};

setUpdateCallback(update);
update();
