import { Link, useLocation, useLoaderData } from 'react-router-dom' //useParams
import { getVans } from '../../api';

// import React, { useEffect, useState } from 'react'

export async function loader({ params }) {
  return getVans(params.id)
}

const VanDetails = () => {
  // const param = useParams()
  // const [van, setVan] = useState(null);

  // useEffect(() => {
  //   fetch(`/api/vans/${param.id}`).then(res =>
  //     res.json()
  //   ).then(data => setVan(data.vans))
  // }, [param.id])

  const van = useLoaderData();
  const location = useLocation()


  const search = location.state?.search || ""
  //const search = location.state ? location.state.search : "" above & this statement means same 

  const type = location.state?.type || "all"

  return (
    <div className="van-detail-container">
      <Link
        to={`..${search}`}
        relative='path'
        className="back-button"
      >&larr; <span>{`Back to ${type} vans`}</span></Link>
      {/* {van ? ( */}
      {(     /* now no need to handle loading with data API */
        <div className="van-detail">
          <img src={van.imageUrl} alt='VanImages' />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price"><span>${van.price}</span>/day</p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      )}
      {/* ) : <h2>Loading...</h2>} */}
    </div>
  )
}

export default VanDetails