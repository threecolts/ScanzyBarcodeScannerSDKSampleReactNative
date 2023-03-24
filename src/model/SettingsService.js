import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScanzyBarcodeFormat} from 'react-native-scanzy-barcode-scanner-plugin';
const SettingsService = (() => {
  'use strict';
  let settings;
  let storage;
  return {
    init: () => {
      storage = new Storage({
        size: 20,
        storageBackend: AsyncStorage,
        defaultExpires: 1000 * 3600 * 24,
        enableCache: true,
      });
    },
    getSettings: () => {
      return new Promise((resolve, reject) => {
        if (settings != null) {
          return resolve(settings);
        } else {
          storage
            .load({key: 'ScanzySettings'})
            .then(value => {
              settings = value;
              return resolve(settings);
            })
            .catch(() => {
              //console.warn(err.message);
              settings = {
                enableVibration: true,
                enableBeep: true,
                enableAutoZoom: false,
                enableScanCropRectOnly: false,
                barcode: {
                  '1D': [
                    {type: ScanzyBarcodeFormat.Code128, value: true},
                    {type: ScanzyBarcodeFormat.Code39, value: true},
                    {type: ScanzyBarcodeFormat.Code93, value: true},
                    {type: ScanzyBarcodeFormat.CodaBar, value: true},
                    {type: ScanzyBarcodeFormat.EAN13, value: true},
                    {type: ScanzyBarcodeFormat.EAN8, value: true},
                    {type: ScanzyBarcodeFormat.ITF, value: true},
                    {type: ScanzyBarcodeFormat.UPCA, value: true},
                    {type: ScanzyBarcodeFormat.UPCE, value: true},
                  ],
                  '2D': [
                    {type: ScanzyBarcodeFormat.QRCode, value: true},
                    {type: ScanzyBarcodeFormat.DataMatrix, value: true},
                    {type: ScanzyBarcodeFormat.PDF417, value: true},
                    {type: ScanzyBarcodeFormat.Aztec, value: true},
                    {type: ScanzyBarcodeFormat.MaxiCode, value: true},
                  ],
                },
              };
              storage.save({
                key: 'ScanzySettings',
                data: settings,
              });
              resolve(settings);
            });
        }
      });
    },
    updateSettings: newSettings => {
      settings = newSettings;
      storage.save({
        key: 'ScanzySettings',
        data: settings,
      });
    },
  };
})();
export default SettingsService;
