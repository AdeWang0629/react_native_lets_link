import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Payouts = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignSelf: 'center',
          width: '100%',
          padding: 10,
          marginTop: 10,
          paddingBottom: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons
            name={'arrow-back'}
            size={24}
            color={'#000000'}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 18,
            color: '#000000',
            
            fontFamily: 'Poppins-Medium',
          }}>
        Payout
        </Text>
        <Text></Text>
      </View>
      <View style={{height:70,width:"100%",borderBottomColor:"rgba(228, 232, 230, 1)",borderBottomWidth:1,alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row"}}>
        <Text style={{color:"black",fontSize:20, fontFamily: 'Poppins-SemiBold',}}>Total Payouts</Text>
        <Text style={{color:"rgba(101, 21, 172, 1)",fontSize:20, fontFamily: 'Poppins-SemiBold',}}>$0.00</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",marginTop:10}}>
        <Text style={{color:"black",fontSize:20, fontFamily: 'Poppins-SemiBold',width:"30%",textAlign:"center"}}>Date</Text>
        <Text style={{color:"black",fontSize:20, fontFamily: 'Poppins-SemiBold',width:"30%",textAlign:"center"}}>Coin</Text>
        <Text style={{color:"black",fontSize:20, fontFamily: 'Poppins-SemiBold',}}>Amount</Text>
      </View>
      {/* <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View>
      <View style={{height:50,width:"100%",alignItems:"center",justifyContent:"space-between",paddingHorizontal:"5%",flexDirection:"row",}}>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>Jun 26, 2023</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>10</Text>
        <Text style={{color:"black",fontSize:16, fontFamily: 'Poppins-Medium',}}>$163.90</Text>
      </View> */}
    </View>
  );
};

export default Payouts;


