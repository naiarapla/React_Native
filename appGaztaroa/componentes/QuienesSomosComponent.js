import React, { Component } from 'react';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { SafeAreaView, FlatList, Text, View, ScrollView } from 'react-native';
import { ACTIVIDADES } from '../comun/actividades';
import { HISTORIA } from '../comun/historia';

function Historia(props) {

    const historia = props.historia;
    
        if (historia != null) {
            return(
            <Card>
              <Card.Title>{historia.nombre}</Card.Title>
              <Card.Divider/>
              <Text style={{margin: 20}}>
                {historia.descripcion}
              </Text>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}
class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES,
            historia: HISTORIA
        };
    }

    render(){  

    const renderQuienesSomosItem = ({item, index}) => {
        return (
            <ListItem  key={index}  bottomDivider>
                <Avatar source={require('./imagenes/40Años.png')} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
        );
    };

    return (
         <ScrollView>
            <Historia historia={this.state.historia[0]} />
           
            <Card>
              <Card.Title>"Actividades y recursos"</Card.Title>
              <Card.Divider/>
              <SafeAreaView>
            <FlatList 
                data={this.state.actividades}
                renderItem={renderQuienesSomosItem}
                keyExtractor={item => item.id.toString()}
            />
            </SafeAreaView>
            </Card>
         </ScrollView>
       
            
           
     
    );
    }
}

export default QuienesSomos;
