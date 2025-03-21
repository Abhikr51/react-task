import { FlexItem, FlexLayout } from '@salt-ds/core'
import React from 'react'

const Confirmation = () => {
  return (
    <FlexLayout justify='center'>
        <FlexItem style={{padding : 100}} >
            <h2> <center> Great ! </center></h2>
            <p>You have succefully set up your profile details.</p>
        </FlexItem>
    </FlexLayout>
  )
}

export default Confirmation