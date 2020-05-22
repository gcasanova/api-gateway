export const jwtConstants = {
  // TODO: Remove OR value when this is dockerised and injected with docker compose
  secret: process.env.AUTH_SECRET || 'secret',
};
