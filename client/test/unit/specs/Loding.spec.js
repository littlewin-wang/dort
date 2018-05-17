import { mount } from '@vue/test-utils'
import Loading from '@/components/Loading'

describe('Loading', () => {
  it('default', () => {
    const wrapper = mount(Loading)
    expect(wrapper.find('h1').text()).to.equal('Loading')
  })

  it('text', () => {
    const wrapper = mount(Loading, {
      propsData: {
        text: 'text string'
      }
    })

    expect(wrapper.find('h1').text()).to.equal('text string')
  })
})
