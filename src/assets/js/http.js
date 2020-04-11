import axios from 'axios'
import qs from 'qs'


axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function errorState(response) {
  store.commit('UPDATE_LOADING', false)  //隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400 || response.status === 403)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: '网络异常'
    })
  }

}

function successState(res) {
  store.commit('UPDATE_LOADING', false) //隐藏loading
  //统一判断后端返回的错误码
  if (res.data.errCode == '000002') {
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: res.data.errDesc || '网络异常',
      onShow() {
      },
      onHide() {
        console.log('确定')
      }
    })
  } else if (res.data.errCode != '000002' && res.data.errCode != '000000') {
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: res.data.errDesc || '网络异常',
      onShow() {

      },
      onHide() {
        console.log('确定')
      }
    })
  }
}
var AddressURL = baseSet.http;

var domain = window.location.host;
function checkStatus(response) {
  if (response && response.data.code  == 1) {
    alert('您的账号已过期，请重新登录')
    sessionStorage.clear()
    localStorage.clear()
    location.href = 'http://'+domain+'/#/login'
  }
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  if (response && response.status   === 302) {
    alert('您的账号已过期，请重新登录')
    sessionStorage.clear()
    localStorage.clear()
    location.href = 'http://'+domain
  }
  
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    // alert(res.msg)
    console.log(res.msg)
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  return res
}

export default {
  post(url, data, token) {
    if (token) {
      return axios({
        method: 'post',
        baseURL: AddressURL,
        url,
        // data,
        data: qs.stringify(data),
        headers: {
          "Authorization": token,
        }
      }).then(
        (response) => {
          return checkStatus(response)
        }
      ).catch(
        (res) => {
          return checkCode(res)
        }
      )
    } else {
      return axios({
        method: 'post',
        baseURL: AddressURL,
        url,
        data: qs.stringify(data),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
      }).then(
        (response) => {
          return checkStatus(response)
        }
      ).catch(
        (res) => {
          return checkCode(res)
        }
      )
    }

  },
  patch(url, data, token) {
      return axios({
          method: 'patch',
          baseURL: AddressURL,
          url,
          data,
          headers: {
              "Authorization": token,
              "Content-Type": 'application/json'
          }
      }).then(
          (response) => {
              return checkStatus(response)
          }
      ).catch(
          (res) => {
              return checkCode(res)
          }
      )
  },
  delete(url, data) {
      return axios({
          method: 'delete',
          baseURL: AddressURL,
          url,
          data: qs.stringify(data),
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
      }).then(
          (response) => {
              return checkStatus(response)
          }
      ).catch(
          (res) => {
              return checkCode(res)
          }
      )
  },
  upload(url, data) {
  return axios({
    method: 'post',
    baseURL: AddressURL,
    url,
    data: data,
    // timeout: 10000,
//          headers: {
//              'X-Requested-With': 'XMLHttpRequest',
//              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//          }
  }).then(
    (response) => {
      return checkStatus(response)
    }
  ).catch(
    (res) => {
      return checkCode(res)
    }
  )
},
  get(url, params, token) {
    return axios({
      method: 'get',
      baseURL: AddressURL,
      url,
      data: qs.stringify(params), // get 请求时带的参数
      // timeout: 10000000,
      headers: {
          "Authorization": token
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).catch(
      (res) => {
        return checkCode(res)
      }
    )
  },
  put(url, params, token) {
      return axios({
          method: 'put',
          baseURL: AddressURL,
          url,
          data: params, // get 请求时带的参数
          // timeout: 10000000,
          headers: {
              "Authorization": token
          }
      }).then(
          (response) => {
              return checkStatus(response)
          }
      ).catch(
          (res) => {
              return checkCode(res)
          }
      )
  },
  del(url, params) {
    url = url + '?access_token=' + sessionStorage.getItem('token')
    return axios({
      method: 'delete',
      baseURL: AddressURL,
      url,
      data: qs.stringify(params),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).catch(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
