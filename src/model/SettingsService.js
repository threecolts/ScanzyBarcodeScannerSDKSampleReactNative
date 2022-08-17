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
        if (settings != null) return resolve(settings);
        else {
          storage
            .load({key: 'ScanzySettings'})
            .then(value => {
              settings = value;
              return resolve(settings);
            })
            .catch(err => {
              console.warn(err.message);
              settings = {
                enableBeep: true,
                enableVibrate: true,
                enableScanRectOnly: false,
                enableAutoZoom: false,
                barcode: {
                  '1D': [
                    {type: ScanzyBarcodeFormat.Code128, value: false},
                    {type: ScanzyBarcodeFormat.Code39, value: false},
                    {type: ScanzyBarcodeFormat.Code93, value: false},
                    {type: ScanzyBarcodeFormat.CodaBar, value: false},
                    {type: ScanzyBarcodeFormat.EAN13, value: true},
                    {type: ScanzyBarcodeFormat.EAN8, value: true},
                    {type: ScanzyBarcodeFormat.ITF, value: false},
                    {type: ScanzyBarcodeFormat.UPCA, value: true},
                    {type: ScanzyBarcodeFormat.UPCE, value: true},
                  ],
                  '2D': [
                    {type: ScanzyBarcodeFormat.QRCode, value: true},
                    {type: ScanzyBarcodeFormat.DataMatrix, value: false},
                    {type: ScanzyBarcodeFormat.PDF417, value: false},
                    {type: ScanzyBarcodeFormat.Aztec, value: false},
                    {type: ScanzyBarcodeFormat.MaxiCode, value: false},
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
