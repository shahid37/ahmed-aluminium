import Myutils from '../../utils/Utils';
import axios from 'axios';
import Prefmanager from '../local/prefManager';
// import CryptoJS from "crypto-js"
import Urls from './Urls';
const API_KEY = '3ec00dddc00e1dec3115457b0e317c9fb1c34db2';
const isDebugging = true;
const myutils = new Myutils();
const prefs = new Prefmanager();
export default class WebHandler {
  CATCH_ERROR = 'Catcherror';
  registerUser(data, onSuccess, onFailure) {
    let body =
      'name=' +
      data.username +
      '&email=' +
      data.email +
      '&phone=' +
      data.mobileNo +
      '&password=' +
      data.password;
    this.sendSimplePostFormRequest(
      Urls.REGISTER_USER_URL,
      body,
      (resp) => {
        onSuccess(JSON.stringify(resp.data.user_id));
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  loginUser(data, onSuccess, onFailure) {
    let body = 'email=' + data.email + '&password=' + data.password;
    this.sendSimplePostFormRequest(
      Urls.LOGIN_USER_URL,
      body,
      (resp) => {
        onSuccess(resp);
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  verifyRegisterUser(data, onSuccess, onFailure) {
    let body = 'code=' + data.code + '&user_id=' + data.user_id;
    this.sendSimplePostFormRequest(
      Urls.VERIFY_REGISTER_USER_URL,
      body,
      (resp) => {
        console.log(
          'received here a stuff>>>>>>>>>',
          JSON.stringify(resp.data),
        );
        prefs.saveUserSessionData(resp);
        prefs.saveUserSessionDataTEMP(resp, 'false');
        onSuccess(JSON.stringify(resp.data.message));
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  ResendVerificationMail(data, onSuccess, onFailure) {
    let body = 'user_id=' + data.user_id;
    this.sendSimplePostFormRequest(
      Urls.RESEND_VERIFICATION_EMAIL,
      body,
      (resp) => {
        onSuccess(JSON.stringify(resp.data.message));
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  forgetPassword(data, onSuccess, onFailure) {
    let body = 'email=' + data.email;
    this.sendSimplePostFormRequest(
      Urls.FORGET_PASSWORD_URL,
      body,
      (resp) => {
        onSuccess(JSON.stringify(resp.data.user_id));
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  forgetPasswordEmailVerify(data, onSuccess, onFailure) {
    let body = 'code=' + data.code + '&user_id=' + data.user_id;
    this.sendSimplePostFormRequest(
      Urls.FORGET_PASSWORD_EMAIL_VERIFY_URL,
      body,
      (resp) => {
        console.log(
          'received here a stuff>>>>>>>>>',
          JSON.stringify(resp.data),
        );
        onSuccess(JSON.stringify(resp.data.id));
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  setupNewPassowrd(data, onSuccess, onFailure) {
    let body = 'password=' + data.password + '&user_id=' + data.id;
    this.sendSimplePostFormRequest(
      Urls.SETUP_NEW_PASSWORD,
      body,
      (resp) => {
        console.log(
          'received here a stuff>>>>>>>>>',
          JSON.stringify(resp.data),
        );
        prefs.saveUserSessionData(resp);
        prefs.saveUserSessionDataTEMP(resp, 'false');
        onSuccess(JSON.stringify(resp.data.message));
      },
      (error) => {
        onFailure(error);
      },
    );
  }
  challangeDetial(data, onSuccess, onFailure) {
    let body = 'challenge_id=' + data.id;
    this.sendSimplePostFormRequest(
      Urls.CHALLENGES_DETAIL,
      body,
      (resp) => {
        onSuccess(resp);
      },
      (error) => {
        onFailure(error);
      },
    );
  }

  participateToTask(data, onSuccess, onFailure) {
    let body =
      'user_id=' +
      data._user_id +
      '&challenge_id=' +
      data._challange_id +
      '&task_id=' +
      data._task_id;
    this.sendSimplePostFormRequest(
      Urls.PARTICIPATE_TO_TASK,
      body,
      (resp) => {
        onSuccess(resp.data.message);
      },
      (error) => {
        onFailure(error);
      },
    );
  }

  sendInvitation(data, onSuccess, onFailure) {
    let body =
      'from_user_id=' +
      data._user_id +
      '&to_user_ids=' +
      data.newArray +
      '&invite_as=' +
      data.invite_as +
      '&challenge_id=' +
      data._challange_id +
      '&task_id=' +
      data._task_id +
      '&invite_link=' +
      data.invite_link;
    this.sendSimplePostFormRequest(
      Urls.SEND_INVITATION,
      body,
      (resp) => {
        onSuccess(resp.data.message);
      },
      (error) => {
        onFailure(error);
      },
    );
  }

  changeInvitationStatus(data, onSuccess, onFailure) {
    let body =
      'user_id=' +
      data._user_id +
      '&status=' +
      data.status +
      '&invitationId=' +
      data.invitationId;
    this.sendSimplePostFormRequest(
      Urls.CHANGE_INVITATION_STATUS,
      body,
      (resp) => {
        onSuccess(resp);
      },
      (error) => {
        onFailure(error);
      },
    );
  }

  CharityOrganizationsList(onSuccess, onFailure) {
    var url = Urls.CHARITY_ORG_LIST;
    axios
      .post(url, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then((resp) => {
        // console.log("Response=========================>", JSON.stringify(resp.data))
        if (JSON.stringify(resp.data.status) == 'true') {
          onSuccess(resp.data.data);
          console.log(JSON.stringify(resp.data.data));
        } else {
          onFailure(JSON.stringify(resp.data.message));
        }
      })
      .catch((ex) => {
        // console.log("======error=====", ex)
        if (ex == 'Error: Network Error') {
          onFailure('Network Request Failed');
        } else {
          onFailure(ex.message);
        }
      });
  }
  ChallengeCreation(challengeData, MediaData, onSuccess, onFailure) {
    const formdata = new FormData();
    formdata.append('DataArray', JSON.stringify(challengeData));

    this.sendMultiFormRequest(
      Urls.CHALLENGE_CREATION,
      formdata,
      (resp) => {
        onSuccess('created');
        console.log(resp.challenge_id);

        var mediaUploadPromises = [];
        MediaData.forEach((data, i) => {
          var p = new Promise((resolve, reject) => {
            const mediaForm = new FormData();
            mediaForm.append('c_id', resp.challenge_id);
            mediaForm.append('media', {
              uri:
                Platform.OS === 'android' ? data.image : 'file://' + data.image,
              // uri: MediaData.path,
              name: data.image.split('/').pop(),
              type: data.extension,
            });
            console.log('>>>>', JSON.stringify(mediaForm), '>>>>>>');
            this.sendMultiFormRequest(
              Urls.CHALLENGE_CREATION_MEDIA,
              mediaForm,
              (resp) => {
                console.log(resp);
                resolve('media uploded ' + i);
                onSuccess(i);
              },
              (error) => {
                console.log(error);
                reject(new Error(error));
                onFailure(error);
              },
            );
          });
          mediaUploadPromises.push(p);
        });

        console.log(
          '==================================================================',
        );
        Promise.all(mediaUploadPromises)
          .then((result) => {
            onSuccess('done');
            console.log('>>>', result);
            // if(result.length == 5){}
          })
          .catch((error) => {
            console.log('>>>', error);
            onFailure(error);
          });
      },
      (error) => {
        console.log(error);
        onFailure(error);
      },
    );
  }

  sendMultiFormRequest(url, _body, onResponse, onError) {
    console.log('=====================WEB REQUEST========================');
    console.log('URL==> ', url);
    console.log('BODYPARAMS==> ', _body);

    axios
      .post(url, _body, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then((resp) => {
        console.log('Response===>', JSON.stringify(resp.data));
        if (resp.data.status) {
          onResponse(resp.data);
        } else {
          onError(JSON.stringify(resp.data.message));
        }
      })
      .catch((ex) => {
        console.log('======error=====', ex);
        if (ex == 'Error: Network Error') {
          onError('Network Request Failed');
        } else {
          onError(ex.message);
        }
      });
  }

  sendSimplePostFormRequest(url, _body, onResponse, onError) {
    console.log('=====================WEB REQUEST========================');
    console.log('URL==> ', url);
    console.log('BODYPARAMS==> ', _body);
    axios
      .post(url, _body, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then((resp) => {
        console.log('Response===>', JSON.stringify(resp.data));
        if (JSON.stringify(resp.data.status) == 'true') {
          onResponse(resp);
        } else {
          onError(JSON.stringify(resp.data.message));
        }
      })
      .catch((ex) => {
        console.log('======error=====', ex);
        if (ex == 'Error: Network Error') {
          onError('Network Request Failed');
        } else {
          onError(ex.message);
        }
      });
  }
  ///////// WIKRAM CODE ////////
  sendPostRequestAxios(url, _body, onResponse, onError) {
    console.log('=====================WEB REQUEST========================');
    console.log('URL==> ', url);
    // prefs.readUserSessionData((session) => {
    // console.log("===session data=-===", session)
    // if (session && session != null) {
    //     session = session.data
    //     _body = _body + "&user_id=" + session.user_id
    // }
    console.log('BODYPARAMS 3==> ', _body);
    axios
      .post(url, _body, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then((resp) => {
        console.log('Response===>', JSON.stringify(resp.data));
        if (JSON.stringify(resp.data.status) == 'true') {
          onResponse(resp.data);
        } else {
          onError(JSON.stringify(resp.data.message));
        }
      })
      .catch((ex) => {
        console.log('======error=====', ex);
        if (ex == 'Error: Network Error') {
          onError('Network Request Failed');
        } else {
          onError(ex.message);
        }
      });
    // })
  }
  ///////// END WIKRAM CODE ////////

  postMediaRequest(url, formData, onSuccess, onFailure) {
    prefs.getUserSessionData((sData) => {
      let headers = {'Content-Type': 'multipart/form-data'};
      if (sData && sData.sessionToken) {
        headers.Authorization = 'Bearer ' + sData.sessionToken;
      }
      this.sendPostRequest(url, headers, formData, onSuccess, onFailure);
    });
  }

  getDataRequest(url, headerParams, onSuccess, onFailure) {
    prefs.getUserSessionData((sData) => {
      let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      if (sData && sData.sessionToken) {
        headers.Authorization = 'Bearer ' + sData.sessionToken;
      }
      this.sendGetRequest(url, headers, headerParams, onSuccess, onFailure);
    });
  }

  sendPostRequest(Url, headers, bodyParams, OnSuccess, OnError) {
    if (isDebugging) {
      console.log('------------API POST REQUEST--------------');
      console.log('URL==>', Url);
      console.log('HEADER==>', headers);
      console.log('BODYPARAMS==>', JSON.stringify(bodyParams));
    }
    axios
      .post(Url, bodyParams, {
        headers: headers,
      })
      .then((response) => {
        if (isDebugging) {
          console.log('RESPOSNE==>', JSON.stringify(response.data, null, 3));
        }
        var responseJson = response.data;
        if (responseJson && responseJson.status) {
          OnSuccess(responseJson);
        } else {
          OnError(responseJson);
        }
      })
      .catch((error) => {
        myutils.showSnackbar(error.message, 'red');
        OnError(this.CATCH_ERROR);
        if (isDebugging) {
          console.log('RESPOSNE==>', error);
          if (error.response) {
            console.log('RESPOSNE==>', error.response.data);
            console.log('RESPOSNE==>', error.response.status);
          }
        }
      });
  }

  // sendGetRequest(Url, headers, params, OnSuccess, OnError) {
  //     if (isDebugging) {
  //         console.log("------------API GET REQUEST--------------")
  //         console.log("URL==>", Url)
  //         console.log("HEADER==>", headers)
  //         console.log("PARAMS==>", params)
  //     }
  //     axios.get(Url, {
  //         headers: headers,
  //         params: params
  //     })
  //         .then((response) => {
  //             if (isDebugging) {
  //                 console.log("RESPOSNE==>", JSON.stringify(response.data, null, 3))
  //             }
  //             var responseJson = response.data
  //             if (responseJson && responseJson.status) {
  //                 OnSuccess(responseJson)
  //             } else {
  //                 OnError(responseJson)
  //             }
  //         })
  //         .catch((error) => {
  //             myutils.showSnackbar(error.message, "red")
  //             OnError(this.CATCH_ERROR)
  //             if (isDebugging) {
  //                 console.log("RESPOSNE==>", error);
  //                 if (error.response) {
  //                     console.log("RESPOSNE==>", error.response.data);
  //                     console.log("RESPOSNE==>", error.response.status);
  //                 }
  //             }
  //         })
  // }

  // axios.post(url, _body, {
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  // })
  // .then((response) => response.json())
  //     .then((responseJson) => {
  //         console.log("RESPONSE==>", JSON.stringify(responseJson, null, 3))
  //         if (responseJson.status == true) {
  //             onResponse(responseJson)
  //         } else {
  //             onError(responseJson)

  //         }
  //     }).catch((error) => {
  //         console.log("======error=====", error)
  //         if (error == 'TypeError: Network request failed') {
  //             onError("Network Request Failed")
  //         } else {
  //             onError(error.message)
  //         }})

  // fetch(url, {
  //     method: 'POST',
  //     headers: new Headers({
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         // 'dateTime': dt,
  //         'url': url,
  //         // 'key': key
  //     }),
  //     body: _body
  // })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //         console.log("RESPONSE==>", JSON.stringify(responseJson, null, 3))
  //         if (responseJson.status == true) {
  //             onResponse(responseJson)
  //         } else {
  //             onError(responseJson)

  //         }
  //     }).catch((error) => {
  //         console.log("======error=====", error)
  //         if (error == 'TypeError: Network request failed') {
  //             onError("Network Request Failed")
  //         } else {
  //             onError(error.message)
  //         }
  //         // onError('Something went wrong while connecting to server. try agaiin')

  //         //JUST FOR DEBUGGING//
  //         // if (AppConfigs.isDevelopmentMode) {
  //         //     fetch(url, {
  //         //         method: 'POST',
  //         //         headers: new Headers({
  //         //             'Content-Type': 'application/x-www-form-urlencoded',
  //         //             'dateTime': dt,
  //         //             'url': url,
  //         //             'key': key
  //         //         }),
  //         //         body: _body
  //         //     })
  //         //         .then((response) => response.text())
  //         //         .then((responseText) => {
  //         //             console.log("RESPOSNE ERROR==> ", responseText)
  //         //         }).catch((error2) => {
  //         //             console.log("RESPOSNE==> ", error2.message)
  //         //         });
  //         // }
  //     });
  // // })
}
