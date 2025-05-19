import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Typography from '../Typography';
import colors from '@/src/constants/colors';
import { FlexBox } from '../FlexBox';

interface AlertModalProps {
  visible: boolean;
  type: 'success' | 'error';
  titleMessage: string;
  textMessage: string;
  onDismiss: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  type,
  titleMessage,
  textMessage,
  onDismiss,
}) => {
  const textColor = type === 'success' ? colors.success : colors.error.main;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <TouchableOpacity 
        style={styles.containerModal}
        onPress={onDismiss}
        activeOpacity={1}
      >
        <View style={styles.alertContainer}>          
          <FlexBox style={styles.contentContainer}>
            <MaterialIcons
              name="error"
              size={24}
              color={textColor}
              style={styles.icon}
            />
            <FlexBox style={styles.textContainer}>
              <Typography.H6.Regular
                styles={{ 
                  color: textColor,
                }}
              >
                {titleMessage}
              </Typography.H6.Regular>
              <Typography.P4.Regular
                styles={{ 
                  color: textColor,
                }}
              >
                {textMessage}
              </Typography.P4.Regular>
            </FlexBox>
          </FlexBox>
          <View style={[styles.bottomContainer, { borderColor: textColor }]} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  alertContainer: {
    backgroundColor: colors.backgrounds.light,
    borderRadius: 10,
    padding: 16,
    marginTop: '45%',
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
  },
  icon: { 
    width: 20,
    height: 20,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderBottomWidth: 4,
  }
});

export default AlertModal;