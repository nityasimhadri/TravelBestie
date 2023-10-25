// screens/ResultsScreen.js
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';

export default function ResultsScreen({ route }) {
  const { itineraries } = route.params;

  return (
    <ScrollView>
      {itineraries.map(itinerary => (
        <Card key={itinerary.id} style={{ marginBottom: 10 }}>
          <Card.Content>
            <Title>{itinerary.title}</Title>
            <Paragraph>{itinerary.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}
