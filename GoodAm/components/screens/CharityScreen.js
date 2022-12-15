// Author:           Uma Parhar
// Email:            parhar@wisc.edu
// CS Login:         uma
// Last Revision:    12/13/2022
//////////////////////////////////////////////////////////////

import React, {useState} from 'react';
import {View, Text, TextInput, Platform, ScrollView, Pressable, Button, TouchableOpacity, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import firestore from '@react-native-firebase/firestore';
import { Linking } from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';


/**
 * Charity Screen method, returns view for the charity tab in the app
 *
 * @param props 
 * @return A view of the charity page screen
 */
const CharityScreen = props => {

  //the search input that is updated each time the user edits the text
  const [searchInput, setSearchInput] = useState('');

  //the final search input that gets updated when the user hits "searc"
  const [finalSearchInput, setFinalSearchInput] = useState('');

  //search results about the finalSearchInput that is gained from the every.org API
  const [nonprofitSearchResults, setNonprofitSearchResults] = useState([]);

  //ein of favorite charity, use this as default "favorite" charity to donate to
  const [favoriteCharity, setFavoriteCharity] = useState('');

  //if the user is searching for something different from before, update the state variable, and clear the stars
  /*
    * TEST - In order to test this, perform the following process: search for a keyword, watch the page generate 
      the appropriate results -> search for something new -> make sure that upon hitting search that all the
      stars are unselected
  */
  searchForCharity = () => {
    if(searchInput != finalSearchInput){
      updateStarIcon(({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0
      }));
    }
    setSearchInput(finalSearchInput);

    //fetch request to get a json response containing all the nonprofit data we need
    //currently set to get the top 14 nonprofits that match the search input
    fetch("https://partners.every.org/v0.2/search/" + finalSearchInput + "?apiKey=4934bc69ecd7c295569bd7ee40473385&take=10").then((response) => response.json()).then((json) => printCharityinfo(json));
  }

  //this state variable represents all of the stars and their current state (if they have been favorited by the user)
  const [starIcon, updateStarIcon] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0,6: 0,7: 0, 8: 0,9: 0, 10: 0, 11: 0, 12: 0, 13: 0,14: 0});

  //unselects all stars on the page - no nonprofits are starred.
  /*
    * TEST - This method isn't called alone by the UI but is called within other methods, so it
      will be tested in those methods.
  */
  clearAllStars = () => {
    for(i = 0; i < 14; i ++){
      starIcon[i] = 0;
    }
    updateStarIcon(starIcon);
    addCharityData('');
  }

  //when the user clicks to select/deselect a star, update the UI and the database to reflect these changes
   /*
    * TEST1 - Star an item that was not previously selected. Does the star fill in, and is the charity in the DB 
      updated to reflect this?
    * TEST2 - Perform test 1. Deselect the star, is it unfilled in -> success, else failure. Verify that the charity
      in the database is now null, as nothing is selected. 
  */
  changeStarIcon = (i) => {
    const curr = starIcon[i];
    //if the star icon isn't currently selected, select it and update the appropriate state variables
    if(starIcon[i] == 0){
      clearAllStars();
      starIcon[i] = 1;
      updateStarIcon(starIcon);
      setFavoriteCharity(nonprofitSearchResults[i].key);
      addCharityData(nonprofitSearchResults[i].key);
    }
    //if the star icon is currently selected, deselect it and update the appropriate state variables
    else if(starIcon[i] == 1){
      clearAllStars();
      setFavoriteCharity('');
      addCharityData('');
    }
    searchForCharity();
  }

    //get the users ID from database
    const userID = firebase.auth().currentUser.uid;

    //add favorite charity to the database (for the current user)
  /*
    * TEST: Star a charity -> if the charity EIN shows up in the database as the users favorite charity
      -> success, else failure
  */
    const addCharityData = (ein) => {
      const charityID = uuid.v4();
      firestore()
        .collection('Users')
        .doc(userID)
        .update({FavoriteCharityEIN: ein})
        .then(() => {
          console.log('Charity Added to DB');
        });
    };

  //Prints the nonprofit information given the json response from the API call
  printCharityinfo = (json) => {
    let searchResult = json.nonprofits;
    const nonprofit_info = [];

    //go through each of the search results & populate our list with the data we need so that we can present it to the user
    for (let i = 0; i < searchResult.length; i++){
      nonprofit_info.push(<View style = {style.nps}><Text key = {searchResult[i].ein}><Text style = {{fontSize: 16, color:"black", fontWeight: "bold", marginVertical: 5}} onPress={() => Linking.openURL(searchResult[i].profileUrl)}>
      {searchResult[i].name + "    "}</Text>
      <TouchableOpacity 
                style = {{
                    justifyContent: 'center',
                    //padding: 10,
                    //margin: 5,
                    marginRight: 5,
                    height: 30,
                    width: '2%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    
                }}
                onPress={() => changeStarIcon(i)}
                >
             {starIcon[i] == 0  && <Image source={require('./starEmpty.png')} style = {{width: 25, height: 25}}/>}
             {starIcon[i] == 1  && <Image source={require('./starFilled.png')} style = {{width: 25, height: 25}}/>}
      </TouchableOpacity>
      </Text></View>)
    }
    setNonprofitSearchResults(nonprofit_info);
  }

  //get the current nonprofit search results that were generated by the API call
  getSearch = () => {
    return nonprofitSearchResults;
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
    bottom: 5
  },
  nps: {
    top: 5,
    marginTop: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 10,
  }
});

export default CharityScreen;
