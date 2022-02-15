export const getFabricatorImageUrl = (link: string): string =>
  `/api/fabricators/image/${link.replace('/fabricators/', '')}.jpg`;
