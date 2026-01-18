import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import useLargeMedia from 'src/hooks/useLargeMedia'
import { webSocket } from 'src/webSocket'
const myPeerConnection = new RTCPeerConnection()

function PiazzaCalls() {
  const [options, setOptions] = useState([])
  const [audioOn, setAudioOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [stream, setStream] = useState(null)
  const [selected, setSelected] = useState(null)
  const largeMedia = useLargeMedia()
  const myRef = useRef(null)
  const yourRef = useRef(null)
  const initialConstraints = {
    audio: true,
    video: true,
  }
  const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:5349" },
    { urls: "stun:stun1.l.google.com:3478" },
    { urls: "stun:stun1.l.google.com:5349" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:5349" },
    { urls: "stun:stun3.l.google.com:3478" },
    { urls: "stun:stun3.l.google.com:5349" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:5349" }
  ];
  //   const myPeerConnection = new RTCPeerConnection(
  //     {
  //     iceServers: [
  //       {
  //         urls: iceServers.map((value) => {
  //           return (
  //             value.urls
  //           )
  //         })
  //       }
  //     ]
  //   }
  // );
  // let myPeerConnection
  const roomName = location.search.slice(4)
  console.log(location.search.slice(4))
  useEffect(() => {
    const initial = async () => {
      await getDevices()
      // const initialStream = await navigator.mediaDevices.getUserMedia(initialConstraints)
    }
    initial()
  }, [])
  useEffect(() => {
    if (myRef.current) {
      myRef.current.srcObject = stream
    }
  }, [stream])
  async function handleMuteClick() {
    const promise = stream
    if (promise) {
      promise
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    }
    setAudioOn(!audioOn)
  }
  async function handleStreamClick() {
    const promise = stream
    if (promise) {
      promise
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled))
    }
    setVideoOn(!videoOn)
  }
  const handleStopClick = () => {
    myRef.current.srcObject.getTracks()
      .forEach(track => track.stop())
    console.log(myRef.current)
  }
  async function handleDeviceChange(event) {
    myRef.current.srcObject.getTracks()
      .forEach(track => track.stop())
    setSelected(event.target.value)
    if (myPeerConnection && stream) {
      console.log(myPeerConnection.getSenders())
      const videoTrack = stream.getVideoTracks()[0]
      const videoSender = myPeerConnection.getSenders().find((sender) => sender.track.kind === 'video')
      videoSender.replaceTrack(videoTrack)
    }
  }
  useEffect(() => {
    if (selected) {
      getMedia(selected)
    }
  }, [selected])
  async function getDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      )
      setOptions(videoDevices)
      // videoDevices.forEach((device) => {
      //   const option = document.createElement('option')
      //   option.value = device.deviceId
      //   option.innerText = device.label
      //   videoSelect?.appendChild(option)
      // })
    } catch (error) {
      console.log(error)
    }
  }
  async function getMedia(deviceId) {
    const newConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } }
    }
    const constraints = deviceId ? newConstraints : initialConstraints
    try {
      const newConstraints = {
        audio: true,
        video: { deviceId: { exact: deviceId } }
      }
      const constraints = deviceId ? newConstraints : initialConstraints
      const newStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(newStream)
      setErrorMessage('')
    } catch (error) {
      const errorString = error?.toString()
      if (errorString) {
        setErrorMessage(errorString)
      }
      console.log(error)
    }
  }
  function handleIce(data) {
    console.log('icecandidate')
    console.log(data)
    webSocket.emit('ice', data.candidate, roomName)
  }
  function handleAddStream(data) {
    console.log('got a stream from peer')
    console.log('Peer Stream', data.stream)
    console.log('My Stream', stream)
    yourRef.current = data.stream
  }
  function makeConnection() {
    // myPeerConnection = new RTCPeerConnection()
    myPeerConnection.addEventListener('icecandidate', handleIce)
    myPeerConnection.addEventListener('addstream', handleAddStream)
    if (stream) {
      stream.getTracks().forEach((track) => myPeerConnection.addTrack(track, stream))
    }
  }
  async function initCall() {
    await getMedia(null)
    makeConnection()
  }
  async function handleWelcome() {
    await initCall()
    webSocket.emit('joinRoom', roomName, initCall)
  }
  useEffect(() => {
    handleWelcome()
  }, [])
  const welcome = async () => {
    console.log('sent the offer')
    console.log(myPeerConnection)
    const offer = await myPeerConnection.createOffer()
    console.log(offer)
    myPeerConnection.setLocalDescription(offer)
    webSocket.emit('offer', offer, roomName)
    if (myPeerConnection) {
    }
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('welcome', welcome)
    return () => {
      webSocket.off('welcome', welcome)
    }
  })
  const offer = async (offer) => {
    console.log('received the offer')
    myPeerConnection.setRemoteDescription(offer)
    const answer = await myPeerConnection.createAnswer()
    console.log('sent the answer')
    console.log(myPeerConnection)
    console.log(answer)
    myPeerConnection.setLocalDescription(answer)
    webSocket.emit('answer', answer, roomName)
    if (myPeerConnection) {
    }
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('offer', offer)
    return () => {
      webSocket.off('offer', offer)
    }
  })
  const answer = (answer) => {
    console.log('received the answer')
    myPeerConnection.setRemoteDescription(answer)
    if (myPeerConnection) {
    }
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('answer', answer)
    return () => {
      webSocket.off('answer', answer)
    }
  })
  const ice = (ice) => {
    console.log('received candidate')
    myPeerConnection.addIceCandidate(ice)
    if (myPeerConnection) {
    }
  }
  useEffect(() => {
    if (!webSocket) return
    webSocket.on('ice', ice)
    return () => {
      webSocket.off('ice', ice)
    }
  })

  return (
    <div
    // id="myStream"
    >
      <div className={`flex ${!largeMedia && 'flex-col'} gap-1`}>
        <video
          // id="yourScreen"
          ref={yourRef}
          width="320"
          height="240"
          controls
          autoPlay
        ></video>
        <video
          id="myScreen"
          ref={myRef}
          width="320"
          height="240"
          controls
          autoPlay
          muted
        ></video>
      </div>
      <div>
        <div className="flex gap-5">
          <Button onClick={handleMuteClick}>
            {audioOn ? 'unmute' : 'mute'}
          </Button>
          <Button onClick={handleStreamClick}>
            {videoOn ? 'turn stream on' : 'turn stream off'}
          </Button>
          <Button onClick={handleStopClick}>
            stop
          </Button>
        </div>
        <select id="devices" onChange={handleDeviceChange}>
          {options.map((value, index) => {
            return (
              <option key={index} value={value.deviceId} selected={stream?.getVideoTracks()[0].id === value.deviceId}>
                {value.label}
              </option>
            )
          })}
        </select>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
    </div >
  )
}

export default PiazzaCalls
