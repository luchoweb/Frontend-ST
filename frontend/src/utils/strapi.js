export function unwrapStrapiEntity(entity) {
  if (!entity) {
    return null;
  }

  return {
    id: entity.id,
    ...entity.attributes,
  };
}

export function unwrapStrapiCollection(response) {
  return Array.isArray(response?.data) ? response.data.map(unwrapStrapiEntity) : [];
}

export function unwrapStrapiSingle(response) {
  return unwrapStrapiEntity(response?.data);
}
