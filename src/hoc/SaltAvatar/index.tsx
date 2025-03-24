import React, { FC } from 'react'
import { Avatar, AvatarProps } from "@salt-ds/core"

export interface SaltAvatarProps extends AvatarProps{

}

const  SaltAvatar:FC<AvatarProps> = ({...rest}) =>{
  return (
   <Avatar  {...rest}/>
  )
}

export default SaltAvatar