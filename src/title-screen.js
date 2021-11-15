import Data from './data.js';
import Game from './game.js';

export default {
    frameCount: 0,
    starFrameCount: 0,

    handleState() {
        if (this.frameCount < 240) {
            this.frameCount++;
            this.drawTitle1();

            if ('Enter' in Game.keysDown) {
                this.frameCount = 240;
                delete Game.keysDown['Enter'];
            }
        } else {
            this.drawTitle2();

            if ('Enter' in Game.keysDown) {
                Game.changeState('exploration');
                delete Game.keysDown['Enter'];
                Game.startGame();
            }
        }
    },

    drawTitle1() {
        const posX = (Game.canvas.width - Data.titleScreen.screen1.width) / 2;
        this.clearScreen();
        this.drawTitleFrame(Data.titleScreen.screen1, posX, 0);
    },

    clearScreen() {
        Game.clear();
        Game.context.fillStyle = 'rgb(0, 0, 0)';
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
    },

    drawTitleFrame(frameData, x, y) {
        Game.context.drawImage(
            Game.imgTitle,
            frameData.x,
            frameData.y,
            frameData.width,
            frameData.height,
            x,
            y,
            frameData.width,
            frameData.height
        );
    },

    drawTitle2() {
        const posX = (Game.canvas.width - Data.titleScreen.screen2.width) / 2;
        this.clearScreen();
        this.drawTitleFrame(Data.titleScreen.screen2, posX, 0);

        this.starFrameCount++;
        if (this.starFrameCount >= 240) {
            this.starFrameCount = 0;
        }

        const ranges = [
            {short: [60, 72, 90, 102], long: [150, 174]},
            {short: [62, 70, 92, 100], long: [154, 170]},
            {short: [64, 68, 94, 98], long: [158, 166]},
            {short: [66, 96], long: [162]},
        ];

        ranges.forEach((frame, index) => {
            frame.short.forEach(shortFrame => {
                if (this.starFrameCountBetween(shortFrame, shortFrame + 1)) {
                    this.drawTitleStar(index);
                }
            });

            frame.long.forEach(longFrame => {
                if (this.starFrameCountBetween(longFrame, longFrame + 3)) {
                    this.drawTitleStar(index);
                }
            });
        });
    },

    starFrameCountBetween(min, max) {
        return this.starFrameCount >= min && this.starFrameCount <= max;
    },

    drawTitleStar(frameIndex) {
        const starCenterX = 378;
        const starCenterY = 175;
        const targetFrame = Data.titleScreen.star[frameIndex];
        const leftEdge = (Game.canvas.width - Data.titleScreen.screen2.width) / 2;
        const posX = leftEdge + starCenterX - Math.round(targetFrame.width / 2);
        const posY = starCenterY - Math.round(targetFrame.height / 2);
        this.drawTitleFrame(targetFrame, posX, posY);
    },
}
