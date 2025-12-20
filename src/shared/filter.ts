import { atom } from "nanostores";

export const $filter = atom<{ cant: number; page: number }>({
  cant: 3,
  page: 0,
});

export const setFilter = (filter: { cant: number; page: number }) => {
  $filter.set(filter);
};
