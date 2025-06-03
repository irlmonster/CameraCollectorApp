import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';


export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Bildinsamlar-App 🚀</Text>
      <Link href="/camera" asChild>
        <Button title="Starta Kamera" />
      </Link>
    </View>
  );
}
