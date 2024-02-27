
module.exports = (temp, prod) => {
  let output = temp
  output = output.replace(/{%PRODUCTNAME%}/g, prod.productName);
  output = output.replace(/{%PRICE%}/g, prod.price);
  output = output.replace(/{%IMAGE%}/g, prod.image);
  output = output.replace('(%PRODUCTNAME%)', prod.productName);
  output = output.replace('(%IMAGE%)', prod.image);
  output = output.replace('(%PRICE%)', prod.price);
  output = output.replace('(%ORIGIN%)', prod.from);
  output = output.replace('(%DESCRIPTION%)', prod.description);
  output = output.replace('(%QUANTITY%)', prod.quantity);
  output = output.replace('(%ID%)', prod.id);
  output = output.replace('(%NUTRIENTS%)', prod.nutrients)
  if (!prod.organic) {
    output = output.replace('(%NOT_ORGANIC%)', 'not-organic');
  }
  return output
};