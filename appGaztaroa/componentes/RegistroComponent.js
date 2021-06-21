import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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

class Registrarse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword:"",
      stateLogin: false
    }
}

registroDatos = () => {
  if(this.state.password===this.state.confirmPassword){
  const apiKey = "AIzaSyDICIjP7IKoeLOnyhYVTdHtgD9LZLSAGng";
url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
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
      });}else{
        alert("Algo va mal... las contraseñas no coinciden!");
      }
};
render() {
  const { navigate } = this.props.navigation; 
    return(
      <Card>
      <Card.Image source = {{ uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-react-native.appspot.com/o/imagenes%2Fmendiak.png?alt=media&token=42e50447-313e-40d6-a944-491cc7d1499d' }}>
      <Card.Title style={styles.cardTitleStyle}>Regístrate</Card.Title>
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
       <TextInput
          placeholder="Confirma contraseña"
          autoCapitalize="none"
          value={this.state.confirmPassword}
          onChangeText={value => this.setState({ confirmPassword: value })}
          underlineColorAndroid="#1E90FF"
          style={styles.input}
          secureTextEntry
        />
         <Button title="Registrarse" onPress={this.registroDatos} disabled={(this.state.email === "" || this.state.password=== ""|| this.state.confirmPassword=== "")}/>
         <Text style={styles.text}>¿Ya tienes cuenta? <Text onPress = {() => navigate('Login')} style={styles.navigateText}>Login</Text></Text>
      
  </Card>
      // <View style={styles.contianer}>
      //   <View style={styles.headerView}>
      //     <Text style={styles.header}>Regístrate</Text>
      //   </View>
      //   <TextInput
      //     placeholder="Email"
      //     autoCapitalize="none"
      //     value={this.state.email}
      //     onChangeText={value => this.setState({ email: value })}
      //     underlineColorAndroid="#1E90FF"
      //     style={styles.input}
      //   />
      //   <TextInput
      //     placeholder="Contraseña"
      //     autoCapitalize="none"
      //     value={this.state.password}
      //     onChangeText={value => this.setState({ password: value })}
      //     underlineColorAndroid="#1E90FF"
      //     style={styles.input}
      //     secureTextEntry
      //   />
      //   <TextInput
      //     placeholder="Confirma contraseña"
      //     autoCapitalize="none"
      //     value={this.state.confirmPassword}
      //     onChangeText={value => this.setState({ confirmPassword: value })}
      //     underlineColorAndroid="#1E90FF"
      //     style={styles.input}
      //     secureTextEntry
      //   />
      // <View style={styles.button} >
      //   <Button title="Registrarse" onPress={this.registroDatos} disabled={(this.state.email === "" || this.state.password=== ""|| this.state.confirmPassword=== "")}/>
      // </View>
      // <Text style={styles.text}>¿Ya tienes cuenta? <Text onPress = {() => navigate('Login')} style={styles.navigateText}>Login</Text></Text>
      // </View>
    )
  }
}
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerView: {
    marginBottom: 25
  },
  header: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#1E90FF"
  },
  text: {
    color: "black"
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
    marginBottom: 15
  },
  cardTitleStyle: {
    color: 'chocolate',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Registrarse);