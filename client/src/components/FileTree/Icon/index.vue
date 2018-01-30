<template>
  <img :src="icon.path" :alt="icon.type">
</template>

<script>
export default {
  name: 'Icon',
  props: {
    extension: {
      type: String,
      default: ''
    }
  },
  computed: {
    icon () {
      const iconTypes = {
        js: ['js'],
        html: ['html', 'htm'],
        sass: ['sass', 'scss'],
        less: ['less'],
        stylus: ['stylus', 'styl'],
        css: ['css'],
        php: ['php'],
        json: ['json'],
        jade: ['jade'],
        pug: ['pug'],
        md: ['md'],
        sql: ['sql'],
        apache: ['htaccess', 'htpasswd'],
        yml: ['yml'],
        svg: ['svg'],
        font: ['eot', 'ttf', 'woff', 'woff2'],
        image: ['jpeg', 'jpg', 'tiff', 'gif', 'bmp', 'png', 'webp'],
        video: [
          'mpeg',
          'mpg',
          'mp4',
          'amv',
          'wmv',
          'mov',
          'avi',
          'ogv',
          'mkv',
          'webm'
        ],
        audio: ['mp3', 'wav', 'ogg', 'raw'],
        zip: ['zip', 'rar', '7z', 'gz'],
        txt: ['txt'],
        coffee: ['coffee'],
        git: ['gitignore', 'gitkeep'],
        xml: ['xml'],
        twig: ['twig'],
        c: ['c', 'h'],
        folder: ['folder'],
        'folder-active': ['folder-active']
      }

      let ret = {
        type: this.extension,
        path: ''
      }

      for (const key in iconTypes) {
        if (iconTypes[key].indexOf(this.extension) !== -1) {
          ret.path = require(`./icons/${key}.svg`)
          break
        }
      }

      ret.path = ret.path || require('./icons/random.svg')

      return ret
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>

