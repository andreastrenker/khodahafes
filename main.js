/* global Vue */
const images = [
  [{ size: 2, noaudio: true }, { size: 1, noaudio: true }, { size: 3 }],
  [{ size: 1 }, { size: 2 }, { size: 1, noaudio: true }],
  [{ size: 3 }, { size: 3 }],
  [{ size: 1 }, { size: 2 }, { size: 1 }],
  [{ size: 2 }, { size: 3, noaudio: true }, { size: 1 }],
  [{ size: 3 }, { size: 1 }],
  [{ size: 2 }, { size: 3 }],
  [{ size: 1 }],
  [{ size: 2, noaudio: true }, { size: 3 }]
]

let index = 0

for (column of images) {
  for (image of column) {
    index ++
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
    <div @click="toggle">
      <div class="progress-bar" :style="'width: ' + percent + '%'"></div>
      <img :src="'images/audio-' + (playing ? 'on' : 'off') + '.png'">
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
    this.audio = document.getElementById('audio-' + this.$props.image)
    this.audio.addEventListener('playing', (_event) => {
      const duration = _event.target.duration
      this.advance(duration, this.audio)
    })
    this.audio.addEventListener('pause', (_event) => {
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
