import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import NetworkStatusBar from '../components/networkStatusBar';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Server returned an error.');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Details', { user: item })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <NetworkStatusBar />

      <View style={styles.headerRow}>
        <Text style={styles.heading}>Users</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => {
              fetchUsers();
            }}
          >
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              dispatch(logout());
            }}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonRow: { gap: 10, flexDirection: 'row' },
  heading: { fontSize: 20, fontWeight: '700' },
  logoutButton: { padding: 8, borderRadius: 6, backgroundColor: '#ffdcdc' },
  logoutText: { color: '#b00020', fontWeight: '600' },
  refreshButton: { padding: 8, borderRadius: 6, backgroundColor: '#dcfffe' },
  refreshText: { color: '#00a7b0', fontWeight: '600' },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: '600' },
  email: { fontSize: 13, color: '#555' },
  error: { color: '#b00020' },
});
