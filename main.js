/* global Vue */
const images = [
  [{ size: 2 }, { size: 1, left: 10 }, { size: 3, noaudio: true, top: 2 }],
  [{ size: 1, top: 12, left: -10 }, { size: 2, top: 12, left: 1 }, { size: 1, noaudio: true, top: 22, left: 1 }],
  [{ size: 3, top: -1.5, left: -12 }, { size: 3, top: 10, left: 2 }],
  [{ size: 1, left: 5 }, { size: 2, left: -12 }, { size: 1, top: 8, left: 8.5 }],
  [{ size: 2, top: 4.5, left: -4 }, { size: 3, noaudio: true, top: 6, left: 5 }, { size: 1, top: 10, left: 13 }],
  [{ size: 3, top: -2, left: -8 }, { size: 1, top: 25, left: -2 }],
  [{ size: 2, top: 26, left: -13 }, { size: 3, top: 25 }],
  [{ size: 1, top: 18, left: -16 }],
  [{ size: 2, noaudio: true, top: 4, left: -14 }, { size: 3, top: 9, left: -9 }]
]

let index = 0

for (const column of images) {
  for (const image of column) {
    index++
    image.index = index
  }
}

Vue.component('audio-player', {
  props: ['image'],
  data: () => {
    return {
      playing: false,
      timer: null,
      audio: null,
      progress: 0,
      percent: 0
    }
  },
  template: `
    <div :class="playing ? 'playing' : ''">
      <div :class="'image image-' + image.size" :style="'top: ' + image.top + 'vh; left: ' + image.left + 'vh'">
        <img :src="'images/' + image.index + '_web.jpg'">
        <div class="audio-toggle" @click="toggle">
          <div class="progress-bar" :style="'width: ' + percent + '%'"></div>
          <img :src="'images/audio-' + (playing ? 'on' : 'off') + '.png'">
        </div>
        <audio v-if="!image.noaudio" :src="'audio/' + image.index + '_audio.mp3'" :id="'audio-' + image.index"></audio>
      </div>
    </div>
  `,
  methods: {
    toggle: function () {
      this.playing = !this.playing

      if (!this.audio) {
        return
      }

      this.audio[this.playing ? 'play' : 'pause']()
    },

    advance: function (duration, element) {
      const increment = 10 / duration
      this.percent = Math.min(increment * element.currentTime * 10, 100)
      this.startTimer(duration, element)
    },
    startTimer: function (duration, element) {
      if (this.percent < 99) {
        this.timer = setTimeout(() => {
          this.advance(duration, element)
        }, 100)
      } else {
        this.progress = 0
        this.percent = 0
        this.playing = false
      }
    }
  },
  mounted: function () {
    if (this.$props.image.noaudio) {
      return
    }
    this.audio = document.getElementById('audio-' + this.$props.image.index)
    this.audio.addEventListener('playing', event => {
      const duration = event.target.duration
      this.advance(duration, this.audio)
    })
    this.audio.addEventListener('pause', event => {
      clearTimeout(this.timer)
    })
  }
})

const app = new Vue({
  el: '#app',
  data: {
    images
  }
})
