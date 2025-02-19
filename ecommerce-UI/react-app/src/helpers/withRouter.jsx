import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function withRouter(Component) {
  function ComponentWithRouterProp(props){
    let navigate = useNavigate()
    let location = useLocation()
    let params = useParams()
    return <Component {...props} router={{location,navigate,params}}/>
  }
  return ComponentWithRouterProp
}

export default withRouter