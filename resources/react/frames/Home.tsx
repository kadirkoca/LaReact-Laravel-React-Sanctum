import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import DataService from "../services/data-service"
import Toast from "../elements/Toast"
import { Link } from "react-router-dom"

export interface IData {
    name: string
    temperature: number
    prevState: null
}

const Home = (props: any) => {
    const [data, setData] = useState<IData[] | any>(null)
    const isAuth = props.authenticated

    useEffect(() => {
        DataService.GetHOMEDATA()
            .then((res) => {
                setData(res)
            })
            .catch((ex) => {
                Toast("error", ex.error.toString())
            })
        return () => {}
    }, [])

    return (
        <div>
            {isAuth ? (
                <div>
                    <h1>Cities</h1>
                    <ul>
                        {data &&
                            data.map((city: IData) => {
                                return (
                                    <li key={city.name}>
                                        {city.name} is {city.temperature} Celsius
                                    </li>
                                )
                            })}
                    </ul>
                </div>
            ) : (
                <div>
                    <h1>Not Authenticated</h1>
                    <Link to='/login'>Login</Link>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    const { authenticated, csrf, user } = state.auth || {}

    return {
        authenticated,
        csrf,
        user,
    }
}
export default connect(mapStateToProps)(Home)
