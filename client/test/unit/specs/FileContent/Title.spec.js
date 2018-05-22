import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Title from '@/components/FileContent/Title'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Title-1', () => {
  let modules, getters
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          activeFile: () => {
            return {
              versions: [
                {
                  content: 'content',
                  date: '2018-05-17T07:37:21.112Z'
                }
              ],
              path: {
                full: './f1/2.md'
              }
            }
          },
          activeIndex: () => 0
        }
      },
      project: {
        namespaced: true,
        getters: {
          active: () => {
            return {
              date: '2018-05-17T07:37:20.997Z',
              fileCount: 14,
              lastUpdateDate: '2018-05-17T07:37:21.153Z',
              name: 'demo-folder',
              slug: 'demo-folder'
            }
          }
        }
      }
    }

    getters = {
      server: () => {
        return {
          domain: 'http://192.168.1.23:4574'
        }
      }
    }

    store = new Vuex.Store({
      modules,
      getters
    })
  })

  it('basic', () => {
    const wrapper = shallowMount(Title, { store, localVue })

    wrapper.vm.toggleHistory()
    wrapper.vm.toggleDiff()

    expect(wrapper.vm.contentUri).to.equal(`data:text/plain;charset=utf-8,${encodeURIComponent(modules.files.getters.activeFile().versions[modules.files.getters.activeIndex()].content)}`)
    expect(wrapper.emitted()['toggle-history'].length).to.equal(1)
    expect(wrapper.emitted()['toggle-diff'].length).to.equal(1)
  })
})

describe('Title-2', () => {
  let modules, getters
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          activeFile: () => {
            return {
              versions: [],
              path: {
                full: './f1/2.md'
              }
            }
          },
          activeIndex: () => 0
        }
      },
      project: {
        namespaced: true,
        getters: {
          active: () => {
            return {
              date: '2018-05-17T07:37:20.997Z',
              fileCount: 14,
              lastUpdateDate: '2018-05-17T07:37:21.153Z',
              name: 'demo-folder',
              slug: 'demo-folder'
            }
          }
        }
      }
    }

    getters = {
      server: () => {
        return {
          domain: 'http://192.168.1.23:4574'
        }
      }
    }

    store = new Vuex.Store({
      modules,
      getters
    })
  })

  it('basic', () => {
    const wrapper = shallowMount(Title, { store, localVue })

    expect(wrapper.vm.contentUri).to.equal(`${getters.server().domain}/${modules.project.getters.active().slug}/files/${modules.files.getters.activeFile().path.full}`)
  })
})
