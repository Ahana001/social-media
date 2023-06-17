interface Secret {
  [key: string]: string | undefined;
}
const store: Secret = {};

export async function syncSecret() {
  for (const [key, value] of Object.entries(process.env)) {
    store[key] = value;
  }
}
export function getSecret(key: string) {
  if (store[key]) {
    return store[key] ?? '';
  }
  throw 'secret not found';
}
