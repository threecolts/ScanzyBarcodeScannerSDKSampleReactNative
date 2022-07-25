import * as React from 'react';
import {
  FlatList,
  Text,
  View,
  Pressable,
  Linking,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsService from '../model/SettingsService';
import ScanzyBarcodeScannerPlugin from 'react-native-scanzy-barcode-scanner-plugin';
export default function HomeScreen() {
  const {showActionSheetWithOptions} = useActionSheet();
  const DATA = [
    {
      title: 'Scan 1D barcode',
      type: '1D',
      iconName: 'barcode',
      description:
        'Code128, Code39, Code93, CodaBar, EAN13, EAN8, ITF, UPCA, UPCE.',
    },
    {
      title: 'Scan 2D barcode',
      type: '2D',
      iconName: 'qrcode',
      description: 'QRCode, DataMatrix, PDF417, Aztec, MaxiCode.',
    },
  ];

  const openSheet = code => {
    const options = [
      'Amazon Listing',
      'Amazon Prime',
      'Keepa',
      'CamelCamelCamel',
      'BookScouter',
      'Ebay',
      'Google',
      'Cancel',
    ];
    const destructiveButtonIndex = 0; //the first element in 'options' will denote the Delete option
    const cancelButtonIndex = 7; //Element number 7 in the array will be the 'Cancel' button

    showActionSheetWithOptions(
      {
        message: 'Where would you like to do your research?',
        title: code,
        options,
        cancelButtonIndex, //the third button will be the 'Cancel' button
        destructiveButtonIndex, //the first button will be the 'Delete' option
      },
      buttonIndex => {
        // Do something here depending on the button index selected
        switch (buttonIndex) {
          case 0:
            Linking.openURL('http://www.amazon.com/gp/product/' + code);
            openSheet(code);
            break;
          case 1:
            Linking.openURL(
              'http://www.amazon.com/gp/offer-listing/' +
                code +
                '/sr=/qid=/ref=olp_prime_all?ie=UTF8&colid=&coliid=&condition=all&me=&qid=&seller=&shipPromoFilter=1&sort=sip&sr=',
            );
            openSheet(code);
            break;
          case 2:
            Linking.openURL('https://keepa.com/#!product/1-' + code);
            openSheet(code);
            break;
          case 3:
            Linking.openURL('http://camelcamelcamel.com/product/' + code);
            openSheet(code);
            break;
          case 4:
            Linking.openURL('https://bookscouter.com/sell/' + code);
            openSheet(code);
            break;
          case 5:
            Linking.openURL(
              'http://www.ebay.com/sch/i.html?_trksid=p2050601.m570.l1313&_nkw=' +
                code +
                '&_sacat=0&_from=R40',
            );
            openSheet(code);
            break;
          case 6:
            Linking.openURL('https://www.google.com/search?q=' + code);
            openSheet(code);
            break;
        }
      },
    );
  };

  const scan = type => {
    SettingsService.getSettings().then(settings => {
      try {
        if (type == '1D') {
          let options = {
            enableBeep: settings.enableBeep,
            enableVibration: settings.enableVibrate,
            autoZoom: settings.enableAutoZoom,
            scanCropRectOnly: settings.enableScanRectOnly,
            formats: settings.barcode['1D']
              .filter(item => {
                return item.value;
              })
              .map(item => {
                return item.type;
              }),
          };

          // scan
          ScanzyBarcodeScannerPlugin.scan(options).then(data => {
            //get the scan result
            console.log('Scan Result:' + data);
            if (data != '') {
              openSheet(data);
            }
          });
        } else {
          let options = {
            enableBeep: settings.enableBeep,
            enableVibration: settings.enableVibrate,
            autoZoom: settings.enableAutoZoom,
            scanCropRectOnly: settings.enableScanRectOnly,
            formats: settings.barcode['2D']
              .filter(item => {
                return item.value;
              })
              .map(item => {
                return item.type;
              }),
          };

          // scan
          ScanzyBarcodeScannerPlugin.scan(options).then(data => {
            //get the scan result
            console.log('Scan Result:' + data);
            if (data != '') {
              openSheet(data);
            }
          });
        }
      } catch (e) {
        alert(e);
      }
    });
  };
  return (
    <SafeAreaView edges={['bottom', 'right']} style={styles.safeAreaView}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={DATA}
        style={styles.flatList}
        renderItem={({item}) => (
          <View style={styles.flatItem}>
            <Pressable
              style={styles.pressable}
              onPress={() => {
                scan(item.type);
              }}>
              <Icon style={styles.flatItemIcon} name={item.iconName} />
              <View style={styles.flatItemLabel}>
                <Text style={styles.flatItemTitle}>{item.title}</Text>
                <Text style={styles.flatItemDescription}>
                  {item.description}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>data detectors</Text>
          </View>
        )}
      />
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>App version 1.0.0</Text>
        <Text style={styles.versionText}>
          Scanzy Barcode Scanner SDK version 1.0.0
        </Text>
        <Text style={styles.versionText}>
          Copyright {new Date().getFullYear()} Scanzy. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    flex: 1,
    minHeight: 45,
    backgroundColor: '#f4f5f8',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#92949c',
    paddingLeft: 16,
  },
  flatList: {
    alignSelf: 'stretch',
    backgroundColor: '#f4f5f8',
  },
  flatItem: {},
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  flatItemIcon: {
    color: 'black',
    fontSize: 30,
    width: 30,
    height: 30,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 16,
  },
  flatItemLabel: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.13)',
  },
  flatItemTitle: {
    fontSize: 16,
  },
  flatItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  versionContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  versionText: {
    color: '#92949c',
  },
});
