const apiService = ({ baseHost }) => {
  const getSettelemntsByPostalCode = async ({ postalCode }) => {
    const path = `${baseHost}zip-codes/${postalCode}/`;
    const response = await fetch(path);
    const settlements = await response.json();

    return settlements;
  };

  const getAmenities = async ({ pageNumber = '1', propertyCategoryId = null, amenityId = null } = {}) => {
    let path = `/api/cat-amenities-parents/`;
    path = propertyCategoryId ? `${path}${amenityId}` : path;
    path = pageNumber ? `${path}?page=${pageNumber}` : path;
    const response = await fetch(path);
    const json = await response.json();
    const data = json.data.data;

    return data;
  };

  const getSubAmmenity = async ({ id }) => {
    const url = `/api/cat-amenities-childs/${id}/`;
    const response = await fetch(url);
    const json = await response.json();
    const { data } = json;

    return data;
  }

  const getSubAmenities = async ({ pageNumber = '1', propertyCategoryId = null } = {}) => {
    let url = `/api/cat-amenities-childs/?page=${pageNumber}`;
    url = propertyCategoryId ? `${url}&property_category_id=${propertyCategoryId}` : url;
    const response = await fetch(url);
    const json = await response.json();
    const { results, previous, next, count } = json.data;

    return { results, previous, next, count };
  }

  const getPropertyCategories = async({ pageNumber = '' } = {}) => {
    const url = `/api/cat-properties-categories/${pageNumber}`;
    const response = await fetch(url);
    const json = await response.json();
    const { results, previous, next, count } = json.data;

    return { results, previous, next, count };
  }

  return {
    getAmenities,
    getPropertyCategories,
    getSettelemntsByPostalCode,
    getSubAmmenity,
    getSubAmenities,
  }
};

export default apiService;