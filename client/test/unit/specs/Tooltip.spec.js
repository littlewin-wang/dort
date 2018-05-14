import Vue from 'vue'
import Tooltip from '@/components/Tooltip'

const createTooltip = (slot, propsData) => {
  const Constructor = Vue.extend({
    components: {
      Tooltip
    },
    template: `
      <Tooltip position=${propsData.position}>${slot}</Tooltip>
    `
  })
  return new Constructor().$mount()
}

describe('Tooltip', () => {
  it('tooltip', () => {
    let vm = createTooltip('test tooltip', { position: 'left' })

    // eslint-disable-next-line
    expect(vm.$el.classList.contains('left')).to.true
    expect(vm.$el.querySelector('.container').textContent).to.equal(' test tooltip')
  })
})
