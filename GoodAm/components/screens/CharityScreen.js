/*
Landing screen for the charity tab
*/
import React, {useState} from 'react';
import {View, Text, TextInput, Platform, ScrollView, Pressable, Button, TouchableOpacity, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import firestore from '@react-native-firebase/firestore';
import { Linking } from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const CharityScreen = props => {

  const [searchInput, setSearchInput] = useState('');
  const [finalSearchInput, setFinalSearchInput] = useState('');

  const [searchResult, setSearchResult] = useState([]);
  const [searchImgResult, setSearchImgResult] = useState([]);

  //ein of favorite charity, use this as default charity to donate to
  const [favoriteCharity, setFavoriteCharity] = useState('');

  searchForCharity = () => {
    if(searchInput != finalSearchInput){
      updateStarIcon(({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0
      }));
    }
    setSearchInput(finalSearchInput);

    fetch("https://partners.every.org/v0.2/search/" + finalSearchInput + "?apiKey=4934bc69ecd7c295569bd7ee40473385&take=15").then((response) => response.json()).then((json) => printCharityinfo(json));
    //setSearchResult(fetchRequest[0]["ein"]);
  }
  const [bcolor, changeColor] = useState(COLORS.indigoDye);
  const [starIcon, updateStarIcon] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,6: 0,7: 0, 8: 0,9: 0, 10: 0, 11: 0, 12: 0, 13: 0,14: 0});

  clearAllStars = () => {
    for(i = 0; i < 14; i ++){
      starIcon[i] = 0;
    }
    updateStarIcon(starIcon);
  }

  changeStarIcon = (i) => {
    const curr = starIcon[i];
    if(starIcon[i] == 0){
      clearAllStars();
      starIcon[i] = 1;
      updateStarIcon(starIcon);
      setFavoriteCharity(searchImgResult[i].key);
      addCharityData(searchImgResult[i].key);
    }
    else if(starIcon[i] == 1){
      clearAllStars();
      setFavoriteCharity('');
      addCharityData('');
    }
    searchForCharity();
  }

    //get the users ID from database
    const userID = firebase.auth().currentUser.uid;

    const addCharityData = (ein) => {
      // have this function add alarm data into database
      const charityID = uuid.v4();
      firestore()
        .collection('Users')
        .doc(userID)
        .update({FavoriteCharityEIN: ein})
        .then(() => {
          console.log('Charity Added to DB');
        });
    };

  printCharityinfo = (json) => {
    let np = json.nonprofits;

    const nonprofit_names = [];
    const nonprofit_info = [];

    for (let i = 0; i < np.length; i++){
      nonprofit_info.push(<Text key = {np[i].ein}><Text style = {{fontSize: 15, top:30, bottom:30, color:"blue", fontWeight: "bold", textDecorationLine:"underline"}} onPress={() => Linking.openURL(np[i].profileUrl)}>
      {np[i].name}</Text>
      <TouchableOpacity 
                style = {{
                    justifyContent: 'center',
                    padding: 10,
                    height: 30,
                    width: '2%',
                    flexDirection: 'row',
                    
                }}
                onPress={() => changeStarIcon(i)}
                >
             {starIcon[i] == 0  && <Image source={require('./starEmpty.png')} style = {{width: 25, height: 25}}/>}
             {starIcon[i] == 1  && <Image source={require('./starFilled.png')} style = {{width: 25, height: 25}}/>}
            </TouchableOpacity>
      </Text>)
    }
    setSearchResult(nonprofit_names);
    setSearchImgResult(nonprofit_info);
  }

  getSearch = () => {
    return searchImgResult;
  }

  return (
    <View style={style.container}>
      <Text style={style.font}>Search for a Charity</Text>
      <TextInput //allows for user text input
        placeholderTextColor={COLORS.indigoDye}
        style={style.input}
        onChangeText={newSearchVal => setFinalSearchInput(newSearchVal)}
      />

      <ReusableButton
        title="Search"
        onPress={searchForCharity}
        style={style.search}></ReusableButton>
      <View style = {style.listNonprofits}>
        {getSearch()}
      </View>
    </View>
    
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.naplesYellow,
    paddingBottom: '25%'
  },
  font: {
    fontSize: 20,
    color: COLORS.indigoDye,
  },
  input: {
    margin: 15,
    height: 40,
    width: 200,
    borderColor: COLORS.indigoDye,
    borderWidth: 3,
    color: COLORS.indigoDye,
    fontSize: 20,
    top: 10,
  },
  individualNP: {
    top: 20,
    bottom: 20,
    color: COLORS.indigoDye,
  },
  listNonprofits: {
    marginVertical: 10,
    alignItems: 'center',
    left: 5
  },
  checkbox: {
    width: 64,
    height: 64
  },
  search: {
    bottom: 10
  }
});

export default CharityScreen;
