import StartDB from "../FirebaseConfig/config";
import React from "react";
import { ref, onValue } from 'firebase/database';

//Importing in the table component from bootstrap
import { Table } from "react-bootstrap"

//Needed components from react native
import { StyleSheet, Dimensions } from 'react-native';

const db = StartDB();

export class TableList extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }


    //Fill out the table data field in order to populate the table
    componentDidMount(){
        const dbRef = ref(db, 'Reptile');

        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data":data});
            });
            this.setState({tableData: records});
        });
    }


    //Render the table displaying all rows
    render(){
        return (
            <>

                <Table style={styles.appButtonContainer}>
                <thead>
                    <tr>
                            <th style={styles.boldText}>#</th>
                            <th style={styles.boldText}>Name</th>
                            <th style={styles.boldText}>Species</th>
                            <th style={styles.boldText}>Born Date</th>
                            <th style={styles.boldText}>Favourite Food</th>
                            <th style={styles.boldText}>Health Concerns</th>   

                    </tr>
                </thead>

                <tbody>
                    {this.state.tableData.map((row)=>{
                        return(
                        <tr>
                                <td style={styles.item}>{row.key}</td>
                                <td style={styles.item}>{row.data.ReptileName}</td>
                                <td style={styles.item}>{row.data.ReptileType}</td>
                                <td style={styles.item}>{row.data.DateBorn}</td>
                                <td style={styles.item}>{row.data.FavouriteFood}</td>
                                <td style={styles.item}>{row.data.HealthConcerns}</td>

                                
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
            </>
        )
    }
}


//Related styles
const styles = StyleSheet.create({
    boldText: {
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        fontSize: 13,
        fontWeight: "bold"
    },
    appButtonContainer: {
        flex: 1,
        padding: 100,
        margin: 10,
        width: Dimensions.get('window').width,
    },
    item: {
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        fontSize: 12
    }
})