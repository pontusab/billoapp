const { autoUpdater } = require('electron-updater');
const logger = require('electron-log');
const ms = require('ms');

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';

// Check for updates every 5 minute
const createInterval = () => setInterval(() => {
  logger.info('Checking for updates');
  autoUpdater.checkForUpdates();
}, ms('5m'));

function update() {
  // at this point the app is fully started and ready for updating
  setTimeout(() => autoUpdater.checkForUpdates(), ms('5s'));

  let intervalId = createInterval();

  autoUpdater.on('update-available', () => {
    logger.info('update-available');
    clearInterval(intervalId);
    intervalId = null;
  });


  autoUpdater.on('update-downloaded', () => {
    logger.info('update-downloaded');
  });

  autoUpdater.on('update-not-available', () => logger.info('update-not-available'));


  autoUpdater.on('error', (err) => {
    if (intervalId === null) {
      intervalId = createInterval();
    }
    logger.info('Error fetching updates', err.stack);
  });
}

module.exports = update;
