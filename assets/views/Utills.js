// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const setData=async (data,success,errorr)=>{
    try {
          await AsyncStorage.setItem('@Formdata:key', JSON.stringify(data));
          success()
        } catch (error) {
          alert(error)
          errorr()
        }
}
const getData=async (success)=>{
        try {
            var Asyncdata = await AsyncStorage.getItem('@Formdata:key');
            if (Asyncdata) {
                success(JSON.parse(Asyncdata))
            } else{
              success([])
            }
        } catch (error) {
            success([])
        }
        
}

const setDataDoor=async (data,success,errorr)=>{
    try {
          await AsyncStorage.setItem('@Formdata1:key', JSON.stringify(data));
          success()
        } catch (error) {
          alert(error)
          errorr()
        }
}
const getDataDoor=async (success)=>{
        try {
            var Asyncdata = await AsyncStorage.getItem('@Formdata1:key');
            if (Asyncdata) {
                success(JSON.parse(Asyncdata))
            } else{
              success([])
            }
        } catch (error) {
            success([])
        }
        
}
const setDataWindow=async (data,success,errorr)=>{
    try {
          await AsyncStorage.setItem('@Formdata2:key', JSON.stringify(data));
          success()
        } catch (error) {
          alert(error)
          errorr()
        }
}
const getDataWindow=async (success)=>{
        try {
            var Asyncdata = await AsyncStorage.getItem('@Formdata2:key');
            if (Asyncdata) {
                success(JSON.parse(Asyncdata))
            } else{
              success([])
            }
        } catch (error) {
            success([])
        }
        
}
// const setDataDoor2=async (data2,success,errorr)=>{
//     try {
//           await AsyncStorage.setItem('@Formdata2:key', JSON.stringify(data2));
//           success()
//         } catch (error) {
//           alert(error)
//           errorr()
//         }
// }
// const getDataDoor2=async (success)=>{
//         try {
//             var Asyncdata = await AsyncStorage.getItem('@Formdata2:key');
//             if (Asyncdata) {
//                 success(JSON.parse(Asyncdata))
//             } else{
//               success([])
//             }
//         } catch (error) {
//             success([])
//         }
        
// }
export {setData,getData,setDataDoor,getDataDoor,setDataWindow,getDataWindow
}