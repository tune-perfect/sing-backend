import { registerAs } from '@nestjs/config';

export default registerAs('keycloak', () => {
  return {
    baseUrl: process.env.KEYCLOAK_BASE_URL,
    realm: process.env.KEYCLOAK_REALM,
  };
});
