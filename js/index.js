








window.onload = () => {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");

    class Player {
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.emuImg = new Image();
            this.emuImg.src = '/images/emu-icon.png';
}