import { Container } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'

const VideoHero = () => {
  return (
    <Container disableGutters>

<ReactPlayer url='https://res.cloudinary.com/dweqbyja4/video/upload/v1686828709/HomepageEp6A3_Arcade_zhoohj.mp4' />
    </Container>
  )
}

export default VideoHero