import React, { Component , useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Platform, Modal } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorGaztaroaOscuro } from '../comun/comun';
import * as Calendar from "expo-calendar"


class PruebaEsfuerzo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edad: 18,
            federado: false,
            fecha: new Date(),
            showModal: false
        }
    }
    async calendarioReserva() {
       // useEffect(() => {
            (async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            //console.log('Here are all your calendars:');
            //console.log({ calendars });
        }
        })();
        //}, []);
        async function getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendars = calendars.filter(each => each.source.type === 'local');
        return defaultCalendars[0].id;
        //console.log({ defaultCalendars});
    }

        
            const defaultCalendarId =
              Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
                //console.log({ defaultCalendarSource});
            // const newCalendarID = await Calendar.createCalendarAsync({
            //   title: 'Expo Calendar',
            //   color: 'blue',
            //   entityType: Calendar.EntityTypes.EVENT,
            //   sourceId: defaultCalendarSource.id,
            //   source: defaultCalendarSource,
            //   name: 'internalCalendarName',
            //   ownerAccount: 'personal',
            //   accessLevel: Calendar.CalendarAccessLevel.OWNER,
            // });
            // console.log(`Your new calendar ID is: ${newCalendarID}`);
            const details = {
                startDate: this.state.fecha,
                endDate: this.state.fecha,
                title: "Prueba de esfuerzo",
              };
              
              try {
                //console.log('Adding Event');
              
                const eventId = await Calendar.createEventAsync(defaultCalendarId, details);
              
                //console.log(eventId);
                //const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                //const calendar = calendars.filter(each => each.id === "9807AE3C-630E-47B6-8287-92FC0BB50CCA");
                //console.log({ calendar});
                //Calendar.openEventInCalendar(eventId);
              }
              catch(error) {
                console.log('Error', error);
              }
          
    //}
        

    }
   
    gestionarReserva() {
        //console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.calendarioReserva();
    }

    resetForm() {
        this.setState({
            edad: 18,
            federado: false,
            fecha: new Date(),
            showModal: false
        });
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    seleccionarFecha = (event, selectedDate) => {
        this.setState({fecha: selectedDate})
      };

    render() {
        return(
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Edad</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.edad}
                    onValueChange={(itemValue, itemIndex) => this.setState({edad: itemValue})}>
                    <Picker.Item label="< 20" value="< 20" />
                    <Picker.Item label="20 - 30" value="20 - 30" />
                    <Picker.Item label="31 - 40" value="31 - 40" />
                    <Picker.Item label="41 - 50" value="41 - 50" />
                    <Picker.Item label="51 - 60" value="51 - 60" />
                    <Picker.Item label="> 60" value="> 60" />
                </Picker>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Federado/No-federado?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.federado}
                    trackColor={colorGaztaroaOscuro}
                    onValueChange={(value) => this.setState({federado: value})}>
                </Switch>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Día y hora</Text>
                <DateTimePicker
                    style={{flex: 2, marginRight: 20}}
                    value={this.state.fecha}
                    mode='date'
                    display='default'
                    onChange={this.seleccionarFecha}
                />
                <DateTimePicker
                    style={{flex: 2, marginRight: 20}}
                    value={this.state.fecha}
                    mode='time'
                    display='default'
                    onChange={this.seleccionarFecha}
                />
            </View>

            <View style={styles.formRow}>
                <Button
                    onPress={() => this.gestionarReserva()}
                    title="Reservar"
                    color={colorGaztaroaOscuro}
                    accessibilityLabel="Gestionar reserva..."
                    />
            </View>
            <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.showModal}
                onDismiss = {() => {this.toggleModal(); this.resetForm();}}
                onRequestClose = {() => {this.toggleModal(); this.resetForm();}}>
                <View style = {styles.modal}>
                    <Text style = {styles.modalTitle}>Detalle de la reserva</Text>
                    <Text style = {styles.modalText}>Edad: {this.state.edad}</Text>
                    <Text style = {styles.modalText}>Federado?: {this.state.federado ? 'Si' : 'No'}</Text>
                    <Text style = {styles.modalText}>Día y hora: {new Intl.DateTimeFormat('default', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}).format(Date.parse(this.state.fecha))}</Text>
                    <Button 
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color={colorGaztaroaOscuro}
                        title="Cerrar" 
                        />
                </View>
            </Modal>

        </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }

});

export default PruebaEsfuerzo;