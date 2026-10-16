namespace SpriteKind {
    export const BOSS = SpriteKind.create()
    export const SpecialFX = SpriteKind.create()
    export const NOMKINS = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        if (dashing) {
            dashing = false
            sprite.vy = 0
        }
        ableToDash = true
        dashing = false
        body.ay = 400
    }
})
function createFlipped (anim: Image[]) {
    tempList = []
    for (let Frame = 0; Frame <= anim.length - 1; Frame++) {
        tempImage = anim[Frame]
        tempImage.flipX()
        tempList.push(tempImage)
    }
    return tempList
}
sprites.onOverlap(SpriteKind.NOMKINS, SpriteKind.NOMKINS, function (sprite, otherSprite) {
    sprite.x += 1
    otherSprite.x += -1
})
function pumpkinStates () {
    characterAnimations.loopFrames(
    pumpkinLeftTop,
    assets.animation`anim-pumpkinTopleft`,
    200,
    characterAnimations.rule(Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    pumpkinHitboxLB,
    assets.animation`anim-pumpkinBottomleft`,
    200,
    characterAnimations.rule(Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    pumpkinRightTop,
    assets.animation`anim-pumpkinTopright`,
    200,
    characterAnimations.rule(Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    pumpkinRightBottom,
    assets.animation`anim-pumpkinBottomright`,
    200,
    characterAnimations.rule(Predicate.FacingUp)
    )
    characterAnimations.loopFrames(
    pumpkinLeftTop,
    assets.animation`anim-pumpkinLTSide`,
    200,
    characterAnimations.rule(Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    pumpkinHitboxLB,
    assets.animation`anim-pumpkinLBSide`,
    200,
    characterAnimations.rule(Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    pumpkinRightTop,
    assets.animation`anim-pumpkinRTSide`,
    200,
    characterAnimations.rule(Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    pumpkinRightBottom,
    assets.animation`anim-pumpkinRBSide`,
    200,
    characterAnimations.rule(Predicate.FacingLeft)
    )
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (body.vy == 0 && !(dashing)) {
        body.vy = -125
        music.play(music.createSoundEffect(WaveShape.Square, 94, 593, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (body.vy != 0 && ableToDash && !(dashing)) {
        music.play(music.createSoundEffect(WaveShape.Square, 420, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        music.play(music.createSoundEffect(WaveShape.Noise, 420, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        ableToDash = false
        dashing = true
        blastSprite = sprites.create(assets.image`blank8-8`, SpriteKind.SpecialFX)
        blastSprite.setPosition(body.x, body.y)
        if (controller.up.isPressed()) {
            body.vy = -150
            dashingUP = true
            animation.runImageAnimation(
            blastSprite,
            assets.animation`anim-BlastOffUPfinal`,
            50,
            false
            )
            timer.after((assets.animation`anim-BlastOffUPfinal`.length - 1) * 50, function () {
                sprites.destroy(blastSprite)
            })
        } else if (!(controller.up.isPressed())) {
            body.vx = direction * 200
            body.vy = 0
            dashingUP = false
            if (direction == 1) {
                animation.runImageAnimation(
                blastSprite,
                assets.animation`anim-BlastOff`,
                50,
                false
                )
            } else {
                animation.runImageAnimation(
                blastSprite,
                blastLeft,
                50,
                false
                )
            }
            timer.after((assets.animation`anim-BlastOff`.length - 1) * 50, function () {
                sprites.destroy(blastSprite)
            })
        }
        body.ay = 0
        timer.after(100, function () {
            body.ay = 400
        })
    }
})
function play_music (musicNumber: number) {
    if (musicNumber == 0) {
        music.play(pianoRoll.createSong(assets.song`yourEndIsNear`), music.PlaybackMode.UntilDone)
    } else if (musicNumber == 1) {
        music.play(pianoRoll.createSong(assets.song`BossTheme`), music.PlaybackMode.LoopingInBackground)
    } else if (musicNumber == 2) {
        music.play(pianoRoll.createSong(assets.song`Title`), music.PlaybackMode.InBackground)
    }
}
function blastSound () {
    music.play(music.createSoundEffect(WaveShape.Triangle, 63, 63, 255, 255, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Triangle, 100, 100, 255, 255, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.play(music.createSoundEffect(WaveShape.Triangle, 63, 1, 255, 255, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    music.play(music.createSoundEffect(WaveShape.Triangle, 100, 1, 255, 255, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
}
function tiling (array: Sprite[]) {
    for (let index = 0; index <= array.length - 1; index++) {
        if (index == 0) {
            array[index].setPosition(array[1].x, array[1].y - 8)
        } else if (index == 1) {
        	
        } else if (index == 2) {
            if (array == character) {
                array[index].setPosition(array[1].x + direction * 8, array[1].y - 8)
            } else {
                array[index].setPosition(array[1].x + 8, array[1].y - 8)
            }
        } else if (index == 3) {
            if (array == character) {
                array[index].setPosition(array[1].x + direction * 8, array[1].y)
            } else {
                array[index].setPosition(array[1].x + 8, array[1].y)
            }
        }
        if (array == boss) {
            array[index].setFlag(SpriteFlag.GhostThroughWalls, true)
        }
    }
}
function start () {
    direction = 1
    list = []
    scene.setBackgroundImage(assets.image`imag-backGround`)
    head = sprites.create(assets.image`blank8-8`, SpriteKind.Player)
    body = sprites.create(assets.image`blank8-8`, SpriteKind.Player)
    item = sprites.create(assets.image`blank8-8`, SpriteKind.Player)
    dashHead = sprites.create(assets.image`blank8-8`, SpriteKind.Player)
    pumpkinLeftTop = sprites.create(assets.image`blank8-8`, SpriteKind.BOSS)
    pumpkinHitboxLB = sprites.create(assets.image`blank8-8`, SpriteKind.BOSS)
    pumpkinRightTop = sprites.create(assets.image`blank8-8`, SpriteKind.BOSS)
    pumpkinRightBottom = sprites.create(assets.image`blank8-8`, SpriteKind.BOSS)
    animations()
    character = [
    head,
    body,
    item,
    dashHead
    ]
    boss = [
    pumpkinLeftTop,
    pumpkinHitboxLB,
    pumpkinRightTop,
    pumpkinRightBottom
    ]
    characterAnimations.setCharacterState(dashHead, characterAnimations.rule(Predicate.Moving))
    characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingRight))
    characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
    body.ay = 400
    tiles.setCurrentTilemap(tilemap`level1`)
    scene.cameraFollowSprite(body)
    tiles.placeOnTile(body, tiles.getTileLocation(0, 6))
    tiles.placeOnTile(pumpkinHitboxLB, tiles.getTileLocation(4, 3))
    pumpkinHitboxLB.setPosition(0, 0)
    startupCutscene = true
    for (let playerFunction of sprites.allOfKind(SpriteKind.Player)) {
        if (!(playerFunction == body)) {
            playerFunction.setFlag(SpriteFlag.GhostThroughWalls, true)
        }
    }
    for (let enemyState of sprites.allOfKind(SpriteKind.BOSS)) {
        characterAnimations.setCharacterState(enemyState, characterAnimations.rule(Predicate.FacingUp))
    }
    startupMusicEnd = false
    sprites.setDataNumber(pumpkinHitboxLB, "attackNumber", 1)
    timer.background(function () {
        play_music(0)
        timer.after(1000, function () {
            startupMusicEnd = true
        })
    })
}
function animations () {
    headLeft = createFlipped(assets.animation`anim-Head0`)
    headDashLeft = createFlipped(assets.animation`anim-DashHead`)
    bodyLeft = createFlipped(assets.animation`anim-bodyIdle`)
    bodyWalkLeft = createFlipped(assets.animation`anim-bodyWalk`)
    bodyJumpLeft = createFlipped(assets.animation`anim-bodyJump`)
    bodyFallLeft = createFlipped(assets.animation`bodyFall`)
    bodyDashLeft = createFlipped(assets.animation`anim-DashBody`)
    blastLeft = createFlipped(assets.animation`anim-BlastOff`)
    characterAnimations.loopFrames(
    head,
    assets.animation`anim-Head`,
    200,
    characterAnimations.rule(Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    head,
    [assets.image`blank8-8`],
    200,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    head,
    assets.animation`anim-DashHeadUP`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    body,
    assets.animation`anim-bodyIdle`,
    500,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    body,
    assets.animation`anim-bodyWalk`,
    100,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    body,
    assets.animation`anim-bodyJump`,
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    body,
    assets.animation`bodyFall`,
    100,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight)
    )
    characterAnimations.loopFrames(
    body,
    assets.animation`anim-DashBody`,
    50,
    characterAnimations.rule(Predicate.MovingRight)
    )
    characterAnimations.loopFrames(
    body,
    assets.animation`anim-DashBodyUP`,
    50,
    characterAnimations.rule(Predicate.MovingUp)
    )
    characterAnimations.loopFrames(
    head,
    headLeft,
    500,
    characterAnimations.rule(Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    body,
    bodyLeft,
    500,
    characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    body,
    bodyWalkLeft,
    100,
    characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    body,
    bodyJumpLeft,
    100,
    characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    body,
    bodyFallLeft,
    100,
    characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft)
    )
    characterAnimations.loopFrames(
    body,
    bodyDashLeft,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    head,
    [assets.image`blank8-8`],
    200,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    characterAnimations.loopFrames(
    dashHead,
    [assets.image`blank8-8`],
    200,
    characterAnimations.rule(Predicate.Moving)
    )
    characterAnimations.loopFrames(
    dashHead,
    headDashLeft,
    50,
    characterAnimations.rule(Predicate.MovingLeft)
    )
    pumpkinStates()
}
function bossPattern (attack: number) {
    if (!(attacking)) {
        pumpkinHitboxLB.ax = 0
        attacking = true
        if (attack == 1) {
            spriteutils.moveTo(pumpkinHitboxLB, spriteutils.point(144, 16), 500)
            for (let enemyState2 of sprites.allOfKind(SpriteKind.BOSS)) {
                characterAnimations.setCharacterState(enemyState2, characterAnimations.rule(Predicate.FacingLeft))
            }
            timer.after(1000, function () {
                for (let enemyState3 of sprites.allOfKind(SpriteKind.BOSS)) {
                    characterAnimations.setCharacterState(enemyState3, characterAnimations.rule(Predicate.MovingLeft))
                }
                for (let index = 0; index < 4; index++) {
                    pause(250)
                    littleNomkins = sprites.create(assets.image`blank8-8`, SpriteKind.NOMKINS)
                    littleNomkins.setPosition(pumpkinHitboxLB.x, pumpkinHitboxLB.y - 4)
                    characterAnimations.loopFrames(
                    littleNomkins,
                    assets.animation`anim-NOMKINS`,
                    100,
                    characterAnimations.rule(Predicate.FacingLeft)
                    )
                    characterAnimations.loopFrames(
                    littleNomkins,
                    createFlipped(assets.animation`anim-NOMKINS`),
                    100,
                    characterAnimations.rule(Predicate.FacingRight)
                    )
                    littleNomkins.follow(head, randint(30, 50))
                }
                timer.after(2000, function () {
                    for (let enemyState4 of sprites.allOfKind(SpriteKind.BOSS)) {
                        characterAnimations.setCharacterState(enemyState4, characterAnimations.rule(Predicate.FacingLeft))
                    }
                    spriteutils.moveTo(pumpkinHitboxLB, spriteutils.point(pumpkinHitboxLB.x, 48), 500)
                    timer.after(500, function () {
                        attacking = false
                    })
                    timer.after(5000, function () {
                        for (let index = 0; index < 4; index++) {
                            sprites.destroy(sprites.allOfKind(SpriteKind.NOMKINS)._pickRandom())
                            pause(randint(100, 250))
                        }
                    })
                })
            })
        }
    }
    attack = attack
}
let attack = 0
let littleNomkins: Sprite = null
let attacking = false
let bodyDashLeft: Image[] = []
let bodyFallLeft: Image[] = []
let bodyJumpLeft: Image[] = []
let bodyWalkLeft: Image[] = []
let bodyLeft: Image[] = []
let headDashLeft: Image[] = []
let headLeft: Image[] = []
let startupMusicEnd = false
let startupCutscene = false
let dashHead: Sprite = null
let item: Sprite = null
let head: Sprite = null
let list: number[] = []
let boss: Sprite[] = []
let character: Sprite[] = []
let blastLeft: Image[] = []
let direction = 0
let dashingUP = false
let blastSprite: Sprite = null
let pumpkinRightBottom: Sprite = null
let pumpkinRightTop: Sprite = null
let pumpkinHitboxLB: Sprite = null
let pumpkinLeftTop: Sprite = null
let tempImage: Image = null
let tempList: Image[] = []
let body: Sprite = null
let ableToDash = false
let dashing = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 160
    export const ARCADE_SCREEN_HEIGHT = 128
}
let gameStart = true
start()
game.onUpdate(function () {
    if (gameStart) {
        tiling(character)
        tiling(boss)
        if (!(dashing)) {
            if (controller.right.isPressed()) {
                body.vx = 60
                direction = 1
            } else if (controller.left.isPressed()) {
                body.vx = -60
                direction = -1
            } else {
                body.vx += body.vx * -0.2
            }
            if (body.vy == 0) {
                ableToDash = true
                dashing = false
                if (body.vx > 5) {
                    characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingRight))
                    characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.Moving, Predicate.FacingRight))
                } else if (body.vx < -5) {
                    characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingLeft))
                    characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft))
                } else if (Math.abs(body.vx) < 5) {
                    if (direction == 1) {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingRight))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
                    } else {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingLeft))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft))
                    }
                }
            } else {
                if (body.vy < 0) {
                    if (direction == 1) {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingRight))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingUp, Predicate.FacingRight))
                    } else {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingLeft))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingUp, Predicate.FacingLeft))
                    }
                } else if (body.vy > 0) {
                    if (direction == 1) {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingRight))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight))
                    } else {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingLeft))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft))
                    }
                }
            }
            characterAnimations.setCharacterState(dashHead, characterAnimations.rule(Predicate.Moving))
            body.setBounceOnWall(false)
        } else {
            body.setBounceOnWall(true)
            if (!(dashingUP)) {
                if (direction == 1) {
                    characterAnimations.setCharacterState(dashHead, characterAnimations.rule(Predicate.MovingRight))
                    characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.MovingRight))
                    characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingRight))
                } else {
                    characterAnimations.setCharacterState(dashHead, characterAnimations.rule(Predicate.MovingLeft))
                    characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.MovingLeft))
                    characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingLeft))
                }
            } else {
                if (body.vy < 0) {
                    characterAnimations.setCharacterState(dashHead, characterAnimations.rule(Predicate.Moving))
                    characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.MovingUp))
                    characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingUp))
                } else {
                    if (direction == 1) {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingRight))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingDown, Predicate.FacingRight))
                    } else {
                        characterAnimations.setCharacterState(head, characterAnimations.rule(Predicate.FacingLeft))
                        characterAnimations.setCharacterState(body, characterAnimations.rule(Predicate.MovingDown, Predicate.FacingLeft))
                    }
                }
            }
        }
        if (body.isHittingTile(CollisionDirection.Right) || body.isHittingTile(CollisionDirection.Left)) {
            dashing = false
            body.ay = 400
        }
        if (startupCutscene) {
            attacking = false
            if (pumpkinHitboxLB.x > 75 && pumpkinHitboxLB.x < 77 && startupCutscene) {
                pumpkinHitboxLB.setPosition(76, 56)
            } else {
                spriteutils.moveTo(pumpkinHitboxLB, spriteutils.point(76, 56), 500)
            }
            if (startupMusicEnd) {
                startupCutscene = false
                bossPattern(1)
                play_music(1)
            }
        }
        if (!(attacking) && !(startupCutscene)) {
            if (pumpkinHitboxLB.x > 88) {
                for (let enemyState5 of sprites.allOfKind(SpriteKind.BOSS)) {
                    characterAnimations.setCharacterState(enemyState5, characterAnimations.rule(Predicate.FacingLeft))
                }
                pumpkinHitboxLB.ax = -50
            } else if (pumpkinHitboxLB.x < 72) {
                for (let enemyState6 of sprites.allOfKind(SpriteKind.BOSS)) {
                    characterAnimations.setCharacterState(enemyState6, characterAnimations.rule(Predicate.FacingRight))
                }
                pumpkinHitboxLB.ax = 50
            } else {
                for (let enemyState7 of sprites.allOfKind(SpriteKind.BOSS)) {
                    characterAnimations.setCharacterState(enemyState7, characterAnimations.rule(Predicate.FacingUp))
                }
                if (pumpkinHitboxLB.vx > 0) {
                    pumpkinHitboxLB.ax = 0
                    pumpkinHitboxLB.vx = 50
                } else {
                    pumpkinHitboxLB.ax = 0
                    pumpkinHitboxLB.vx = -50
                }
            }
        }
    }
})
