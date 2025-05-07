window.addEventListener('load', function(){
    // STORED ARRAY
    const textMessages = ["Join our company in Technology Zone of Visionary Innovation Hub for unparalleled opportunities in cutting-edge tech development! 15 QUOTAS LEFT!",
        "Become part of the Innovation Zone at Visionary Innovation Hub, where creativity meets research for groundbreaking solutions! 10 QUOTAS LEFT!",
        "Discover the Eco Zone at Visionary Innovation Hub, dedicated to sustainable practices and technologies for a greener future! 12 QUOTAS LEFT!"
    ];
    
    const videoPlayer = [
        '<source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.mp4" type="video/mp4"><source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.webm" type="video/webm">',
        '<source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.mp4" type="video/mp4"><source src="https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.webm" type="video/webm">'
    ];


    
    // MESSAGE UPDATE
    let index = Math.floor(Math.random()*textMessages.length);
    new Selector("title-1").id().innerHTML = textMessages[index];
    
    // VIDEO UPDATE
    const videoLink = new Selector('video').query();
    let videoIndex = 0;
    videoLink.innerHTML= videoPlayer[videoIndex];
    
    
    
    
    // INFINITE LOOP CALLED
    setInterval(messageDisplay,3000);
    
    function messageDisplay(){
        index++;
        if (index>2){
            index = 0;
        };
        new Selector("title-1").id().innerHTML = textMessages[index];
    }

    videoLink.addEventListener('ended',function(){
        if (videoIndex==0){
            videoIndex=1;
        }
        else{
            videoIndex=0;
        }
        
        videoLink.innerHTML = videoPlayer[videoIndex];
        videoLink.load();
        videoLink.play();
    });
});
