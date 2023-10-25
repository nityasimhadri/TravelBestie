
import { Button, PaperProvider } from 'react-native-paper';
import theme from './theme/theme.js';
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
      </PaperProvider>
  );
}

