import React from 'react';
import { Text } from 'react-native';

const ICON_MAP = {
  'home': '\uf015',
  'boxes': '\uf468',
  'concierge-bell': '\uf562',
  'shopping-cart': '\uf07a',
  'chevron-right': '\uf054',
  'trash-alt': '\uf2ed',
  'map-marker-alt': '\uf3c5',
  'phone-alt': '\uf879',
  'envelope': '\uf0e0',
  'eye': '\uf06e',
  'eye-slash': '\uf070',
  'fingerprint': '\uf577',
  'arrow-left': '\uf060',
  'user-circle': '\uf2bd',
  'arrow-right': '\uf061',
  'comments': '\uf086',
  'user-alt': '\uf406',
  'sign-out-alt': '\uf2f5',
  'question-circle': '\uf059',
  'file-alt': '\uf15c',
};

export default function CustomIcon({ name, size = 24, color = 'black', type = 'Solid' }) {
  const fontFamily = `FA7-${type}`; 
  
  return (
    <Text style={{ 
      fontFamily, 
      fontSize: size, 
      color: color 
    }}>
      {ICON_MAP[name] || '?'}
    </Text>
  );
}