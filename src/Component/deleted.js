import { redirect } from "react-router-dom"

export default async function deleted() {
    console.log("Inside delete page")
    const isUserAuthorized = false
    if (!isUserAuthorized) {
        console.log("Inside delete if page")
        const response = redirect(`/`)
        response.body = true
        //throw response
        return response
    }
    return null
}

// Response {type: 'default', status: 302, ok: false, statusText: '', headers: Headers, …}
// body: true
// bodyUsed: false
// headers: Headers {map: {…}}
// ok: false
// status: 302
// statusText: ""
// type: "default"
// url: ""
// _bodyInit: null
// _bodyText: ""
// [[Prototype]]: Object