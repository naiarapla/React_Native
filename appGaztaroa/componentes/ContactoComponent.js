import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { CONTACTOS } from '../comun/contactos';

function RenderContacto(props) {

    const contacto = props.contacto;
    
        if (contacto != null) {
            return(
            <Card>
              <Card.Title>{contacto.nombre}</Card.Title>
              <Card.Divider/>
              <Text style={{margin: 20}}>
                {contacto.descripcion}
              </Text>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Contacto extends Component {
  constructor(props) {
      super(props);
      this.state = {
          contactos: CONTACTOS
      };
  }

  render(){
      return (<RenderContacto contacto={this.state.contactos[0]} /> );
  } 
}

export default Contacto;