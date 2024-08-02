const defaultSettings = {
  enableWalls: true,
  initialSpeed: 0.2,
  pizzaCount: 1,
  enableMice: false
};

const settings: typeof defaultSettings = JSON.parse(localStorage.getItem('snakeSettings') || JSON.stringify(defaultSettings));

type SettingsKey = keyof typeof settings;
type SettingsValue<K extends SettingsKey> = typeof settings[K];

export { defaultSettings, settings, SettingsKey, SettingsValue };