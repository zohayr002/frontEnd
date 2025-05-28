
let displayFrame = document.getElementById('bigFrame')
let videoFrames = document.getElementsByClassName('prersonAvatar')
let screenBtn = document.getElementById('screen-btn')

let userIdInDisplayFrame = null;

let expandVideoFrame = (e) =>{
    // definite the first child on the big frame (exist one)
    let child = displayFrame.children[0]
    // if exist remove him by moving him to the small frames
    if(child){
        document.getElementById('smallFrames').appendChild(child)
    }
    //shows the frame
    displayFrame.style.display = 'block';
    screenBtn.style.display = 'none';
    // shown the clicked avatar
    displayFrame.appendChild(e.currentTarget)
    userIdInDisplayFrame = e.currentTarget.id

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
// add an eventListner to the every clickable avatar
for(let i=0;videoFrames.length > i ; i++){
    videoFrames[i].addEventListener('click', expandVideoFrame)
}

let hideDisplayFrame = async()  =>{
    userIdInDisplayFrame = null
    displayFrame.style.display = null

    // definite the first child on the big frame (exist one)
    let child = displayFrame.children[0]
    document.getElementById('smallFrames').appendChild(child)
    screenBtn.style.display = 'flex';


}
displayFrame.addEventListener('click' , hideDisplayFrame)

