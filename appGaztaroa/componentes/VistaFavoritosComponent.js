import React, { Component } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView, FlatList, View, Alert} from 'react-native';
import  Swipeout  from 'react-native-swipeout';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { borrarFavorito } from '../redux/ActionCreators';
import { IndicadorActividad} from './IndicadorActividadComponent';


const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        favoritos: state.favoritos
    }
  }

  const mapDispatchToProps = dispatch => ({
    borrarFavorito: (excursionId) => dispatch(borrarFavorito(excursionId)),
})
class VistaFavoritos extends Component {
  
    render(){
        
    const renderFavoritoItem = ({item, index}) => {
        const createAlert = () =>
        Alert.alert(
          "Borrar excursión favorita?",
          "Confirme que desea borrar la excursión: " + item.nombre,
          [
            {
              text: "Cancelar",
              onPress: () => console.log(item.nombre + ' Favorito no borrado'),
              style: "cancel"
            },
            { text: "OK", onPress: () => this.props.borrarFavorito(item.id)}
          ]
        );
        const rightButton = [
            {
                text: 'Borrar', 
                type: 'delete',
                onPress: createAlert
            }
        ];
        
        return (
            <Swipeout right={rightButton} autoClose={true}>  
            <ListItem
                key={index}
                bottomDivider>
                <Avatar source={{uri: baseUrl + item.imagen}} />
                <ListItem.Content>
                    <ListItem.Title>{item.nombre}</ListItem.Title>
                    <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem> 
           </Swipeout>
        );
        
    };

    if(this.props.favoritos.length == 0){
        return(<View></View>);
    }else{
    //console.log(JSON.stringify(this.props.favoritos));
    for(var i=0; i<this.props.favoritos.length;i++){
        //console.log(JSON.stringify(i));
        //console.log(JSON.stringify(this.props.favoritos.length));
        if(i==0){
        var excurfav= this.props.excursiones.excursiones.filter((excursion) => excursion.id === this.props.favoritos[i]);
        }
        if(this.props.favoritos.length!=1){
          excurfav= excurfav.concat(this.props.excursiones.excursiones.filter((excursion) => excursion.id === this.props.favoritos[i+1]));
        }
      
    }
    //console.log(JSON.stringify(excurfav));
    //console.log(JSON.stringify(this.props.favoritos));
   
        return (
      <SafeAreaView>
            <FlatList 
                data={excurfav}
                renderItem={renderFavoritoItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );}
          

    }
 
}

export default connect(mapStateToProps, mapDispatchToProps)(VistaFavoritos);