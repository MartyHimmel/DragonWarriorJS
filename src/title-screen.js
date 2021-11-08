import Data from './data.js';
import Game from './game.js';

export default {
    starFrameCount: 0,

    drawTitle1() {
        const leftEdge = (Game.canvas.width - Data.titleScreen.screen1.width) / 2;
        Game.clear();
        Game.context.fillStyle = 'rgb(0, 0, 0)';
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.drawImage(
            Game.img_title,
            Data.titleScreen.screen1.x,
            Data.titleScreen.screen1.y,
            Data.titleScreen.screen1.width,
            Data.titleScreen.screen1.height,
            leftEdge,
            0,
            Data.titleScreen.screen1.width,
            Data.titleScreen.screen1.height
        );
    },

    drawTitle2() {
        const leftEdge = (Game.canvas.width - Data.titleScreen.screen2.width) / 2;
        Game.clear();
        Game.context.fillStyle = 'rgb(0, 0, 0)';
        Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.context.drawImage(
            Game.img_title,
            Data.titleScreen.screen2.x,
            Data.titleScreen.screen2.y,
            Data.titleScreen.screen2.width,
            Data.titleScreen.screen2.height,
            leftEdge,
            0,
            Data.titleScreen.screen2.width,
            Data.titleScreen.screen2.height
        );
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

    drawTitleStar(frame) {
        const leftEdge = (Game.canvas.width - Data.titleScreen.screen2.width) / 2;
        const posX = leftEdge + 378 - Math.round(Data.titleScreen.star[frame].width / 2);
        const posY = 175 - Math.round(Data.titleScreen.star[frame].height / 2);

        Game.context.drawImage(
            Game.img_title,
            Data.titleScreen.star[frame].x,
            Data.titleScreen.star[frame].y,
            Data.titleScreen.star[frame].width,
            Data.titleScreen.star[frame].height,
            posX,
            posY,
            Data.titleScreen.star[frame].width,
            Data.titleScreen.star[frame].height
        );
    },
}
