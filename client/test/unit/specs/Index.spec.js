import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Index from '@/components/Index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Index.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      server: () => {
        return {
          domain: '192.168.1.1:4574'
        }
      }
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('server', () => {
    const wrapper = shallowMount(Index, { store, localVue })
    const a = wrapper.find('a')

    expect(a.text()).to.equal(getters.server().domain)
  })
})
