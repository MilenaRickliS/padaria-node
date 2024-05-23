const formatCurrency = (amount, currency) => {
    return `${currency} ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  };
  
  module.exports = formatCurrency;