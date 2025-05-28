const APP_ID = "9ffb1aec9b9c4319995226400398f2d7"
// give a user an id
let uid = sessionStorage.getItem('uid')

if(!uid){
    uid = String(Math.floor(Math.random() * 10000))
    sessionStorage.setItem('uid' , uid)
}

let displayName = sessionStorage.getItem('display_name')
if(!displayName){
    window.location = 'looby.html'
}

// making a room id 

let token = null;
let client;


let rtmClient;
let channel;




const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

let roomId = urlParams.get('room')
if(!roomId){
    roomId = 'main'
}

let loacalTracks = [];
let remoteUsers = {};

let localScreenTracks;

let sharingScreen = false;

let JoinRoomInit = async () =>{
    // rtmClient = await AgoraRTM.createInstance(APP_ID)
    // await rtmClient.login({uid,token})

    // channel = await rtmClient.creteChannel(roomId)
    // await channel.join()

    // channel.on('MemberJoined', handleMemberJoined)
    // creat client with 4 stuffs
    client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})
    await client.join(APP_ID , roomId, token , uid)
    // eventlistiner for those who joined
    client.on('user-published' , handleUserPublished)
    // eventlistiner for those who leaved
    client.on('user-left' , handleUserLeft)
    JoinStream()
}

let JoinStream = async () =>{
    // create and ask premissions to users
    loacalTracks = await AgoraRTC.createMicrophoneAndCameraTracks({}, {encoderConfig:{
        width:{min:460 , ideal:1920 , max:1920},
        height:{min:480 , ideal:1080 , max:1080}
    }})
    // create teh palyer
    let player = `<div id="user-container-${uid}" class="prersonAvatar">
        <div class="video-player" id="user-${uid}"></div>
    </div>`
    // add the palyer to the DOM
    document.getElementById('smallFrames').insertAdjacentHTML('beforeend' , player)
    // adding a the eventlistner to it
    document.getElementById(`user-container-${uid}`).addEventListener('click',expandVideoFrame)
    //play the video
    loacalTracks[1].play(`user-${uid}`)
    // publish the new usersTraks
    await client.publish([loacalTracks[0],loacalTracks[1]])
}

let switchtoCamera = async () =>{
        // create teh palyer
        let player = `<div id="user-container-${uid}" class="prersonAvatar">
        <div class="video-player" id="user-${uid}"></div>
    </div>`
    // add the palyer to the DOM
    displayFrame.insertAdjacentHTML('beforeend' , player)
    await loacalTracks[0].setMuted(true)
    await loacalTracks[1].setMuted(true)

    document.getElementById('audio-btn').classList.remove('active')
    document.getElementById('screen-btn').classList.remove('active')

    loacalTracks[1].play(`user-${uid}`)
    await client.publish([loacalTracks[1]])
}

let handleUserPublished = async (user , mediaType) => {
    // get user uid
    remoteUsers[user.uid] = user

    await client.subscribe(user, mediaType)
    // add new users to the DOM
    let player = document.getElementById(`user-container-${user.uid}`)
    if(player === null){

        player = `<div id="user-container-${user.uid}" class="prersonAvatar">
        <div class="video-player" id="user-${user.uid}"></div>
        </div>`
        document.getElementById('smallFrames').insertAdjacentHTML('beforeend' , player)
        document.getElementById(`user-container-${user.uid}`).addEventListener('click',expandVideoFrame)


    }

    if(mediaType === 'video'){
        user.videoTrack.play(`user-${user.uid}`)
    }
    if(mediaType === 'audio'){
        user.audioTrack.play()
    }

}

let handleUserLeft = async (user) =>{
    //remove user from data
    delete remoteUsers[user.uid]
    // remove frame from DOM
    document.getElementById(`user-container-${user.uid}`).remove()

    if(userIdInDisplayFrame === `user-container-${user.uid}`){
        displayFrame.style.display = null

    }
}

let toggleCamera = async (e) =>{
    let button = e.currentTarget
    let icon = document.getElementById('kolo')
    icon.classList.remove('preactive')
    if(loacalTracks[1].muted){
        await loacalTracks[1].setMuted(false)
        button.classList.add('active')
    }else{
        await loacalTracks[1].setMuted(true)
        button.classList.remove('active')
    }
}
let toggleAudio = async (e) =>{
    let button = e.currentTarget
    let icon = document.getElementById('kolo2')
    icon.classList.remove('preactive')
    if(loacalTracks[0].muted){
        await loacalTracks[0].setMuted(false)
        button.classList.add('active')
    }else{
        await loacalTracks[0].setMuted(true)
        button.classList.remove('active')
    }
}

let toggleScreen = async(e) =>{
    let screenButton = e.currentTarget
    let cameraButton = document.getElementById('camera-btn')

    if(!sharingScreen){
        sharingScreen = true;
        screenButton.classList.add('active')
        cameraButton.classList.remove('active')
        cameraButton.style.display= 'none'
        screenBtn.style.display= 'none'

        localScreenTracks = await AgoraRTC.createScreenVideoTrack()
        document.getElementById(`user-container-${uid}`).remove()

        displayFrame.style.display = 'block'
        let player = `<div id="user-container-${uid}" class="prersonAvatar">
            <div class="video-player" id="user-${uid}"></div>
        </div>`

        displayFrame.insertAdjacentHTML('beforeend'  ,player)

        document.getElementById(`user-container-${uid}`).addEventListener('click' , expandVideoFrame)

        userIdInDisplayFrame = `user-container-${uid}`

        localScreenTracks.play(`user-${uid}`)

        await client.unpublish(loacalTracks[1])
        await client.publish(localScreenTracks)
        
    }else{
        sharingScreen = false;
        screenButton.classList.remove('active')
        cameraButton.style.display= 'flex'
        document.getElementById(`user-container-${uid}`).remove()
        await client.unpublish(localScreenTracks)

        displayFrame.style.display = "block"
        
        switchtoCamera()
        for(let i=0;videoFrames.length > i ; i++){
            videoFrames[i].addEventListener('click', expandVideoFrame)
        }
        
        document.getElementById('fullScreen').addEventListener("click" , function(){
        let videoElement = displayFrame.children[0]

        if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Firefox
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
        videoElement.msRequestFullscreen();
    }

      })
    }
}

document.getElementById('camera-btn').addEventListener("click" , toggleCamera)
document.getElementById('audio-btn').addEventListener("click" , toggleAudio)
document.getElementById('screen-btn').addEventListener("click" , toggleScreen)

JoinRoomInit()