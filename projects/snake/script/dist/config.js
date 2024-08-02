const defaultSettings = {
    enableWalls: true,
    initialSpeed: 0.2,
    pizzaCount: 1,
    enableMice: false
};
const settings = JSON.parse(localStorage.getItem('snakeSettings') || JSON.stringify(defaultSettings));
export { defaultSettings, settings };
