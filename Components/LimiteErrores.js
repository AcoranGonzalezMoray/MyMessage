import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text } from "react-native";
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
      // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return(
          <View>
          <Text>NSDFONSDFNSDOFNSDFN</Text>
        </View>
        )
      }
  
      return this.props.children; 
    }
  }