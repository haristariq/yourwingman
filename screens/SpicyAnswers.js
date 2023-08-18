import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SansFont from '../SansFont';
import { getIdToken } from '../firebase';
import { useUserData } from '../UserContext';
import { GetSpicyAnswers } from '../backend';
import { LinearGradient } from 'expo-linear-gradient';

const SpicyAnswers = () => {
  const navigation = useNavigation();
  const { userData } = useUserData();
  const [idToken, setIdToken] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getIdToken()
      .then(token => {
        setIdToken(token);
        return GetSpicyAnswers(token);
      })
      .then(response => {
        console.log('Raw response from backend:', response);
        const answersList = Object.entries(response.answers).map(([question, answer]) => ({ question, answer }));
        setAnswers(answersList);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const AnswerCard = ({ item }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
      <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)} style={styles.card}>
        <LinearGradient
          colors={['#A833E0', '#E832A7']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradient}
        >
          <SansFont style={styles.cardText}>{showAnswer ? item.answer : item.question}</SansFont>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const PartnerAnswerCard = ({ item }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
      <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)} style={styles.LowerCard}>
        <LinearGradient
          colors={['#A833E0', '#E832A7']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradient}
        >
          <SansFont style={styles.cardText}>{showAnswer ? item.answer : item.question}</SansFont>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon.Button 
          name="close" 
          backgroundColor="white" 
          color="gray" 
          borderRadius={39} 
          size={30} 
          onPress={() => navigation.goBack()} 
        />
        <SansFont style={styles.headerText}>  Play Time 😻</SansFont>
      </View>

      <View style={[styles.TitleButtons, styles.titleButtonsContainer]}>
        <TouchableOpacity 
          style={[styles.customButton, styles.leftButton]} 
          onPress={() => navigation.navigate('SpicyTime')}
        >
          <SansFont style={styles.buttonText}>Play</SansFont>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.customButton, styles.rightButton]} 
          onPress={() => navigation.navigate('SpicyAnswers')}
        >
          <SansFont style={styles.buttonText}>Answers</SansFont>
        </TouchableOpacity>
      </View>
      
      <SansFont style={styles.questionsTitle}>Answers</SansFont>

      <View style={styles.swiperContainer}>
        <FlatList 
          horizontal={true}
          data={answers}
          renderItem={({ item }) => <AnswerCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <SansFont style={styles.PartnerTitle}>Your Partner's Answers</SansFont>


      {/* Duplicated FlatList */}
      <View style={styles.swiperContainer}>
        <FlatList 
          horizontal={true}
          data={answers}
          renderItem={({ item }) => <PartnerAnswerCard item={item} />}
          keyExtractor={(item, index) => 'duplicate_' + index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1A212B',
  },
  swiperContainer: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1000,
    backgroundColor: '#1A212B',
    marginBottom: -60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 10,
    color: 'white',
  },
  card: {
    width: 350,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 10,
    overflow: 'hidden', // This ensures the gradient won't overflow.
  },

  LowerCard: {
    width: 350,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginHorizontal: 10,
    overflow: 'hidden', // This ensures the gradient won't overflow.
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // This will make the gradient cover the entire card.
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  cardText: {
    flexShrink: 1,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  questionsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: '20%',
  },

  PartnerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginTop: '10%',
  },

  titleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: '10%',
    marginBottom: '-12%',
  },
  leftButton: {
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  rightButton: {
    marginRight: 10,
    borderWidth: 2,
    backgroundColor: '#B333D8',
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 60,  
  },
  customButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: '10%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SpicyAnswers;
