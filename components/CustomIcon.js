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
  'globe': '\uf0ac',
  'search': '\uf002',
  'calendar-check': '\uf274',
  'layer-group': '\uf5fd',
  'tasks': '\uf0ae',
  'hospital': '\uf0f1',
  'code': '\uf121',
  'ad': '\uf641',
  'times-circle': '\uf057',
  'headset': '\uf590',
  'caret-down': '\uf0d7',
  'chevron-down': '\uf078',
  'check-circle': '\uf058',
  'filter': '\uf0b0',
  'user-edit': '\uf4ff',
  'camera': '\uf030',        
  'send': '\uf1d8',           
  'external-link-alt': '\uf35d',
  'phone': '\uf095',
  'chevron-up': '\uf077',
  'user-times': '\uf235',
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