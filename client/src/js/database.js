import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database database and version we want to use.
  const connectDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = connectDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put method to add/update data in the database.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('data saved to the database', result.value);
};

// Method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const connectDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = connectDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;

  result ? console.log('data received from the database', result.value) :
  console.error('getDb not implemented');

  return result.value;
};

initdb();
