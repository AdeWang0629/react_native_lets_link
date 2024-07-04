/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {theme} from '../../theme';
import {Text, Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const ContactCard = ({title}: any) => {
  const {colors} = theme;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.cardContainer, {backgroundColor: colors.searchBar}]}
      onPress={() => {
        navigation.navigate('ContactDetail', {contactId: title.id});
      }}>
      <Avatar.Image
        size={65}
        source={require('../assets/icons/avatar.png')}
        style={{marginLeft: 10}}
      />
      <View
        style={{
          width: '50%',
        }}>
        <Text variant="titleMedium">
          {title.first_name} {title.last_name}
        </Text>

        <Text
          variant="bodyMedium"
          style={{width: 100, height: 20, color: colors.secondryColor}}>
          {title.msg}
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          right: 10,
        }}>
        <Text variant="bodySmall">{title.date}</Text>
        <Text variant="bodyMedium" style={{color: colors.primaryColor}}>
          {title.messageType}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 80,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
});
