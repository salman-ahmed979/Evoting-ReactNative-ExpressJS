import { useRef } from "react"
import {Camera} from "expo-camera"
import { DeviceEventEmitter } from "react-native/types"


const Picture = () => {
    const camera = useRef<RNCamera>(null)

    const takePic = async () => {
        if (camera)
        {
            const options = {quality: 0.5, base64: true}
            const data = await camera.current?.takePictureAsync(options)

            if (data)
            {
                RNFS.readFile(data.uri, 'base').then(res => {
                    DeviceEventEmitter.emit('pictureUpdate', res)
                    navigation.goBack()
                })
            }
        }
    }


    return(
        <View>
            <RNCamera 
            ref={camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.Type.on}
            captureAudio={false}
            androidCameraPermissionOptions={{
                title:'Permission',
                message: 'TO use camera',
                buttonPositive: "Allow",
                buttonNegtive: "Denied"
            }}
            />
            <Text onPress={takePic}>SNAP</Text>
        </View>
    )


}

export default Picture;