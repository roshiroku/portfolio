const defaultSettings = {
  enableWalls: true,
  initialSpeed: 0.2,
  appleCount: 1,
  enableMice: false
};

const settings: typeof defaultSettings = JSON.parse(localStorage.getItem('snake-settings') || JSON.stringify(defaultSettings));

type SettingsKey = keyof typeof settings;
type SettingsValue<K extends SettingsKey> = typeof settings[K];

export { defaultSettings, settings, SettingsKey, SettingsValue };