import React from 'react'
import {
    Modal,
    View, Text, Dimensions
} from 'react-native'
import * as NB from 'native-base'
const window = Dimensions.get('window')

const Confirm = ({ children, onAccept, onReject, visible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => { }}

        >

            <View style = {{  justifyContent: 'center',marginTop : 200}}>
                <NB.CardItem
                    style={{ alignSelf: 'center', width: window.width * 0.8 }}
                >
                    <Text>{children}</Text>
                </NB.CardItem>
                <NB.CardItem style={{ alignSelf: 'center', width: window.width * 0.8 }}>
                    <NB.Button style={{
                        backgroundColor: '#B0BEC5',
                        width: window.width * 0.35,
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin: 5,
                    }} onPress={onAccept}><Text>Yes</Text></NB.Button>
                    <NB.Button style={{
                        backgroundColor: '#B0BEC5',
                        width: window.width * 0.35,
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin: 5,
                    }} onPress={onReject}><Text>No</Text></NB.Button>

                </NB.CardItem>


            </View>

        </Modal>
    )
}
export { Confirm };