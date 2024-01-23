import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import { getVans } from '../../api';   // ../ -> Pages ../ -> src 
import React from 'react'

export async function loader() {
  return getVans();
}

const Van = () => {
  // Old ways to manage loading state and handle error and fetch API
  // const [vanData, setVanData] = React.useState([])
  // const [loading, setLoading] = React.useState(false)
  // const [error, setError] = React.useState(null)

  // React.useEffect(() => {
  //   async function loadVans() {
  //     setLoading(true)
  //     try {
  //       const data = await getVans()
  //       setVans(data)
  //     } catch (err) {
  //       setError(err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   loadVans()
  // }, [])

  // if (loading) {
  //     return <h1>Loading...</h1>
  // }

  // if (error) {
  //   return <h1>There was an error: {error.message}</h1>
  // }

  const [searchParams, setSearchParams] = useSearchParams()
  const vanData = useLoaderData()
  const typeFilter = searchParams.get("type")


  const displayedVan = typeFilter
    ? vanData.filter(van => typeFilter === van.type)
    : vanData

  const vanElements = displayedVan.map(van => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter
        }}
      >
        <img src={van.imageUrl} alt="vanImages"/>
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ))

  const handleFilter = ((type, currentType) => {
    setSearchParams(previousParam => {
      if (currentType == null)
        previousParam.delete(type)
      else {
        previousParam.set(type, currentType)
      }
      return previousParam;
    })
  })


  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilter('type', 'simple')}
          className={
            `van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`
          }
        >
          Simple
        </button>
        <button
          onClick={() => handleFilter('type', 'luxury')}
          className={
            `van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
          }
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilter('type', 'rugged')}
          className={
            `van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`
          }
        >
          Rugged
        </button>
        {
          typeFilter ? (
            <button
              onClick={() => handleFilter("type", null)}
              className="van-type clear-filters"
            >Clear filter</button>
          ) : null
        }
      </div>
      <div className="van-list">
        {vanElements}
      </div>
    </div>
  );
}

export default Van