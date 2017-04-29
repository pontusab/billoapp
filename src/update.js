const { autoUpdater } = require('electron-updater');
const logger = require('electron-log');
const { dialog } = require('electron');
const ms = require('ms');

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';

const createInterval = () => setInterval(() => {
  logger.info('Checking for updates');
  autoUpdater.checkForUpdates();
}, ms('5m'));

function update() {
  setTimeout(() => autoUpdater.checkForUpdates(), ms('5s'));

  let intervalId = createInterval();

  autoUpdater.on('update-available', () => {
    logger.info('update-available');
    clearInterval(intervalId);
    intervalId = null;
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      message: 'En ny uppdatering finns tillgänglig, starta om nu för att få den senaste versionen.',
    }, () => autoUpdater.quitAndInstall());
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
