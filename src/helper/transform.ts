// src/utils/transform.ts

export const transformCustomerData = (data: any[]) => {
  return data.map((item) => ({
    label: item.name,
    value: item.code,
  }));
};

export const transformOptionData = (data: any[]) => {
  return data.map((item) => ({
    label: item.text,
    value: item.id,
  }));
};
export const transformPlaceData = (data: any[]) => {
  return data.map((item) => ({
    label: item.name,
    value: item.code.toString(),
  }));
};
