export const isHasValue = (value) =>
  value !== null && typeof value !== 'undefined';

export const isNotEmpty = (value) =>
  isHasValue(value) && (value + '').trim().length > 0;

export const moneyFormatter = (number, currency = ' ₫') => {
  if (!isNotEmpty(number)) return '';
  return parseInt(number).toLocaleString('vi-VN') + currency;
};

export const calDiscount = (p: any) => {
	const { priceRoot, price } = p;
	return Math.ceil(((priceRoot - price) / priceRoot) * 100);
};