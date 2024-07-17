import React,{useCallback, useState} from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
  Text
} from 'react-native';
import type { NavParams } from '../Navigation/types';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MyStatusBar from '../Component/MyStatusBar';

const { height } = Dimensions.get('window');

const getRandomSize = function () {
  const min = 400;
  const max = 800;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const images = new Array(20)
  .fill(0)
  .map(() => `https://picsum.photos/${getRandomSize()}/${getRandomSize()}`);


const headerImages=images.slice(0,3)
const bodyImage=images.slice(3)


export const Profile = () => {
  const { navigate } = useNavigation();
  
  const [selectedItems,setSelectedItems]=useState([])

  const handleItemSelect=(item:any)=>{
    let updateItemList=[...selectedItems,item]
    setSelectedItems([...updateItemList])
  }

  const getSelected = (item:any) => selectedItems.includes(item);

  const renderItem=useCallback(({index,item}:any)=>{
    console.log('item',item,getSelected(item))
    return(
        <TouchableOpacity 
            style={[styles.image,{borderWidth:1,borderColor:'red'}]} 
            key={index}  onPress={() => navigate('Photos', { item,index, images })}
            onLongPress={()=>handleItemSelect(item)}>
          <Image source={{uri:item}} style={{width: '100%',height: '100%'}} />
          {getSelected(item) && <View style={styles.dotCss}/>}
        </TouchableOpacity>
    )
  },[selectedItems])

  console.log("=====SELECTED ITEM========",selectedItems)

  const renderHeaderItem=()=>{
    return(
      <View style={styles.rowContainer}>
      {headerImages.map((uri, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => navigate('Photos', { uri,index, images }) } onLongPress={()=>handleItemSelect(uri)}>
              <Image source={{uri}} style={index==0 ?styles.image1 :styles.image} />
            </TouchableWithoutFeedback>
          ))}
      </View>
    )
  }

  // <TouchableWithoutFeedback onPress={() => navigate('Photos', { item,index, images }) } onLongPress={()=>handleItemSelect(item)} style={styles.image}>
  //     <View style={styles.image}>

  //           <Image source={{uri:item}} style={styles.image} />
  //           <View style={{height:25,width:25,borderRadius:15,backgroundColor:'yellow',position:'absolute',bottom:0,top:0}}/>
  //           </View>

  //       </TouchableWithoutFeedback>

  return (
    <View style={{ flex: 1}}>
       <MyStatusBar backgroundColor="#FFF" barStyle="dark-content" />
       {/* <ScrollView style={{flex:1}}> */}
        <View style={styles.container}>
          
          <FlatList 
            data={bodyImage}
            numColumns={3}
            // ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={renderItem} 
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeaderItem}
            ListFooterComponent={()=><Text>1231312</Text>}
          />

        </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  rowContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth:1,
    borderColor:'black',
  },
  image1:{
    width:'66.6%',
    height:320,
  },
  image: {
    width: '33.2%',
    height: 160,
    // height: (height / images.length) * 2,
  },
  dotCss:{height:25,width:25,borderRadius:15,backgroundColor:'red',position:'absolute',bottom:0,right:0}
});
