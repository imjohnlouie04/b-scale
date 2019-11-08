<template>
  <div class="scalable__window" :style="[dynamicStyle]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 950
    }
  },
  data () {
    return {
      initHeight: 0,
      dynamicStyle: ""
    }
  },

  methods: {
    scalePages () {

      let _s = this,
          scale = null,
          scaleX = null, 
          scaleY = null,
          pageWidth = null,
          pageHeight = null

      if (window.innerHeight < 950) {
        _s.initHeight = 950
      } else {
        _s.initHeight = window.innerHeight
      }

      pageWidth = _s.$parent.$el.offsetWidth
      pageHeight = _s.$parent.$el.offsetHeight

      let computeScaleX = pageWidth / _s.$props.width
      let computeScaleY = pageHeight / _s.$props.height

      scaleX = computeScaleX
      scaleY = computeScaleY
      scale = (scaleX > scaleY) ? scaleY : scaleX;

      let getLeftPosition = Math.abs(Math.floor((( _s.$props.width * scale) - pageWidth)/2))
      let getTopPosition = Math.abs(Math.floor(((_s.$props.height * scale) - pageHeight)/2))
      let scaleRound = Math.floor(scale * 1000) / 1000
      
      this.dynamicStyle = {
        'transform': 'translateZ(0) scale(' + (window.innerWidth < _s.$props.width || window.innerWidth > _s.$props.width ? scaleRound :  scaleRound.toFixed(1)) + ')',
        'left': getLeftPosition + 'px',
        'top': getTopPosition + 'px',
        'width': _s.$props.width + 'px',
        'height': _s.$props.height + 'px'
      }
    }
  },
  mounted () {
    let _s = this
    // Initialized the function
    _s.scalePages()
    // listen first to check if the browser was already resize
    window.addEventListener('resize', () => {
      _s.scalePages()
    })
  },
}
</script>

<style lang="scss" scoped>
.scalable__window {
  position: absolute;
  overflow: hidden;
  backface-visibility: hidden;
}
</style>