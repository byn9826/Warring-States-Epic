export default function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
}
