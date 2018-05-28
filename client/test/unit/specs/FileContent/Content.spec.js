import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Content from '@/components/FileContent/Content'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Content', () => {
  let modules, getters
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          activeFile: () => {
            return {
              'name': '2.md',
              'id': 5,
              'path': {
                'directory': './f1',
                'full': './f1/2.md'
              },
              'versions': [
                {
                  'date': '2018-05-28T14:01:19.881Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 2\n- list 3\n- list 4\n- list 5\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 7,
                      'value': '# Test\n## header 1\n- list 1\n- list 2\n- list 3\n- list 4\n- list 5\n',
                      'startAt': 0,
                      'lines': 7
                    },
                    {
                      'count': 5,
                      'removed': true,
                      'value': '- list 6\n- list 7\n- list 8\n- list 9\n- list 10\n',
                      'startAt': 7,
                      'lines': 5
                    },
                    {
                      'count': 3,
                      'value': '\n## header 2\n> sad\n',
                      'startAt': 7,
                      'lines': 4
                    }
                  ]
                },
                {
                  'date': '2018-05-28T14:01:14.918Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 2\n- list 3\n- list 4\n- list 5\n- list 6\n- list 7\n- list 8\n- list 9\n- list 10\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 7,
                      'value': '# Test\n## header 1\n- list 1\n- list 2\n- list 3\n- list 4\n- list 5\n',
                      'startAt': 0,
                      'lines': 7
                    },
                    {
                      'count': 5,
                      'added': true,
                      'value': '- list 6\n- list 7\n- list 8\n- list 9\n- list 10\n',
                      'startAt': 7,
                      'lines': 5
                    },
                    {
                      'count': 3,
                      'value': '\n## header 2\n> sad\n',
                      'startAt': 12,
                      'lines': 4
                    }
                  ]
                },
                {
                  'date': '2018-05-28T14:00:54.017Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 2\n- list 3\n- list 4\n- list 5\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 3,
                      'value': '# Test\n## header 1\n- list 1\n',
                      'startAt': 0,
                      'lines': 3
                    },
                    {
                      'count': 1,
                      'added': true,
                      'value': '- list 2\n',
                      'startAt': 3,
                      'lines': 1
                    },
                    {
                      'count': 6,
                      'value': '- list 3\n- list 4\n- list 5\n\n## header 2\n> sad\n',
                      'startAt': 4,
                      'lines': 7
                    }
                  ]
                },
                {
                  'date': '2018-05-28T13:48:55.255Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 3\n- list 4\n- list 5\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 4,
                      'value': '# Test\n## header 1\n- list 1\n- list 3\n',
                      'startAt': 0,
                      'lines': 4
                    },
                    {
                      'count': 1,
                      'removed': true,
                      'value': '- list four\n',
                      'startAt': 4,
                      'lines': 1
                    },
                    {
                      'count': 5,
                      'value': '- list 4\n- list 5\n\n## header 2\n> sad\n',
                      'startAt': 4,
                      'lines': 6
                    }
                  ]
                },
                {
                  'date': '2018-05-28T13:48:46.653Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 3\n- list four\n- list 4\n- list 5\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 5,
                      'value': '# Test\n## header 1\n- list 1\n- list 3\n- list four\n',
                      'startAt': 0,
                      'lines': 5
                    },
                    {
                      'count': 2,
                      'added': true,
                      'value': '- list 4\n- list 5\n',
                      'startAt': 5,
                      'lines': 2
                    },
                    {
                      'count': 3,
                      'value': '\n## header 2\n> sad\n',
                      'startAt': 7,
                      'lines': 4
                    }
                  ]
                },
                {
                  'date': '2018-05-28T13:28:33.434Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 3\n- list four\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 4,
                      'value': '# Test\n## header 1\n- list 1\n- list 3\n',
                      'startAt': 0,
                      'lines': 4
                    },
                    {
                      'count': 1,
                      'removed': true,
                      'value': '- list 4\n',
                      'startAt': 4,
                      'lines': 1
                    },
                    {
                      'count': 1,
                      'added': true,
                      'value': '- list four\n',
                      'startAt': 4,
                      'lines': 1
                    },
                    {
                      'count': 3,
                      'value': '\n## header 2\n> sad\n',
                      'startAt': 5,
                      'lines': 4
                    }
                  ]
                },
                {
                  'date': '2018-05-28T13:27:09.138Z',
                  'content': '# Test\n## header 1\n- list 1\n- list 3\n- list 4\n\n## header 2\n> sad\n',
                  'diff': [
                    {
                      'count': 8,
                      'added': true,
                      'value': '# Test\n## header 1\n- list 1\n- list 3\n- list 4\n\n## header 2\n> sad\n',
                      'startAt': 0,
                      'lines': 9
                    }
                  ]
                }
              ],
              'extension': 'md',
              'isNew': false,
              'isChanged': true,
              'active': true
            }
          },
          activeIndex: () => 0,
          activeLine: () => null
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
    const wrapper = shallowMount(Content, { store, localVue })

    expect(wrapper.vm.extension).to.equal(modules.files.getters.activeFile().extension)
    expect(wrapper.vm.imgUrl).to.equal(`${getters.server().domain}/${modules.project.getters.active().slug}/files/${modules.files.getters.activeFile().path.full}`)

    wrapper.vm.changeActive(0)
    expect(wrapper.vm.index).to.equal(0)

    wrapper.vm.indexAdd(3)
    expect(wrapper.vm.index).to.equal(3)
  })
})
