export async function getVans(id) {
    const urlBasedOnId = id ? `/api/vans/${id}` : '/api/vans'
    const res = await fetch(urlBasedOnId)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(JSON.stringify({
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }));
    }
    return data.vans
}

export async function getHostVans(id) {
    const urlBasedOnId = id ? `/api/host/vans/${id}` : '/api/host/vans'
    const res = await fetch(urlBasedOnId)
    const data = await res.json()
    if (!res.ok) {
        throw new Error(JSON.stringify({
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }));
    }
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch('/api/login',
        { method: 'post', body: JSON.stringify(creds) })
    const data = await res.json()

    if(!res.ok){
        throw new Error(JSON.stringify({
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }));
    }
    return data
} 