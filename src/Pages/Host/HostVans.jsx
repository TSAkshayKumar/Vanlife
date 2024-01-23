import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { getHostVans } from '../../api'
import { authorizeUser } from '../../utils/authorizeUser';
// import { useEffect, useState } from 'react'

export async function loader({request}) {
    await authorizeUser(request);
    return getHostVans();
}


function HostVans() {
    // const [hostVans, setHostVans] = useState([])
    // useEffect(() => {
    //     fetch("/api/host/vans")
    //         .then(resp => resp.json())
    //         .then(data => setHostVans(data.vans))
    // }, [])

    const hostVans = useLoaderData();
    const hostVansEle = hostVans.map(van =>
    (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`show of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    )
    )

    return (
        <section>
            <div className="host-vans-list">
                <h1 className="host-vans-title">Your listed vans</h1>
                {/*{hostVans ? ( */}
                <section> {hostVansEle} </section> 
                {/* ) : <h2>Loading...</h2> }*/}
            </div>
        </section>
    )
}

export default HostVans
