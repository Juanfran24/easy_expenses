import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Modal, Dimensions } from 'react-native';
import Typography from '../Typography';
import colors from '@/src/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { FlexBetween } from '../FlexBox/FlexBetween';
import { FlexBox } from '../FlexBox';
import { Transaction } from '@/src/models/Transaction';

interface TransactionCardProps{
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onEdit,
}) => {
  const {
    type,
    amount,
    description,
    date,
  } = transaction;

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isIncome = type === 'ingreso';
  const menuButtonRef = useRef<View>(null);
  const screenWidth = Dimensions.get('window').width;
  const menuWidth = 150; // Ancho fijo del menú
  
  const handleMenuPress = () => {
    if (menuButtonRef.current) {
      menuButtonRef.current.measureInWindow((x, y, height) => {
        // Calcular la posición X para que el menú no se salga de la pantalla
        let menuX = x - menuWidth + 30;
        
        // Si el menú se sale por la derecha, ajustarlo
        if (menuX + menuWidth > screenWidth - 16) {
          menuX = screenWidth - menuWidth - 16; // 16 es el padding de la pantalla
        }
        
        // Si el menú se sale por la izquierda, ajustarlo
        if (menuX < 16) {
          menuX = 16;
        }

        setMenuPosition({ x: menuX, y: y + height + 4 });
        setMenuVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleCloseMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const handleMenuAction = (action: 'edit' | 'delete') => {
    if (action === 'edit') {
      handleEditTransaction();
    } else {
      // Handle delete action
      console.log('Delete pressed');
    }
    handleCloseMenu();
  };

  const handleEditTransaction = () => {
    if (onEdit) {
      onEdit(transaction);
    }
  };

  return (
    <View style={styles.card}>
      <FlexBetween>
        <FlexBox style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons 
              name={isIncome ? 'arrow-upward' : 'arrow-downward'} 
              size={24} 
              color={isIncome ? colors.complements.green : colors.error.main}
            />
          </View>
          <FlexBox style={{ flex: 1 }}>
            <Typography.H6.SemiBold>{description}</Typography.H6.SemiBold>
            <Typography.P4.Regular styles={styles.date}>{date.toLocaleDateString()}</Typography.P4.Regular>
          </FlexBox>
        </FlexBox>

        <FlexBox style={styles.rightContent}>
          <Typography.H6.SemiBold
            styles={{
              color: isIncome ? colors.complements.green : colors.error.main,
            }}
          >
            {isIncome ? '+' : '-'}${amount.toFixed(2)}
          </Typography.H6.SemiBold>
          
          <View ref={menuButtonRef}>
            <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
              <MaterialIcons 
                name="more-vert" 
                size={24} 
                color={colors.textsAndIcons.dark} 
              />
            </TouchableOpacity>
          </View>
        </FlexBox>
      </FlexBetween>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseMenu}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={handleCloseMenu}
          activeOpacity={1}
        >
          <Animated.View 
            style={[
              styles.menuContent,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0]
                  })
                }],
                position: 'absolute',
                left: menuPosition.x,
                top: menuPosition.y,
                width: menuWidth,
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction('edit')}
            >
              <MaterialIcons name="edit" size={20} color={colors.textsAndIcons.main} />
              <Typography.P3.Regular styles={styles.menuItemText}>Editar</Typography.P3.Regular>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuAction('delete')}
            >
              <MaterialIcons name="delete" size={20} color={colors.error.main} />
              <Typography.P3.Regular styles={[styles.menuItemText, { color: colors.error.main }]}>
                Eliminar
              </Typography.P3.Regular>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgrounds.medium,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    backgroundColor: colors.backgrounds.light,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    color: colors.textsAndIcons.dark,
    marginTop: 4,
  },
  menuButton: {
    padding: 4,
  },
  menuContent: {
    backgroundColor: colors.backgrounds.light,
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
  menuItemText: {
    color: colors.textsAndIcons.main,
  },
});

export default TransactionCard;