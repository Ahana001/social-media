import {connect, connection} from 'mongoose';
import * as secretStore from '../utils/secret_manager';

export async function connectToMongodb() {
  try {
    await connect(secretStore.getSecret('MONGODB_URL'));
  } catch (error) {
    console.log('Error:', error);
  }
}

connection.on('connected', () => {
  console.log('Mongodb connected to:', connection.db.databaseName);
});

connection.on('error', error => {
  console.error('error', error);
});

connection.on('disconnected', () => {
  console.log('Mongodb disconnected');
});
