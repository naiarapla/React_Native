import React, { Component } from 'react';
import { ListItem, Avatar, Card } from 'react-native-elements';
import { SafeAreaView, FlatList, Text, View, ScrollView } from 'react-native';
//import { HISTORIA } from '../comun/historia';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      actividades: state.actividades
    }
  }

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
            //actividades: ACTIVIDADES,
            historia:   [
                {
                    id: 0,
                    nombre: 'Un poquito de historia',
                    destacado: true,
                    descripcion:'El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.'+"\n"+
                    ' '+"\n"+
                    'Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.'+"\n"+
                    ' '+"\n"+'Gracias!'
                }
                ]
        };
    }

    render(){  

    //const renderQuienesSomosItem = ({item, index}) => {
        const renderActividadItem = ({item, index}) => {
        return (
            <ListItem  key={index}  bottomDivider>
                {/*<Avatar source={require('./imagenes/40Años.png')} />*/}
                <Avatar source={{uri: baseUrl + item.imagen}} />
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
                //data={this.state.actividades}
                //renderItem={renderQuienesSomosItem}
                //keyExtractor={item => item.id.toString()}
                data={this.props.actividades.actividades}
                renderItem={renderActividadItem}
                //renderItem={renderQuienesSomosItem}
                keyExtractor={item => item.id.toString()}

            />
            </SafeAreaView>
            </Card>
         </ScrollView>
       
            
           
     
    );
    }
}

//export default QuienesSomos;
export default connect(mapStateToProps)(QuienesSomos);
