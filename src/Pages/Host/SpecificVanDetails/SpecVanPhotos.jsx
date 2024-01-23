import React from 'react'
import { useOutletContext } from 'react-router-dom'
function SpecVanPhotos() {
  const { currentVan } = useOutletContext()
  return (
    <img src={currentVan.imageUrl} className="host-van-detail-image" alt='current Van'/>
  )
}

export default SpecVanPhotos