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
      playing: false
    }
  },
  template: `
    <div @click="toggle">
      <img :src="'images/audio-' + (playing ? 'on' : 'off') + '.png'">
    </div>
  `,
  methods: {
    toggle: function () {
      this.playing = !this.playing
      document.getElementById('audio-' + this.$props.image)[this.playing ? 'play' : 'pause']()
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    images
  }
})
