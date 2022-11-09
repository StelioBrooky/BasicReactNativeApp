import * as React from 'react';

//Code for these components was supported by the React Native docs (https://reactnative.dev/docs/components-and-apis)
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, Linking, ImageBackground} from 'react-native';

//Navigators were used to go between screens
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//This is how I accessed the icons for the taskbar fixed menu
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//The following imports are all related to getting the database content up and running correctly
import { Datab } from './Database/Reptiles/datab';
import { Logindb } from './Database/Signup/logindb';
import { Signupdb } from './Database/Login/signupdb';
import { TableList } from './Database/ReptileTable/tableList';
import 'bootstrap/dist/css/bootstrap.min.css';



//Images to be reused in the code.
const beardedDragon = require('./assets/BeardedDragon.jpg');
const blueTongue = require('./assets/BlueTongueSkink.jpg');
const leopardGecko = require('./assets/LeopardGecko.jpg');
const turtle = require('./assets/Turtle.jpg');


//The SwapVerify() function exists for the purpose of the log in database. If the login credentials are correct, then you can change the verify variable
//(App.vf) to be true
export function SwapVerify() {
    App.vf = true;
    }


//After the user has pressed to go into the app, a screen will display the detail of wether they have succesfully logged in or not.
//If their login was not verified, then it will present in a different way. If it was verified, then they may proceed to the app.
function DetailsScreen({ navigation }) {
    if (App.vf) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.boldText}
                >Congrats, you are logged in!</Text>,
            <TouchableOpacity style={styles.appButtonContainer}
            color={"#000000"}
                    onPress={() => navigation.navigate('Home')}
                    justifyContent='center'
                    alignSelf='center'
                    alignContent = 'center'
        >
            <Text style={styles.appButtonText}>
                advance to app
            </Text>
        </TouchableOpacity>
            </View>)
    } else {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.boldText}
              >You must log in before you can proceed</Text>,
            <TouchableOpacity style={styles.appButtonContainer}
                color={"#000000"}
                onPress={() => navigation.navigate('Open')}
                justifyContent='center'
                alignSelf='center'
                alignContent='center'
            >
                <Text style={styles.appButtonText}>
                    return
                </Text>
            </TouchableOpacity>
        </View>)
    }

}


//The profile and Community functions were 2 features from my Assignment 1 that I did not have time to complete. So as a placeholder, I have a development screen.
function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <ImageBackground
                //Image background is used to display an image across the whole screen.
                source={turtle} style={ styles.imageStyle3}>
                <Text style={styles.headText}> Sorry! This page is in development!
                </Text>
                </ImageBackground>

            
        </View>
    );
}

//This function is the ADD/EDIT page for reptiles. This lets you add, select, update, and delete items in the main reptiles database.
function MainDB() {
    return (
        <ScrollView>
            <Datab />
            </ScrollView>
        );
}

//This function is the Sign up page for users. This lets you create a new account.
function SignUp() {
    return (
        <Signupdb />
    );
}

//The homescreen is the main reptiles screen, displaying the reptiles database.
function HomeScreen({ navigation }) {
    
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headText}>My Reptiles</Text>

            <TouchableOpacity style={styles.appButtonContainer}
                color={"#000000"}
                onPress={() => navigation.navigate('MainDB')}
            >
                <Text style={styles.appButtonText}>
                    Add/Edit
                </Text>

            </TouchableOpacity>
            <View
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    width: Dimensions.get('window').width*0.9,
                    margin: 10,
                    opacity:0.5
                }}

            />
            <View width={Dimensions.get('window').width * 0.5}>

                <ScrollView>
                    <TableList />
                   </ScrollView>

            </View>
        </View>
        
    );
}


//This is the first screen the user sees, asking them to sign up, or sign in.
function OpeningScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                style={{ fontSize: '50px' }}>
                Reptile Resource NZ{'\n\n'}</Text>
            <View style={[{ width: "40%" }]}>
               
                <Text style={styles.descText}>{'\n'}</Text>
                <TouchableOpacity style={styles.appButtonContainer}
                    color={"#000000"}
                    verifying={true}
                    onPress={() => navigation.navigate('Details')}
                >
                    <Text style={styles.appButtonText}>
                        go to app
                    </Text>
                </TouchableOpacity>
                <Text style={styles.descText}>{'\n'}</Text>
                <TouchableOpacity style={styles.appButtonContainer}
                    color={"#000000"}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.appButtonText}>
                        Sign Up
                        </Text>
                        
                    </TouchableOpacity>
                    <Text style={styles.boldText}> {'\n'}Already have an account?{'\n\n'}</Text>
            </View>
            <Logindb />

        </View>

    );
}


//This key screen in the app is for the care page, it lists all avaialabe reptiles you can read care guides about.
function ReptileCareScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.headText}>New Zealand</Text>
            <Text style={styles.headText}>Pet Reptiles</Text>
            <View
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    width: Dimensions.get('window').width*0.9,
                    margin: 10,
                    opacity:0.5
                }}
            />
            <Text style={styles.descText}>Select care information for a specific reptile</Text>
            <View
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    width: Dimensions.get('window').width * 0.9,
                    margin: 10,
                    opacity: 0.5
                }}
            />

            
            <View style={styles.container}>
                
                <Text style={styles.listText} onPress={() => navigation.navigate('Dragon')}> <Image source={beardedDragon} style={styles.imageStyle} /> Bearded Dragon</Text>
                <View                  
                    style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: Dimensions.get('window').width * 0.8,
                        margin: 10,
                        opacity: 0.5,
                        justifyContent: 'center'
                    }}
                />
                <Text style={styles.listText} onPress={() => navigation.navigate('Bluey')}> <Image source={blueTongue} style={styles.imageStyle} /> Blue Tongued Skink</Text>
                <View
                    style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: Dimensions.get('window').width * 0.8,
                        margin: 10,
                        opacity: 0.5,
                        justifyContent: 'center'
                    }}
                />
                
                <Text style={styles.listText} onPress={() => navigation.navigate('Dragon')}> <Image source={leopardGecko} style={styles.imageStyle} /> Leopard Gecko</Text>
                <View
                    //Unfortunatley for the time it took to do this app, I was unable to complete the care guides for Leopard Geckos or Red Eared Sliders, so they just
                    //redirect you to another reptiles care.
                    style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: Dimensions.get('window').width * 0.8,
                        margin: 10,
                        opacity: 0.5,
                        justifyContent: 'center'
                    }}
                />
                <Text style={styles.listText} onPress={() => navigation.navigate('Bluey')}> <Image source={turtle} style={styles.imageStyle} /> Red Eared Slider</Text>
                <View
                    style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: Dimensions.get('window').width * 0.9,
                        margin: 10,
                        opacity: 0.5
                    }}
                />
                </View>
        </View>
    );
}


//Mostly text, with the introduction of a ScrollView for the care guide of a Bearded Dragon
function BeardedDragonScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView>
                <Text style={styles.headText}>Bearded Dragon</Text>
                <Image source={beardedDragon} style={styles.imageStyle2} />
                <Text style={styles.boldText}>{'\n'}What is a Bearded Dragon?{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Bearded Dragons come in two species in the New Zealand pet trade; Inland Bearded Dragons and Eastern Bearded Dragons. Both come from Australia, the Eastern Bearded Dragon coming from Central and Eastern Queensland / New South Wales, the Inland Bearded Dragon coming from central Australia (Queensland, Northern Territory and South Australia) Bearded Dragons are lizards, the most common type of reptile in the pet trade.
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Appearance and Characteristics{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Bearded Dragons are characterised by their leathery, scaly skin with rows of lateral spines, as well as spines on their throat. These aren't sharp to the touch, despite how they look. Both the inland and eastern bearded dragons look very similar- the inland bearded dragon is the most common in the pet trade. Eastern Beardies more often have a yellow coloured mouth and inland have a pinkish coloured mouth more like our own. Both species grow to around 60cm in length males usually have a broader head, are stockier, head bob when sexually mature, have a thicker tail base and have large femoral pores on the base of the back legs (showing as large flat scales) though babies are almost impossible to sex. Beardies usually live for around 10 years- though they can live for much longer! Their legs are poised parallel to their bodies when resting- although they will use them to hold their body off the ground when moving and can even run on just their back legs!
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Housing{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Bearded dragons, like all lizards should have an enclosure 2-5 times their body length (150cm for adults) about as deep as they are long, and the same again as high (adult enclosure should be 150cmx60cmx60cm) Bearded Dragons can be housed in aquariums or terrariums, though a wooden vivarium is the best method of housing. Bearded Dragons are ectothermic (cold-blooded) so they need heat in their enclosure to be able to thermoregulate. The hot end of their enclosure should be between 35-40 degrees and the cold end should be around 25-30. The best way to provide this is with a heat bulb and a fitting to secure it with a thermostat to control the temperature. Bearded dragons live
                    mostly on the ground but do climb slightly, so a branch should be provided just below the heat bulb so they can warm themselves up when needed. {'\n\n'}
                    Bearded Dragons are unable to get vitamin D3 from their food so they need a UVB light (around 10.0 output) to be able to synthesise it in their skin A night-time bulb (either infrared or ceramic) should be used on the night to keep the enclosure temperature around 20-23 degrees. {'\n\n'}
                    Substrate choices are untreated potting soil, aspen bedding, or newspaper if cleanliness is prioritised. DO NOT use pine bedding (which is toxic to reptiles) or sand (even reptile "safe" sand) as this can lead to impaction of the lower digestive tract and death. Bearded dragons should have a hide or cave at each end of the enclosure, and will appreciate branches and rocks around their enclosure as enrichment. Male Bearded Dragons should not be housed together as they will fight.
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Feeding{'\n\n'}</Text>
                <Text style={styles.descText}>
                    A water bowl and food bowl should always be provided. The water bowl should be large enough for the animal to bathe in whilst shedding, and the food bowl should be large enough so that food items like worms cannot crawl out. {"\n\n"}
                    Bearded Dragons are omnivorous animals, meaning they eat both animal and plant matter. Meat food items can be crickets, locusts, mealworms, waxworms and earthworms. Crickets are a good staple food for Bearded Dragons. Vegetables that can be offered include kale, spinach, rocket, carrot greens, broccoli, turnip greens, and dandelion flowers. Small amounts of fruit such as strawberries, apple, and pears can be offered. Avoid citrus fruits and vegetables such as onion, capsicum and iceberg lettuce.{'\n\n'}
                    A ratio of 75:25 meat to vegetation is ideal for younger beardies, 1 year plus beardies should be given 50:50 ratio to prevent obesity and aid good digestion. Calcium powder should be offered every other meal as a supplement onto the food provided. This calcium is necessary to prevent a condition known as metabolic bone disease where an abundance of phosphorous and a lack of calcium causes the animal's body to break down its own bones, resulting in limb deformities It can be treated but the effects are irreversible.
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Handling{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Bearded dragons are placid, even tempered animals when raised in captivity and do not mind being picked up and handled. They like to explore outside their enclosure often but should be supervised when doing so Many bearded dragons can be taken outside on a rat harness during the summer months to enjoy the natural sunshine! Handling regularly from a young age ensures your Bearded dragon is used to being handled and will not mistake you for a threat when older. Handling regularly also makes sure that your Bearded Dragon is not as stressed should he need to make a vet visit in the future.
                </Text>

                <Text style={styles.boldText}>{'\n\n'}Useful Links{'\n\n'}</Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://kiwipetz.co.nz/products/pt2189')}>
                    UVB Bulb{'\n'}</Text>
                <Text style={styles.descText}>
                    This ExoTerra UVB 150 bulb is perfect for Bearded Dragons. It is designed to give enough vitaman D3 that would be equivilent to that of a reptile in the Australian outback.{'\n\n'}
                </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://themarket.com/nz/p/exo-terra-intense-basking-spot-reptiles-lamp-150w/5265-PT2140-3022?skuid=7509027&utm_source=google&utm_medium=cpc&gclid=Cj0KCQjw6_CYBhDjARIsABnuSzqvww3LufeA0DKt-Gf8Glfetb4ex-V6ZM5qJ-jG3E6pudiBIy4vnpcaAjh-EALw_wcB')}>
                    Heat Bulb{'\n'}</Text>
                <Text style={styles.descText}>
                    This ExoTerra 150W Basking Bulb is ideal to get the high temperatures needed for a Bearded Dragon.{'\n\n'}
                </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.hollywoodfishfarm.co.nz/product/exo-terra-glow-light/')}>
                    Light Fittings{'\n'}</Text>
                <Text style={styles.descText}>
                    You are going to need 2 of these medium sized glow light fittings. One for your UVB, and one for your Basking Bulb.{'\n\n'}
                </Text>
            </ScrollView>
        </View>
    );
}

//Mostly text, with the introduction of a ScrollView for the care guide of a Blue Tongued Skink
function BlueTongueScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView>
                <Text style={styles.headText}>Blue Tongued Skink</Text>
                <Image source={blueTongue} style={styles.imageStyle2} />
                <Text style={styles.boldText}>{'\n'}What is a Blue Tongued Skink?{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Blue Tongued skinks are a short limbed large bodied type of lizard that, unlike most reptiles, gives birth to live babies instead of laying eggs. Like most lizards in the New Zealand pet trade they are native to Eastern Australia - particularly Queensland and New South Wales and are a common visitor to gardens in Brisbane and Sydney. Possibly due to this willingness to inhabit urban areas, Blue Tongues are docile, and even-tempered animals .
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Appearance and Characteristics{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Blue tongued lizards grow to about 45-60cm in length when fully grown with males being slightly larger and broader in their heads and tails. They have a large, flat head with their trademark luminous blue tongue- which they display to ward off predators. Blueys have been documented to live to around 30 years in captivity, so they are a long-term pet.{'\n\n'}
                    Eastern blue tongues (the most common species in the pet trade) are a neutral grey colour over their entire body- with horizontal bars of black/brown colouring breaking up the grey. Their limbs are very short, but powerful, enabling them to easily squeeze through small gaps. 
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Housing{'\n\n'}</Text>
                <Text style={styles.descText}>
                    As with all ground-dwelling lizards: Blue tongued skinks need an enclosure 2.5 times as long as they are, and just as deep/tall as their bodies. So, an adult, 50cm long Bluey would need an enclosure 125cm long, 50cm high and 50cm deep as a minimum. They can be housed in a glass aquarium, glass terrarium or wooden vivarium. Wooden enclosures are ideal for heat retention but are somewhat expensive and hard to come by in New Zealand.
                    Like with almost all species of lizard, blue tongues require a UVB light source in order to synthesise vitamin D3 and grow the calcium properly on their bones. Without a UVB source they are likely to suffer from Metabolic Bone Disease; leading to extreme limb deformity and death. {"\n\n"}
                    Blue Tongue Skinks are ectothermic (cold-blooded) so they need heat in their enclosure to be able to thermoregulate. A heat source in the form of a basking bulb should also be provided, and should be able to heat the enclosure to around 35-36 degrees Celsius, with the cooler end
                    between 21 and 23 A thermostat can be used to maintain these temperatures accurately, though if using a thermostat, it is a better idea to use a ceramic bulb as the primary heat source- as it may cause the filament in a glass bulb to blow. {'\n\n'}
                    Enclosures should be furnished with a hide at both ends of the enclosure and rocks/driftwood- they do not need climbing branches as they are terrestrial. They do like burrowing, however, so untreated potting soil or aspen is a good idea. Do not use sand or pine bedding as this can cause impaction and poisoning respectively. Male Blue Tongue Skinks should not be housed together as they will fight. 
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Feeding{'\n\n'}</Text>
                <Text style={styles.descText}>
                    A water bowl and food bowl should always be provided. The water bowl should be large enough for the animal to bathe in whilst shedding, and the food bowl should be large enough so that food items like worms cannot crawl out. Blue Tongued skinks are omnivorous animals- though they often show a reluctance to eat vegetation when young. Meat food items provided should be earthworms, snails, crickets, locusts, mealworms and waxworms. The main part of their diet should be cat food as a juvenile and dog food as an adult as these provide the neccesary nutrients. {"\n\n"}
                    Vegetables that can be offered include kale, rocket, carrot greens, broccoli, turnip greens, and dandelion flowers. Small amounts of fruit such as strawberries, apple, and pears can be offered. Avoid citrus fruits as well as vegetables such as onion, capsicum and iceberg lettuce. A ratio of 75:25 meat to vegetation is ideal for younger blueys, 1 year plus individuals should be given 50:50 ratio to prevent obesity and aid good digestion.
                </Text>
                <Text style={styles.boldText}>{'\n\n'}Handling{'\n\n'}</Text>
                <Text style={styles.descText}>
                    Blue Tongue Skinks have a very pleasant disposition and are very unlikely to bite. They should, however, be handled frequently to prevent returning to their wilder disposition. They shouldn't be kept out of the enclosure for too long a period as they can become too cold if left out for too long. They do have a genuinely good disposition however and make great pets if their requirements are met.
                </Text>

                <Text style={styles.boldText}>{'\n\n'}Useful Links{'\n\n'}</Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://themarket.com/nz/p/exo-terra-reptile-uvb-100-25w/5265-PT2187-2797?skuid=7509046&utm_source=google&utm_medium=cpc&gclid=Cj0KCQjwjvaYBhDlARIsAO8PkE0m41oxmBn5yxRrqSYbu0R9zB6Kq62HKLZFEgKlKUJEKlbSeB9qbRsaAoJxEALw_wcB')}>
                    UVB Bulb{'\n'}</Text>
                <Text style={styles.descText}>
                    This ExoTerra UVB 100 bulb is perfect for Blueys. It is designed to give enough vitaman D3 that would be equivilent to that of a reptile in the Australian suburban area.{'\n\n'}
                </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.trademe.co.nz/a/marketplace/pets-animals/reptiles-turtles/accessories/listing/3762392949?gclid=Cj0KCQjwjvaYBhDlARIsAO8PkE0hNR6O91P1TVIBiq2nOOrOS1u01N87rQ_7GYS6WqDImqMhhxUTaVsaAqASEALw_wcB&gclsrc=aw.ds')}>
                    Heat Bulb{'\n'}</Text>
                <Text style={styles.descText}>
                    This Arcadia 80w Deep Heat Projector does the best job at getting heat through the lizard's body.{'\n\n'}
                </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.hollywoodfishfarm.co.nz/product/exo-terra-glow-light/')}>
                    Light Fittings{'\n'}</Text>
                <Text style={styles.descText}>
                    You are going to need 2 of these medium sized glow light fittings. One for your UVB, and one for your Deep Heat Projector.{'\n\n'}
                </Text>
            </ScrollView>
        </View>
    );
}

//All of the navigation functions are below here. This is how my app is able to navigate between pages seemlessly

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center'
        }}>
            <HomeStack.Screen name="Home"
                component={HomeScreen}
                options={{ title: 'Reptile Resource NZ', headerStyle: {backgroundColor: '#09b9cb'} } }
            />
            <HomeStack.Screen name="MainDB" component={MainDB}
            options={{ title: 'Add New Reptile', headerStyle: { backgroundColor: '#09b9cb' } }}            />
        </HomeStack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center'
        }}>
            <HomeStack.Screen name="Profile"
                component={ProfileScreen}
                options={{ title: 'Reptile Resource NZ', headerStyle: { backgroundColor: '#09b9cb' } }}
            />
        </HomeStack.Navigator>
    );
}

const OpeningStack = createNativeStackNavigator();

function OpeningStackScreen() {
    return (
        <OpeningStack.Navigator screenOptions={{
            headerShown: true
        }}>
            <OpeningStack.Screen name="Open"
                component={OpeningScreen}
                options={{headerShown: false }}
            />
            <OpeningStack.Screen name="Login" component={HomeScreen}
                options={{ title: 'Login', headerStyle: { backgroundColor: '#09b9cb', height: 200 } }} />
            <OpeningStack.Screen name="Signup" component={SignUp}
                options={{ title: 'Signup', headerStyle: { backgroundColor: '#09b9cb' } }} />
        </OpeningStack.Navigator>
    );
}

const CareStack = createNativeStackNavigator();

function CareStackScreen() {
    return (
        <CareStack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center'
        }} >
            <CareStack.Screen name="Care" component={ReptileCareScreen}
                options={{ title: 'Reptile Resource NZ', textAlign: "center", headerStyle: { backgroundColor: '#09b9cb' } }} />
            <CareStack.Screen name="Dragon" component={BeardedDragonScreen}
                options={{ title: 'Bearded Dragon', headerStyle: { backgroundColor: '#09b9cb' } }} />
            <CareStack.Screen name="Bluey" component={BlueTongueScreen}
                options={{ title: 'Blue Tongued Skink', headerStyle: { backgroundColor: '#09b9cb' } }} />
        </CareStack.Navigator>
    );
}


//A special tab navigator was used to put all of the main pages into the bottom taskbar in the form of tabs
const Tab = createBottomTabNavigator();

function TabStackScreen() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveBackgroundColor: '#09b9cb', tabBarActiveTintColor: 'black', headerShown: false,
            tabBarItemStyle: {
                borderRadius: 5,
            },
        }}>
            <Tab.Screen name="Reptiles" component={HomeStackScreen} options={{
                backgroundColor: '#09b9cb',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="snake" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Care" component={CareStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Community" component={ProfileStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="group" size={24} color="black" />
                )
            }} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={24} color="black" />
                )
            }} />
        </Tab.Navigator>
    );
}



//The main app function wth the navigation container. Adding the tabs stack to the stack navigator means that all the screens in the tabs are also included here.
const Stack = createNativeStackNavigator();

export default function App() {
    //This variable cheks if the user has logged in
    let vf = false;
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Open" component={OpeningStackScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                    <Stack.Screen name="Home" component={TabStackScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
}

const styles = StyleSheet.create({
    // Here exists all the styles that a reoccuring in my app.
    imageStyle: {
        resizeMode: 'cover',
        width: 60,
        height: 60,
        alignItems: "center",
    },
    imageStyle2: {
        resizeMode: 'cover',
        width: 90,
        height: 90,
        alignItems: "center",
        alignSelf: 'center'
    },
    imageStyle3: {
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: "center",
        alignSelf: 'center'

    },
    container: {
        flex: 1,
            alignItems: "left",
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
    headText: {
        fontSize: 50,
        color: "#000000",
        textAlignVertical: 'top',
        textAlign: 'top',
        alignSelf: "center"
    },
    descText: {
        fontSize: 18,
        color: "#000000",
        alignSelf: "center",
        alignContent: "center",
        textAlign: 'center',
        flexWrap: true,
        paddingHorizontal: 10
    },
    linkText: {
        fontSize: 18,
        color: "blue",
        backgroundColor: "Purple",
        textDecorationLine: 'underline',
        alignSelf: "center",
        alignContent: "center",
        flexWrap: true,
        paddingHorizontal: 10
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
    listText: {
        fontSize: 40,
        color: "#000000",
        alignSelf: "left",
        alignContent: "left",
        flexWrap: true,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});



