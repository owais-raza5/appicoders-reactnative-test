import { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';
import { emailRegex } from '../utils/constants';
import NetworkStatusBar from '../components/networkStatusBar';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuth) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const validate = () => {
    const err = {};
    if (!email || !emailRegex.test(email)) {
      err.email = 'Please enter a valid email.';
    }
    if (!password || password.length < 6) {
      err.password = 'Password must be at least 6 characters.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      dispatch(login({ email }));
    }
  };

  return (
    <View style={styles.container}>
      <NetworkStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: null })}
        style={styles.loginWrapper}
      >
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#535353"
          style={styles.input}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#535353"
          style={styles.input}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loginWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#2f6bed',
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  error: {
    color: '#b00020',
    marginBottom: 8,
  },
});
