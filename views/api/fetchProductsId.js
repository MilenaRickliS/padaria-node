
const fetchProductsId = async (id) => {
    const response = await fetch(`https://api.mercadolibre.com/items?q=${id}`);
    const data = await response.json();
  
    return data.results;
  };
  
module.exports = fetchProductsId;