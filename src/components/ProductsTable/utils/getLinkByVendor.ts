export const getLinkByVendor = (vendor: string): string =>
  vendor.replace(/\//g, '-');
