import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Folder from '@/components/FileTree/Folder'

const localVue = createLocalVue()
localVue.use(Vuex)

let content = {
  'folders': [
    {
      'folders': [],
      'files': [
        {
          'name': '1.txt',
          'id': 13,
          'path': {
            'directory': './f2/f2-sub/a-very-long-title-name-for-this-file-do-you-know-that',
            'full': './f2/f2-sub/a-very-long-title-name-for-this-file-do-you-know-that/1.txt'
          },
          'versions': [],
          'extension': 'txt',
          'isNew': false,
          'isChanged': false,
          'active': false
        },
        {
          'name': 'a-very-long-title-name-for-this-file-do-you-know-that.txt',
          'id': 14,
          'path': {
            'directory': './f2/f2-sub/a-very-long-title-name-for-this-file-do-you-know-that',
            'full': './f2/f2-sub/a-very-long-title-name-for-this-file-do-you-know-that/a-very-long-title-name-for-this-file-do-you-know-that.txt'
          },
          'versions': [
            {
              'date': '2018-05-20T07:03:45.290Z',
              'content': 'I use this file to test\nhow to set the style of a-very-long-title-name of a file in file tree\n',
              'diff': [
                {
                  'count': 2,
                  'added': true,
                  'value': 'I use this file to test\nhow to set the style of a-very-long-title-name of a file in file tree\n'
                }
              ]
            }
          ],
          'extension': 'txt',
          'isNew': false,
          'isChanged': false,
          'active': false
        }
      ],
      'name': 'a-very-long-title-name-for-this-file-do-you-know-that'
    }
  ],
  'files': [
    {
      'name': 'video-2.jpg',
      'id': 11,
      'path': {
        'directory': './f2/f2-sub',
        'full': './f2/f2-sub/video-2.jpg'
      },
      'versions': [],
      'extension': 'jpg',
      'isNew': false,
      'isChanged': false,
      'active': false
    },
    {
      'name': 'laptop.png',
      'id': 12,
      'path': {
        'directory': './f2/f2-sub',
        'full': './f2/f2-sub/laptop.png'
      },
      'versions': [],
      'extension': 'png',
      'isNew': false,
      'isChanged': false,
      'active': false
    }
  ],
  'name': 'f2-sub'
}

let directory = './f2/'

describe('Folder-1', () => {
  let modules
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          search: () => ''
        }
      }
    }

    store = new Vuex.Store({
      modules
    })
  })

  it('basic', () => {
    const wrapper = shallowMount(Folder, {
      propsData: {
        content,
        directory,
        depth: 2
      },
      store,
      localVue
    })

    expect(wrapper.vm.fullPath).to.eql(directory.concat(content.name))
    expect(wrapper.vm.isShow).to.be.true
  })
})

describe('Folder-2', () => {
  let modules
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          search: () => 'f1-sub'
        }
      }
    }

    store = new Vuex.Store({
      modules
    })
  })

  it('basic', () => {
    const wrapper = shallowMount(Folder, {
      propsData: {
        content,
        directory,
        depth: 2
      },
      store,
      localVue
    })

    expect(wrapper.vm.isShow).to.be.false
  })
})

describe('Folder-3', () => {
  let modules
  let store

  beforeEach(() => {
    modules = {
      files: {
        namespaced: true,
        getters: {
          search: () => 'f2-sub'
        }
      }
    }

    store = new Vuex.Store({
      modules
    })
  })

  it('basic', () => {
    const wrapper = shallowMount(Folder, {
      propsData: {
        content,
        directory,
        depth: 2
      },
      store,
      localVue
    })

    expect(wrapper.vm.nameArr).to.eql({ arr: ['', ''], keyword: modules.files.getters.search() })
  })
})
