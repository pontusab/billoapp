const log = require('electron-log');
const { autoUpdater } = require('electron-updater');

function update() {
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';
  log.info('App starting...');

  autoUpdater.checkForUpdates();

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
  });

  autoUpdater.on('update-available', () => {
    console.log('Update available.');
  });

  autoUpdater.on('update-not-available', () => {
    console.log('Update not available.');
  });

  autoUpdater.on('error', () => {
    console.log('Error in auto-updater.');
  });

  autoUpdater.on('download-progress', () => {
    console.log('Download progress...');
  });

  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded; will install in 5 seconds');
  });
}

module.exports = update;
