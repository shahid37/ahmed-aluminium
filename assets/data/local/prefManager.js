import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SESSION_DATA_KEY = '@Session:UserData';
const IS_LOGIN_KEY = '@Session:IsUserLogin';
const NOTIFICATIONS_KEY = '@Session:Notifications';
const APP_THEME_KEY = '@General:AppTheme';

export default class Prefmanager {
  async saveUserSessionData(resp) {
    try {
      await AsyncStorage.setItem('@Session:key', JSON.stringify(resp.data));
      await AsyncStorage.setItem('@UserInfoAvailable', 'true');
      console.log('session saved sucessfully');
    } catch (error) {
      console.log('=========saveUserSessionData ERROR===========>', error);
    }
  }
  async storeToken(user) {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(user));
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  async getToken(user) {
    try {
      let userData = await AsyncStorage.getItem('userData');
      let data = JSON.parse(userData);
      console.log(data);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }
  async readUserSessionData(data) {
    // '@SessionTEMP:key
    try {
      const val = JSON.parse(
        await AsyncStorage.getItem('@SessionTEMP:key', data),
      );
      console.log('=====readUserSessionData=============', val);
      data(val);
    } catch (error) {
      console.log('=========readUserSessionData ERROR===========>', error);
    }
  }

  async saveUserSessionDataTEMP(resp, status) {
    try {
      await AsyncStorage.setItem('@SessionTEMP:key', JSON.stringify(resp.data));
      await AsyncStorage.setItem('@FingerPrintAvailable', status);
      console.log('TEMP session saved sucessfully');
    } catch (error) {
      console.log('=========saveUserSessionData ERROR===========>', error);
    }
  }
  async fingerPrintStatusWrite(status) {
    try {
      await AsyncStorage.setItem('@FingerPrintAvailable', status);
      console.log('finger print status update to', status);
    } catch (error) {
      console.log('=========saveUserSessionData ERROR===========>', error);
    }
  }

  async saveEmailPassword(data) {
    try {
      await AsyncStorage.setItem('@saveEmailPassword', JSON.stringify(data));
      console.log('email password stored non encrypted', data);
    } catch (error) {
      console.log('=========saveEmailPassword ERROR===========>', error);
    }
  }

  async getSaveEmailPassword(status) {
    try {
      const val = JSON.parse(
        await AsyncStorage.getItem('@saveEmailPassword', status),
      );
      // val = JSON.parse(val)
      console.log('email password retrive', val);
      status(val);
    } catch (error) {
      console.log('=========saveEmailPassword ERROR===========>', error);
    }
  }

  async checkFingerPrintStatus(onResult) {
    try {
      const val = await AsyncStorage.getItem('@FingerPrintAvailable');
      if (val != undefined && val == 'true') {
        onResult(true);
      } else {
        onResult(false);
      }
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  }

  async isUserLoggedIn(onResult) {
    try {
      const val = await AsyncStorage.getItem('@UserInfoAvailable');
      if (val != undefined && val == 'true') {
        // console.log("===>",val)
        onResult(true);
      } else {
        onResult(false);
      }
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  }

  async destroyUserSession(onResult) {
    try {
      await AsyncStorage.removeItem('@Session:key');
      await AsyncStorage.setItem('@UserInfoAvailable', 'false');
      console.log('=========SESSION DELETED======');
      onResult(true);
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  }

  async saveCreateChallange(data) {
    try {
      await AsyncStorage.setItem('@saveCreateChallange', JSON.stringify(data));
      console.log('create challange info stored >>>>>>>>>>>>>>>>>>', data);
    } catch (error) {
      console.log('=========saveCreateChallange ERROR===========>', error);
    }
  }

  async readCreateChallange(status) {
    try {
      const val = JSON.parse(
        await AsyncStorage.getItem('@saveCreateChallange', status),
      );
      console.log('=====readCreateChallangeData=====================', val);
      status(val);
    } catch (error) {
      console.log('=========readCreateChallangeData ERROR===========>', error);
    }
  }

  async saveChallangeTaskList(data) {
    try {
      await AsyncStorage.setItem(
        '@saveChallangeTaskList',
        JSON.stringify(data),
      );
      console.log('saveChallangeTaskList info stored', data);
    } catch (error) {
      console.log('=========saveChallangeTaskList ERROR===========>', error);
    }
  }

  async readChallangeTaskList(status) {
    try {
      const val = JSON.parse(
        await AsyncStorage.getItem('@saveChallangeTaskList', status),
      );
      console.log('=====readChallangeTaskList===', val);
      status(val);
    } catch (error) {
      console.log('=========readCreateChallangeData ERROR===========>', error);
    }
  }

  async saveChallangeTaskMediaList(data) {
    try {
      await AsyncStorage.setItem(
        '@saveChallangeTaskMediaList',
        JSON.stringify(data),
      );
      console.log('saveChallangeTaskMediaList info stored', data);
    } catch (error) {
      console.log(
        '=========saveChallangeTaskMediaList ERROR===========>',
        error,
      );
    }
  }

  async readChallangeTaskMediaList(status) {
    try {
      const val = JSON.parse(
        await AsyncStorage.getItem('@saveChallangeTaskMediaList', status),
      );
      console.log('=====readChallangeTaskMediaList===', val);
      status(val);
    } catch (error) {
      console.log(
        '=========readChallangeTaskMediaList ERROR===========>',
        error,
      );
    }
  }

  async destroyCreateChallengeData() {
    try {
      await AsyncStorage.removeItem('@saveCreateChallange');
      await AsyncStorage.removeItem('@saveChallangeTaskList');
      await AsyncStorage.removeItem('@saveChallangeTaskMediaList');

      console.log('=========SESSION DELETED======');
      // onResult(true)
    } catch (ex) {
      onResult(false);
      console.warn(ex.message);
    }
  }

  async createUserSession(sessionData, isLogin, onAdded) {
    await AsyncStorage.setItem(
      USER_SESSION_DATA_KEY,
      JSON.stringify(sessionData),
    );
    await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? 'true' : 'false');
    onAdded();
  }

  async getUserSessionData(onLoaded) {
    let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
    if (data) {
      let jData = JSON.parse(data);
      onLoaded(jData);
    } else {
      onLoaded(null);
    }
  }

  async updateSessionToken(token) {
    let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
    if (data) {
      let jData = JSON.parse(data);
      jData.sessionToken = token;
      await AsyncStorage.setItem(USER_SESSION_DATA_KEY, JSON.stringify(jData));
    }
  }

  async destroySession(onCompleted) {
    await AsyncStorage.multiRemove([USER_SESSION_DATA_KEY, IS_LOGIN_KEY]);
    onCompleted();
  }

  async updateLoginStatus(isLogin, onUpdated) {
    await AsyncStorage.setItem(IS_LOGIN_KEY, isLogin ? 'true' : 'false');
    onUpdated();
  }

  async updateDisplayName(firstName, lastName, onUpdated) {
    try {
      let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
      if (data) {
        let jData = JSON.parse(data);
        jData.data.firstname = firstName;
        jData.data.secondname = lastName;
        await AsyncStorage.setItem(
          USER_SESSION_DATA_KEY,
          JSON.stringify(jData),
        );
      }
      onUpdated();
    } catch (error) {
      onUpdated();
    }
  }

  async updateEmail(email, onUpdated) {
    try {
      let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
      if (data) {
        let jData = JSON.parse(data);
        jData.data.email = email;
        await AsyncStorage.setItem(
          USER_SESSION_DATA_KEY,
          JSON.stringify(jData),
        );
      }
      onUpdated();
    } catch (error) {
      onUpdated();
    }
  }

  async updatePhoneNo(phoneNo, onUpdated) {
    try {
      let data = await AsyncStorage.getItem(USER_SESSION_DATA_KEY);
      if (data) {
        let jData = JSON.parse(data);
        jData.data.phone = phoneNo;
        await AsyncStorage.setItem(
          USER_SESSION_DATA_KEY,
          JSON.stringify(jData),
        );
      }
      onUpdated();
    } catch (error) {
      onUpdated();
    }
  }

  // async isUserLoggedIn(onResult) {
  //     try {
  //         const val = await AsyncStorage.getItem(IS_LOGIN_KEY);
  //         onResult(val && val == "true")
  //     } catch (ex) {
  //         onResult(false)
  //         console.warn(ex.message)
  //     }
  // }

  async setNotifications(isEnabled, onUpdated) {
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, String(isEnabled));
      onUpdated && onUpdated();
    } catch (error) {
      onUpdated && onUpdated();
    }
  }

  async isNotificationsEnabled(onResult) {
    try {
      const val = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      onResult(val ? val == 'true' : false);
    } catch (error) {
      console.warn(error.message);
      onResult(false);
    }
  }

  async setAppTheme(theme, onUpdated) {
    try {
      await AsyncStorage.setItem(APP_THEME_KEY, JSON.stringify(theme));
      onUpdated && onUpdated();
    } catch (error) {
      onUpdated && onUpdated();
    }
  }

  async loadActiveTheme(onResult) {
    try {
      const val = await AsyncStorage.getItem(APP_THEME_KEY);
      onResult(val ? JSON.parse(val) : null);
    } catch (error) {
      console.warn(error.message);
      onResult(null);
    }
  }
}
