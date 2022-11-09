//See Datab.js for more details on the imports and firebase

import React from "react";
import { Text, StyleSheet, TextInput } from 'react-native';
import StartDB from "../FirebaseConfig/config";
import { ref, get, child } from "firebase/database";

//Import the Swap verify method that exists in the App.js file
import { SwapVerify } from "./../../App.js";


//Using Firebase as a way to store loign credentials fulfills a security feature
//This enforces security rule 2.13 MSTG-STORAGE-13: No sensitive data should be stored locally on the mobile device. Instead, data should be retrieved from a remote endpoint when needed and only be kept in memory.
//https://mobile-security.gitbook.io/masvs/security-requirements/0x07-v2-data_storage_and_privacy_requirements

//Database for the login section on the opening page
export class Logindb extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
        this.interface = this.interface.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartDB()
        });
    }

    //Display the log in inputs
    render() {
        return (
            <>

                <Text style={styles.boldText }>Username</Text>
                <TextInput style={styles.input} type='text' id="user" value={this.state.username} onChange={e => { this.setState({ username: e.target.value }); }} />
                <br></br>
                
                <Text style={styles.boldText}>Password</Text>
                
                <TextInput style={styles.input}
                    //Here you can see that 'secureTextEntry' is set to true. What this does is it means that the password is not visible on the UI when the user enters
                    //a new password.

                    //This enforces security rule 2.7 MSTG-STORAGE-7: No sensitive data, such as passwords or pins, is exposed through the user interface.
                    //https://mobile-security.gitbook.io/masvs/security-requirements/0x07-v2-data_storage_and_privacy_requirements
                    secureTextEntry='true' type='text' id="pass" value={this.state.password} onChange={e => { this.setState({ password: e.target.value }); }} />
                <br></br>
          
                <button id="searchBtn" onClick={this.interface}>Sign in</button>
            </>
        )
    }

    //Run the select data method if the search button is clicked
    interface(event) {
        const id = event.target.id;

        if (id == 'searchBtn') {
            this.selectData();
        }
    }

    getAllInputs() {
        return {
            username: this.state.username,
            password: this.state.password
        }
    }

    selectData() {
        const dbref = ref(this.state.db);
        const id = this.getAllInputs().username;

        get(child(dbref, 'User/' + id)).then((snapshot) => {
            //First check if the username exists in the database at all
            if (snapshot.exists()) {
                //If the username does exist, then we have to check if the password given matches the one for the username
                if (snapshot.val().Pass == this.state.password) {
                    //If the password is correct, then alert the user they have succesfully logged in and then run the SwapVerify() method.
                    //This will allow the user to proceed on through the app.
                    alert('Succesfully Logged In');
                    SwapVerify();
                } else {
                    //If the password is incorrect, then send an alert
                    alert('Incorrect Password');
                }
            }
            else {
                alert("Username Does Not Exist!");
            }
        })

    }

}

//Related Styles
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    boldText: {
        fontSize: 18,
        color: "#000000",
        alignSelf: "center",
        alignContent: "center",
        flexWrap: true,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#C7D59F",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: 'black',
        borderWidth: 2
    },
    appButtonText: {
        fontSize: 18,
        color: "#000000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})