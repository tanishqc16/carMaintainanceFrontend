import React from 'react'
import CreateCarRecord from './components/createCar'
import GetAllUserCars from './components/getAllCars'
import GetCarById from './components/getCarsById'
import CreateServicingRecord from './components/createServicing'
import GetAllServicingCar from './components/GetAllServicingCar'

function Car() {
  return (
    <div style={{marginBottom:"50px"}}>
      <CreateCarRecord/>
      <br />
      <hr />
      <GetAllUserCars/>
      <br />
      <GetCarById/>
      <br />
      <hr />
      <CreateServicingRecord/>
      <br />
      <hr />
      <GetAllServicingCar/>
      
    </div>
  )
}

export default Car
