import React from 'react'
import { Link, NavLink, Outlet, useLoaderData } from 'react-router-dom'
import { getHostVans } from '../api'
import { authorizeUser } from '../utils/authorizeUser'
// import { useEffect, useState } from 'react'

export async function loader({ params, request}) {
    await authorizeUser(request)
    return getHostVans(params.id)
}

function HostVansDetails() {
    //const [currentVan, setCurrentVan] = useState(null) 
    //const params = useParams();

    // useEffect(() => {
    //     fetch(`/api/host/vans/${params.id}`)
    //         .then(resp => resp.json())
    //         .then(data => setCurrentVan(data.vans))
    // }, [params])

    // if (!currentVan) {
    //     return <h1>Loading...</h1>
    // }


    const currentVan = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }


    return (
        <section>
            <Link
                to=".."
                relative='path'
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt='Host current Van'/>
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>
                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentVan }} /> {/* sending currentVan value as an object */}
            </div>
        </section>
    )
}

export default HostVansDetails