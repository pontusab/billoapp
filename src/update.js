const { dialog } = require('electron')
const { autoUpdater } = require('electron-updater')

function update() {
  autoUpdater.checkForUpdates();
  
  let updater
  autoUpdater.autoDownload = false

  autoUpdater.on('error', (event, error) => {
    dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
  })

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want update now?',
      buttons: ['Sure', 'No']
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate()
      }
      else {
        updater.enabled = true
        updater = null
      }
    })
  })

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: 'No Updates',
      message: 'Current version is up-to-date.'
    })
    updater.enabled = true
    updater = null
  })

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...'
    }, () => {
      autoUpdater.quitAndInstall()
    })
  })
}

module.exports = update;

// const log = require('electron-log');
// const { autoUpdater } = require('electron-updater');
//
// function update() {
//   autoUpdater.logger = log;
//   autoUpdater.logger.transports.file.level = 'info';
//   log.info('App starting...');
//
//   autoUpdater.checkForUpdates();
//
//   autoUpdater.on('checking-for-update', () => {
//     console.log('Checking for update...');
//   });
//
//   autoUpdater.on('update-available', () => {
//     console.log('Update available.');
//   });
//
//   autoUpdater.on('update-not-available', () => {
//     console.log('Update not available.');
//   });
//
//   autoUpdater.on('error', () => {
//     console.log('Error in auto-updater.');
//   });
//
//   autoUpdater.on('download-progress', () => {
//     console.log('Download progress...');
//   });
//
//   autoUpdater.on('update-downloaded', () => {
//     console.log('Update downloaded; will install in 5 seconds');
//   });
// }
//
// module.exports = update;
