import axios from "axios"
import { GetHOMEURL, SanctumURL, LoginURL } from "./urlSet"
import axiosClient from "./axiosClient"
import { WriteStorage } from './storage-service'

class DataService {
    GetHOMEDATA() {
        return new Promise((res, rej) => {
            axiosClient.get(GetHOMEURL)
                .then((response) => {
                    if (response.data.error) {
                        rej({ error: response.data.error })
                    }
                    res(response.data)
                })
                .catch((e) => {
                    rej({ error: e })
                })
        })
    }

    LoginService(email: string, password: string, context: any) {
        return new Promise((res, rej) => {
            axiosClient.post(LoginURL, { email, password }).then((response) => {
                if (response.data.error) {
                    rej({ error: response.data.error })
                }

                context.authenticated = true
                context.user = response.data.user
                res(context)
            }).catch((e)=>{
                rej({ error: e })
            })
        })
    }

    GetCSRF() {
        return axios
            .get(SanctumURL)
            .then((response) => {
                const csrf = response?.config?.headers?.["X-XSRF-TOKEN"]
                if(csrf){
                    return csrf
                }else{
                    return null
                }
            })
            .catch((e) => {
                return { error: e }
            })
    }
}

export default new DataService()
