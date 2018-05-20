import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import FileContent from '@/components/FileContent'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('FileContent', () => {
  it('basic', () => {
    const wrapper = shallowMount(FileContent)

    expect(wrapper.vm.openHistory).to.be.true
    expect(wrapper.vm.openDiff).to.be.true

    wrapper.vm.handleHistory()
    wrapper.vm.handleDiff()

    expect(wrapper.vm.openHistory).to.be.false
    expect(wrapper.vm.openDiff).to.be.false
  })
})
