import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SansFont from '../SansFont';
import { getIdToken } from '../firebase';
import { useUserData } from '../UserContext';
import { GetSpicyQuestions, AnswerSpicyQuestion } from '../backend';
import { LinearGradient } from 'expo-linear-gradient';


const SpicyTime = () => {
    const navigation = useNavigation();
    const { userData } = useUserData();
    const swiperRef = useRef(null);
    const [idToken, setIdToken] = useState(null);
    const [questions, setQuestions] = useState([]);


    useEffect(() => {
      getIdToken()
          .then(token => {
              console.log('ID token fetched:', token);
              setIdToken(token);
  
              // Fetch spicy questions using the idToken
              return GetSpicyQuestions(token);
          })
          .then(response => {
            console.log('Spicy Questions fetched:', response.questions);
            setQuestions(response.questions);
        })        
          .catch(error => {
              console.error('Error:', error);
          });
  }, []);
  
  const onSwipeLeft = (index) => {
      console.log("Answered No");
      AnswerSpicyQuestion(questions[index], 'No', idToken)
          .then(response => {
              console.log('Answer recorded:', response);
          })
          .catch(error => {
              console.error('Error recording answer:', error);
          });
  };
  
  const onSwipeRight = (index) => {
      console.log("Answered Yes");
      AnswerSpicyQuestion(questions[index], 'Yes', idToken)
          .then(response => {
              console.log('Answer recorded:', response);
          })
          .catch(error => {
              console.error('Error recording answer:', error);
          });
  };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon.Button name="close" backgroundColor="white" color="gray" borderRadius={39} size={30} onPress={() => navigation.goBack()} />
                <SansFont style={styles.headerText}>  Play Time 😈</SansFont>
            </View>
            <View style={styles.swiperContainer}>
                {questions.length > 0 ? (
                    <Swiper
                        ref={swiperRef}
                        cards={questions}
                        backgroundColor={'#1A212B'}
                        renderCard={(card) => (
                            // Inside the renderCard function
                            <LinearGradient
                                colors={['#A833E0', '#E832A7']}
                                start={[0, 0]}
                                end={[1, 0]}
                                style={styles.card}
                            >
                                <SansFont style={styles.questionText}>{card}</SansFont>
                                <View style={styles.buttons}>
                                    <View style={styles.iconContainer}>
                                        <Icon.Button name="times" backgroundColor="white" color="#A833E1" size={30} onPress={() => swiperRef.current.swipeLeft()} />
                                    </View>
                                    <View style={styles.iconContainer}>
                                        <Icon.Button
                                            name="heart"
                                            backgroundColor="white"
                                            color="#A833E1"
                                            size={30}
                                            onPress={() => swiperRef.current.swipeRight()}
                                        />
                                    </View>
                                </View>
                            </LinearGradient>
                        )}
                        onSwipedLeft={onSwipeLeft}
                        onSwipedRight={onSwipeRight}
                    />
                ) : (
                    <SansFont>Loading...</SansFont>
                )}
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
      marginTop: 50,
      width: '100%',
      height: '60%',
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
  },
  questionText: {
      fontSize: 24,
      fontWeight: '500',
      marginTop: 10,
      color: 'white',
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 10,
      width: '100%',
      paddingHorizontal: 20,
  },
  iconContainer: {
      backgroundColor: 'white',
      borderRadius: 60,
      padding: 10,
  },
});

export default SpicyTime;
