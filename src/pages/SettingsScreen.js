import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  FlatList,
  SectionList,
  Text,
  View,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingsService from '../model/SettingsService';

export default function SettingsScreen() {
  const [commonSettings, setCommonSettings] = useState([]);
  const [formatSettings, setFormatSettings] = useState([]);
  useEffect(() => {
    SettingsService.getSettings().then(data => {
      setCommonSettings([
        {
          title: 'Beep Enabled',
          value: data.enableBeep,
        },
        {
          title: 'Vibration Enabled',
          value: data.enableVibrate,
        },
        {
          title: 'Auto Zoom',
          value: data.enableAutoZoom,
        },
        {
          title: 'Restirct Scanning Area',
          value: data.enableScanRectOnly,
        },
      ]);
      setFormatSettings([
        {
          title: '1D',
          icon: 'barcode',
          data: data.barcode['1D'],
        },
        {
          title: '2D',
          icon: 'qrcode',
          data: data.barcode['2D'],
        },
      ]);
    });
  }, []);

  const toggleSwitch = (index, value) => {
    let settings = [...commonSettings];
    settings[index].value = value;
    setCommonSettings(settings);
    updateSettings();
  };

  const toggleCheckbox = item => {
    item.value = !item.value;
    let settings = [...formatSettings];
    setFormatSettings(settings);
    updateSettings();
  };

  const updateSettings = () => {
    let settings = {
      enableBeep: commonSettings[0].value,
      enableVibrate: commonSettings[1].value,
      enableAutoZoom: commonSettings[2].value,
      enableScanRectOnly: commonSettings[3].value,
      barcode: {
        '1D': formatSettings[0].data,
        '2D': formatSettings[1].data,
      },
    };
    SettingsService.updateSettings(settings);
  };
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaView}>
      <FlatList
        scrollEnabled={false}
        data={commonSettings}
        keyExtractor={(item, index) => 'common-settings-' + index.toString()}
        style={styles.flatList}
        renderItem={({item, index}) => (
          <View style={styles.flatItem}>
            <Text>{item.title}</Text>
            <Switch
              ios_backgroundColor="white"
              onValueChange={value => toggleSwitch(index, value)}
              value={item.value}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Common Settings</Text>
          </View>
        )}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Barcode Symbols</Text>
      </View>
      <SectionList
        keyExtractor={(item, index) => 'format-settings-' + index.toString()}
        sections={formatSettings}
        style={styles.sectionList}
        renderItem={({item, section}) => (
          <View style={styles.sectionItem}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => toggleCheckbox(item)}>
              <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                {item.type}
              </Text>
            </TouchableOpacity>
            <CheckBox
              title={item.type}
              boxType="square"
              value={item.value}
              onValueChange={() => toggleCheckbox(item)}
              containerStyle={{backgroundColor: 'transparent'}}
              animationDuration={0}
            />
          </View>
        )}
        renderSectionHeader={({section: {title, icon}}) => (
          <View style={styles.sectionHeader}>
            <Icon style={styles.sectionHeaderIcon} name={icon} />
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 45,
    height: 45,
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
    flexShrink: 0,
    backgroundColor: '#f4f5f8',
  },
  flatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.13)',
  },
  sectionList: {
    backgroundColor: '#f4f5f8',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: 'white',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.13)',
  },
  sectionHeaderIcon: {
    fontSize: 30,
    paddingLeft: 10,
    color: '#92949c',
  },
  sectionHeaderText: {
    paddingLeft: 20,
    color: '#92949c',
    fontWeight: '600',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 20,
    minHeight: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.13)',
  },
  touchableOpacity: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
});
