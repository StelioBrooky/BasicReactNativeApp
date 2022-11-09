//For the Database, I used Firebase.
//In order to understnad how to implement this, I followed a Youtube tutorial on the topic. Here is the relevant link
//https://www.youtube.com/watch?v=1TIVdIOIX64


import React from "react";
//Grab the database information from the config file
import StartDB from "../FirebaseConfig/config";
//Additional Firebase components that were added to my app in order to get the database functioning
import { ref, set, get, remove, update, child } from "firebase/database";
//Additional react native components used
import { Text, StyleSheet, TextInput} from 'react-native';



//Datab is ny main database for the reptiles.
export class Datab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            db: '',
            reptileId: '',
            name: '',
            animalType: '',
            bornDate: '',
            food: '',
            concerns: '',
        }
        this.interface = this.interface.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartDB()
        });
    }

    //Render the database using new components including button and TextInput
    render() {
        return (
            <>
                <Text style={styles.boldText}>Reptile Id</Text>
                <TextInput style={styles.input} keyboardType='numeric' type='number' id="idbox" value={this.state.reptileId} onChange={e => { this.setState({ reptileId: e.target.value }); }}/>
               
                <br></br>

                <Text style={styles.boldText}>Reptile Name</Text>
                <TextInput style={styles.input} type='text' id="reptilename" value={this.state.name} onChange={e => { this.setState({ name: e.target.value }); }} />
                <br></br>
                
                <Text style={styles.boldText}>Reptile Species</Text>
                <TextInput style={styles.input} type='text' id="reptiletype" value={this.state.animalType} onChange={e => { this.setState({ animalType: e.target.value }); }} />
                <br></br>

                <Text style={styles.boldText}>Born Date</Text>
                <TextInput style={styles.input} type='text' id="born" value={this.state.bornDate} onChange={e => { this.setState({ bornDate: e.target.value }); }} />
                <br></br>

                <Text style={styles.boldText}>Favourite Food</Text>
                <TextInput style={styles.input} type='text' id="favouritefood" value={this.state.food} onChange={e => { this.setState({ food: e.target.value }); }} />
                <br></br>

                <Text style={styles.boldText}>Health Concerns</Text>
                <TextInput style={styles.input} type='text' id="healthconcerns" value={this.state.concerns} onChange={e => { this.setState({ concerns: e.target.value }); }} />
                <br></br>

                
                <button id="addBtn" onClick={this.interface}>Add Reptile</button>
                <button id="updateBtn" onClick={this.interface}>Update Reptile</button>
                <button id="deleteBtn" onClick={this.interface}>Delete Reptile</button>
                <button id="selectBtn" onClick={this.interface}>Select Reptile</button>
            </>
        )
    }

    //Have the button presses run the respective database methods.
    interface(event) {
        const id = event.target.id;

        if (id == 'addBtn') {
            this.insertData();
        }
        else if (id == 'updateBtn') {
            this.updateData();
        }

        else if (id == 'deleteBtn') {
            this.deleteData();
        }

        else if (id == 'selectBtn') {
            this.selectData();
        }
    }

    //Grab the inputs and turn the variables in the state into them
    getAllInputs() {
        console.log(this.state.db.length);
        return {
            reptileId: this.state.reptileId,
            name: this.state.name,
            animalType: this.state.animalType,
            bornDate: this.state.bornDate,
            food: this.state.food,
            concerns: this.state.concerns,
        }
    }

    //Add a new reptile to the database
    insertData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        set(ref(db, 'Reptile/' + data.reptileId),
            {
                ReptileName: data.name,
                ReptileType: data.animalType,
                DateBorn: data.bornDate,
                FavouriteFood: data.food,
                HealthConcerns: data.concerns,
            }
        )
            .then(() => { alert('data was added') })
            .catch((error) => { alert("there is an error" + error) });
    }


    //Update an existing reptile in the database
    updateData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Reptile/' + data.reptileId),
            {
                ReptileName: data.name,
                ReptileType: data.animalType,
                DateBorn: data.bornDate,
                FavouriteFood: data.food,
                HealthConcerns: data.concerns,
            }
        )
            .then(() => { alert('data was update') })
            .catch((error) => { alert("there is an error" + error) });
    }


    //Delete a reptile from the database
    deleteData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        remove(ref(db, 'Reptile/' + data.reptileId))
            .then(() => { alert('data was deleted') })
            .catch((error) => { alert("there is an error" + error) });
    }


    //Select a reptile in the database
    selectData() {
        const dbref = ref(this.state.db);
        const id = this.getAllInputs().reptileId;

        get(child(dbref, 'Reptile/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    name: snapshot.val().ReptileName,
                    animalType: snapshot.val().ReptileType,
                    bornDate: snapshot.val().DateBorn,
                    food: snapshot.val().FavouriteFood,
                    concerns: snapshot.val().HealthConcerns,
                })
            }
            else {
                alert("no data found");
            }
        })

    }

   
}

//Styles that were used in this database.
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