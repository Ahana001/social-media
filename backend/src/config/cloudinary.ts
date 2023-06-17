import cloudinary from 'cloudinary';
import * as secretStore from '../utils/secret_manager';

export async function connectToCloudinary() {
  cloudinary.v2.config({
    cloud_name: secretStore.getSecret('CLOUDINARY_NAME'),
    api_key: secretStore.getSecret('CLOUDINARY_API_KEY'),
    api_secret: secretStore.getSecret('CLOUDINARY_API_SECRET'),
  });
}
