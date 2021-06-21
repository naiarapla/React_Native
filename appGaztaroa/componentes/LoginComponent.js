import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { postLogin } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    login: state.login,
  }
}

const mapDispatchToProps = dispatch => ({
  postLogin: (email, password, stateLogin) => dispatch(postLogin(email, password, stateLogin)),
})

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      stateLogin: false
    }
}

gestionarLogin(email, password, stateLogin) {
  const apiKey = "AIzaSyDICIjP7IKoeLOnyhYVTdHtgD9LZLSAGng";
  let url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .catch(err => {
      console.log(err);
      alert("Autentificación fallida, por favor inténtalo de nuevo!");
    })
    .then(res => res.json())
    .then(parsedRes => {
      console.log(parsedRes);
      if (!parsedRes.idToken) {
        alert("Algo va mal... Por favor comprueba tus datos!");
      } else {
        this.setState({stateLogin: true});
        this.props.postLogin(this.state.email, this.state.password, this.state.stateLogin);
        //console.log(this.state.stateLogin);
        //console.log(JSON.stringify(this.props.login.login[0].email)); 
        const { navigate } = this.props.navigation; 
        navigate('Home');
      }
    });
  
}

logoutUser(){
  this.setState({email:""});
  this.setState({password:""});
  this.setState({stateLogin: false});
  this.props.postLogin(this.state.email, this.state.password, this.state.stateLogin);
  const { navigate } = this.props.navigation; 
        navigate('Home');
}

render() {
  if(this.props.login.login[0].stateLogin===false){
  const { navigate } = this.props.navigation; 
    return(
                <Card>
                    <Card.Image source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-react-native.appspot.com/o/imagenes%2Fmendiak.png?alt=media&token=42e50447-313e-40d6-a944-491cc7d1499d' }}>
                    <Card.Title style={styles.cardTitleStyle}>Iniciar sesión</Card.Title>
                    </Card.Image>
                       <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText= {value => this.setState({ email: value })} //{val => this.updateInputState("email", val)}
                        underlineColorAndroid="#1E90FF"
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        value={this.state.password}
                        onChangeText={value => this.setState({ password: value })}//{val => this.updateInputState("password", val)}
                        underlineColorAndroid="#1E90FF"
                        style={styles.input}
                        secureTextEntry
                      />
                     
                       <Button title="Login" onPress={() =>this.gestionarLogin(this.state.email,this.state.password,this.state.stateLogin)} style={styles.button } disabled={(this.state.email === "" || this.state.password === "")}/>
                       <Text style={styles.text}>¿Todavía no tienes cuenta? <Text onPress = {() => navigate('Registrarse')} style={styles.navigateText}>Registrarse</Text></Text>
                    
                </Card>
     
      // <View style={styles.contianer}>
      // <Image style={{ width: 300, height: 200 }} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-react-native.appspot.com/o/imagenes%2Fmendiak.png?alt=media&token=42e50447-313e-40d6-a944-491cc7d1499d'}} />
      //   <View style={styles.headerView}>
      //     <Text style={styles.header}>Iniciar sesión</Text>
      //   </View>
      //   <TextInput
      //     placeholder="Email"
      //     autoCapitalize="none"
      //     value={this.state.email}
      //     onChangeText= {value => this.setState({ email: value })} //{val => this.updateInputState("email", val)}
      //     underlineColorAndroid="#1E90FF"
      //     style={styles.input}
      //   />
      //   <TextInput
      //     placeholder="Contraseña"
      //     autoCapitalize="none"
      //     value={this.state.password}
      //     onChangeText={value => this.setState({ password: value })}//{val => this.updateInputState("password", val)}
      //     underlineColorAndroid="#1E90FF"
      //     style={styles.input}
      //     secureTextEntry
      //   />
      // <View style={styles.button}>
      //   <Button title="Login" onPress={() =>this.gestionarLogin(this.state.email,this.state.password,this.state.stateLogin)} style={styles.button } disabled={(this.state.email === "" || this.state.password === "")}/>
      // </View>
      // <Text style={styles.text}>¿Todavía no tienes cuenta? <Text onPress = {() => navigate('Registrarse')} style={styles.navigateText}>Registrarse</Text></Text>
      // </View>
    )}else{
      return(
        <Card>
        <Card.Image source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-react-native.appspot.com/o/imagenes%2Fmendiak.png?alt=media&token=42e50447-313e-40d6-a944-491cc7d1499d' }}>
        <Card.Title style={styles.cardTitleStyle}>Cerrar sesión</Card.Title>
        </Card.Image>
           <Text style={styles.cierre}>Te esperamos. Hasta pronto! </Text>
        <Button title="Cerrar sesión" onPress={() => this.logoutUser()} style={styles.button } />
    </Card>
        // <View style={styles.contianer}>
        //   <View style={styles.headerView}>
        //     <Text style={styles.header}>Cerrar sesión</Text>
        //   </View>
        // <View style={styles.button}>
        //   <Button title="Cerrar sesión" onPress={() => this.logoutUser()} style={styles.button } />
        // </View>
        // </View>
      )

    }
  }
}
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerView: {
    marginBottom: 20
  },
  header: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#1E90FF"
  },
  text: {
    color: "black",
    fontSize:15
  },
  navigateText: {
    color: "#1E90FF"
  },
  input: {
    marginTop:10,
    width: "70%",
    fontSize:17
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
  },
  cardTitleStyle: {
    color: 'chocolate',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  cierre: {
    color: 'black',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);