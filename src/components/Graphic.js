import {Line, mixins} from 'vue-chartjs'

export default {
  extends: Line,
  mixin: [mixins.reactiveProp],
  props: ['data', 'options'],
  mounted () {
    this.data.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.data.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.data.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.data.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.data.gradient.addColorStop(1, '#ff0000');

    this.data.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.data.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.data.gradient2.addColorStop(1, '#00e7ff');

    this.data.datasets[0].backgroundColor = this.data.gradient
    this.data.datasets[1].backgroundColor = this.data.gradient2
    this.renderChart(this.data, this.options)
  }
}
