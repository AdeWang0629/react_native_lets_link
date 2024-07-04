import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Textarea from 'react-native-textarea';
const ContactUs = ({navigation}) => {
  const [msg, setMsg] = useState('');
  return (
    <View style={styles.cotainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons
            name={'arrow-back'}
            size={24}
            color={'#000000'}
            style={{}}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Contact Support </Text>
        <Text></Text>
      </View>
      <View
        style={{
          width: '85%',
          alignSelf: 'center',
          marginTop: 30,
          flex: 1,
          height: '100%',
        }}>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={e => {
            setMsg(e);
          }}
          defaultValue={msg}
          maxLength={120}
          placeholder={'Tell us how we can help'}
          placeholderTextColor={'rgba(132, 129, 129, 1)'}
          underlineColorAndroid={'transparent'}
        />

        <Text
          style={{
            fontSize: 12,
            color: '#000000',
            marginTop: 20,
            fontFamily: 'Poppins-Regular',
          }}>
          Include device information? (Optional){`\n`}Technical details like your
          model and settings can help us answer your question.
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          color: '#000000',
          marginTop: 20,
          bottom: 50,
          left: 0,
          right: 0,
          position: 'relative',
          alignSelf: 'center',
          fontFamily: 'Poppins-Medium',
        }}>
        We will respond to you at your email
      </Text>
      <TouchableOpacity
        style={{
          height: 50,
          backgroundColor: '#6515AC',
          alignItems: 'center',
          justifyContent: 'center',
          width: '85%',
          borderRadius: 20,
          alignSelf: 'center',
          bottom: 40,
          left: 0,
          right: 0,
          position: 'relative',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            alignSelf: 'center',
            color: '#ffffff',
            fontFamily: 'Poppins-Bold',
          }}>
          Send Via Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  cotainer: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  logo: {
    width: 20,
    height: 35,
    // marginRight: 10
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    width: '100%',
    padding: 10,
    marginTop: 10,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginLeft: 15,
    fontFamily: 'Poppins-SemiBold',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#EFE8E8',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
});
