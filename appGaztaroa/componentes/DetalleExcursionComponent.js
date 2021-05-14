import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito } from '../redux/ActionCreators';
import { postComentario } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      comentarios: state.comentarios,
      favoritos: state.favoritos
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario)),
})


function RenderExcursion(props) {

    const excursion = props.excursion;
    
        if (excursion != null) {
            return(
            <Card>
              <Card.Image source = {{ uri: baseUrl + excursion.imagen }}>
                <Card.Title style={styles.cardTitleStyle}>{excursion.nombre}</Card.Title>
              </Card.Image>
              <Text style={{margin: 20}}>
                {excursion.descripcion}
              </Text>
              <View style={styles.icon}>
              <Icon 
                raised
                reverse
                name={ props.favorita ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
                />
                <Icon
                raised
                reverse
                name={ 'pencil' }
                type='font-awesome'
                color={colorGaztaroaOscuro}
                onPress={() => props.onClick()}
                />
                </View>
            </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComentario(props) {

  const comentarios = props.comentarios;
          
  const renderCommentarioItem = ({item, index}) => {
      
      return (
          <View key={index} style={{margin: 10}}>
              <Text style={{fontSize: 14}}>{item.comentario}</Text>
              <Text style={{fontSize: 12}}>{item.valoracion} Stars</Text>
              <Text style={{fontSize: 12}}>{'-- ' + item.autor + ', ' + item.dia} </Text>
          </View>
      );
  };
  
  return (
      <Card>
        <Card.Title>Comentarios</Card.Title>
        <Card.Divider/>
        <FlatList 
            data={comentarios}
            renderItem={renderCommentarioItem}
            keyExtractor={item => item.id.toString()}
            />
      </Card>
  );
}


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        autor: "  Autor",
        comentario: "  Comentario",
        valoracion: 3,
        showModal: false
    }
}
gestionarComentario(excursionId, valoracion, autor, comentario) {
  console.log(JSON.stringify(this.state));
  this.props.postComentario(excursionId, valoracion, autor, comentario);
  this.toggleModal();
}

toggleModal() {
  this.setState({showModal: !this.state.showModal});
}

resetForm() {
  this.setState({
      autor: "  Autor",
      comentario: "  Comentario",
      valoracion: 3,
      showModal: false
  });
}

  

  marcarFavorito(excursionId) {
    //this.setState({favoritos: this.state.favoritos.concat(excursionId)});
    this.props.postFavorito(excursionId);
    }

  render(){
    const {excursionId} = this.props.route.params;

    return(
        <ScrollView>
            <RenderExcursion
                excursion={this.props.excursiones.excursiones[+excursionId]}
                //favorita={this.state.favoritos.some(el => el === excursionId)}
                favorita={this.props.favoritos.some(el => el === excursionId)}
                onPress={() => this.marcarFavorito(excursionId)}
                onClick={() => this.toggleModal() }
                //this.gestionarOpinion(excursionId,this.state.valoracion,this.state.autor,this.state.comment)
            />
            <RenderComentario
                comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)}
           
           />
              <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => {this.toggleModal()}}
                onRequestClose = {() => {this.toggleModal()}}>
                <View style = {styles.modal}>
                <Rating
                  showRating
                  name="hover-feedback"
                  onFinishRating={rating => {console.log(rating); this.setState({ valoracion: rating })}}
            
                />
                <View style= {styles.input}>
                  <Input 
                  placeholder={this.state.autor}
                  leftIcon={{ type: 'font-awesome', name: 'user'}}
                  onChangeText={value => this.setState({ autor: value })}
                  />
                  <Input 
                  placeholder={this.state.comentario}
                  leftIcon={{ type: 'font-awesome', name: 'comment'}}
                  onChangeText={value => this.setState({ comentario: value })}
                  />
                  <Button 
                        onPress = {() =>{this.gestionarComentario(excursionId,this.state.valoracion,this.state.autor,this.state.comentario); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="ENVIAR" 
                        />
                  <Button 
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="CANCELAR" 
                      />
                  </View>
                </View>
            </Modal>
        </ScrollView>
    );
  } 
}

const styles = StyleSheet.create({
    cardTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    icon:{
      alignItems: 'center',
      textAlign:'center',
      flexDirection:'row',
      justifyContent: 'center',
     
     
    },
    modal:{
      marginTop:50
    },
    input: {
      marginLeft: 25,
      marginRight: 25,
      marginTop: 13,
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);