import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Form from '../components/Form';
import * as Yup from 'yup';
import firebase from '../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  name: Yup.string()
    .required()
    .min(2, 'Name must be at least 2 characters long')
    .label('Name'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirmation password must match password'),
});

const SignUpScreen = ({ navigation }) => {
  const [signInError, setSignInError] = useState('');

  const themeList =
    [{ title: "excited", color: "#ce51c6" },
    { title: "chill", color: "#72b583" },
    { title: "happy", color: "#eac752" },
    { title: "focused", color: "#569ac5" },
    { title: "calm", color: "#72bbe2" },
    { title: "relaxed", color: "#c59cd6" },
    { title: "motivated", color: "#64b6b3" },
    { title: "energized", color: "#e2a862" },
    { title: "empowered", color: "#9242b7" },
    { title: "romantic", color: "#da3a7d" }];

  const [themes, setThemes] = useState({ themeList });

  async function handleOnSignUp(values) {

    const { name, email, password } = values;
    setSignInError(null);
    try {
      const authCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = authCredential.user;
      await user.updateProfile({ displayName: name });
      const db = firebase.database().ref(`users/${user.uid}/`);
      db.set(themes);
      navigation.navigate('HomeScreen');
    } catch (error) {
      setSignInError(error.message);
    }
  }

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.form}>
        <Form
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleOnSignUp}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
          />
          <Form.Field
            name="name"
            leftIcon="circle"
            placeholder="Enter name"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Form.Button title='Sign Up' />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </SafeAreaView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  form: {
    width: '85%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '10%'
  },
});

export default SignUpScreen;
