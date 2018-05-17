import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import File from '@/components/FileTree/File'

let content = {
  active: true,
  extention: 'txt',
  id: 13,
  isChanged: false,
  isNew: false,
  name: '1.txt',
  path: {
    directory: './f2/f2-sub/a-very-long-title-name-for-this-file-do-you-know-that',
    full: './f2/f2-sub/a-very-long-title-name-for-this-file-do-you-know-that/1.txt'
  },
  versions: []
}

const localVue = createLocalVue()
localVue.use(Vuex)

describe('File', () => {
  let modules
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          activeFile: () => {
            return {
              id: 13
            }
          },
          search: () => ''
        }
      }
    }

    store = new Vuex.Store({
      modules
    })
  })

  it('basic', () => {
    const wrapper = shallowMount(File, {
      propsData: {
        content,
        depth: 4
      },
      store,
      localVue
    })

    expect(wrapper.isVisible()).to.be.true
    expect(wrapper.find('.name').classes()).to.include('active')
    expect(wrapper.vm.nameArr).to.eql({ arr: [content.name], keyword: '' })
    expect(wrapper.find('.new').exists()).to.be.false
    expect(wrapper.find('.changed').exists()).to.be.false
  })

  it('is-new', () => {
    content.isNew = true

    const wrapper = shallowMount(File, {
      propsData: {
        content,
        depth: 4
      },
      store,
      localVue
    })

    expect(wrapper.find('.new').exists()).to.be.true
  })

  it('is-changed', () => {
    content.isNew = false
    content.isChanged = true

    const wrapper = shallowMount(File, {
      propsData: {
        content,
        depth: 4
      },
      store,
      localVue
    })

    expect(wrapper.find('.changed').exists()).to.be.true
  })
})
