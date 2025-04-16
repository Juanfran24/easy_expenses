import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../Typography';
import colors from '@/src/constants/colors';

interface Tab {
  id: string;
  title: string;
}

interface TransactionTabsProps {
  tabs: Tab[];
  selectedTabId: string;
  onTabChange: (tabId: string) => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ 
  tabs,
  selectedTabId,
  onTabChange 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab.id}
            activeOpacity={0.7}
            style={styles.tab} 
            onPress={() => onTabChange(tab.id)}
          >
            <Typography.H5.Regular
              styles={[styles.tabText, selectedTabId === tab.id && styles.activeTabText]}
            >
              {tab.title}
            </Typography.H5.Regular>
            {selectedTabId === tab.id && <View style={styles.indicator} />}
            {selectedTabId !== tab.id && <View style={styles.inactiveIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.backgrounds.medium,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    color: colors.textsAndIcons.main,
    opacity: 0.7,
  },
  activeTabText: {
    color: colors.primary.main,
    opacity: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: '0%',
    right: '0%',
    height: 1,
    backgroundColor: colors.primary.main
  },
  inactiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '0%',
    right: '0%',
    height: 1,
    backgroundColor: colors.borders.medium
  }
});

export default TransactionTabs;