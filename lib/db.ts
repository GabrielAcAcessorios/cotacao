// /lib/db.ts
import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('meuBanco', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('orcamentos')) {
        db.createObjectStore('orcamentos', { keyPath: 'key' });
      }
    },
  });
};
