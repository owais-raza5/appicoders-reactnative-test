import { Text, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const user = route.params?.user || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Email: </Text>
        {user.email}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Phone: </Text>
        {user.phone}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Website: </Text>
        {user.website}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Company: </Text>
        {user.company?.name || '-'}
      </Text>
      <Text style={styles.row}>
        <Text style={styles.label}>Address: </Text>
        {user.address
          ? `${user.address.suite}, ${user.address.street}, ${user.address.city}`
          : '-'}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  row: { fontSize: 16, marginBottom: 8 },
  label: { fontWeight: '700' },
});
