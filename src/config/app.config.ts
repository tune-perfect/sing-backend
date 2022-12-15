import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    port: process.env.PORT || 3000,
    prefix: process.env.PREFIX,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
});
