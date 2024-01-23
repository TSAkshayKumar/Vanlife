import { redirect } from "react-router-dom"

export async function authorizeUser(request) {
    const pathname = new URL(request.url).pathname
    const isUserAuthorized = localStorage.getItem('userAuthorized')
    if (!isUserAuthorized) {
        const response = redirect(`/login?message=You Must Login first.&redirectTo=${pathname}`)
        response.body = true
        throw response
    }
    return null
}

