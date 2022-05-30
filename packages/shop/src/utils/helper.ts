
export const isHasValue = (value) =>
  value !== null && typeof value !== 'undefined';

export const isNotEmpty = (value) =>
  isHasValue(value) && (value + '').trim().length > 0;

export const moneyFormatter = (number, currency = ' ₫') => {
  if (!isNotEmpty(number)) return '';
  return parseInt(number).toLocaleString('vi-VN') + currency;
};

export const calDiscount = (p: any) => {
  const { originalPrice, price } = p;
  console.log(originalPrice, price);
  
  return Math.ceil(((originalPrice - price) / originalPrice) * 100);
};