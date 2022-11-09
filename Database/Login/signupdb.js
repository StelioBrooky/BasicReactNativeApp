//See Datab.js for more details on the imports and firebase

import React from "react";
import { Text, StyleSheet, TextInput } from 'react-native';
import StartDB from "../FirebaseConfig/config";
import { ref, set, } from "firebase/database";

//Database for the signup page
export class Signupdb extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
        this.interface = this.interface.bind(this);
    }s

    componentDidMount() {
        this.setState({
            db: StartDB()
        });
    }

    render() {
        //Display the inputs for the user to enter their new username and password
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


                <button id="addBtn" onClick={this.interface}><Text>Sign up</Text></button>
            </>
        )
    }

    //Run the insert data method
    interface(event) {
        const id = event.target.id;

        if (id == 'addBtn') {
            this.insertData();
        }
    }


    //Get information from the inputs and add it to the database
    getAllInputs() {
        return {
            username: this.state.username,
            password: this.state.password
        }
    }

    insertData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        //Having the user enter in a password to create an account fulfils a security requirement
        //It enforces security rule 2.11 MSTG-STORAGE-11: The app enforces a minimum device-access-security policy, such as requiring the user to set a device passcode.
        //https://mobile-security.gitbook.io/masvs/security-requirements/0x07-v2-data_storage_and_privacy_requirements
        set(ref(db, 'User/' + data.username),
            {
                Pass: data.password
            }
        )
            .then(() => { alert('data was added') })
            .catch((error) => { alert("there is an error" + error) });
    }

}


//Related styles
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