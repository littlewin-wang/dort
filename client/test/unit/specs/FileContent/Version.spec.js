import { shallowMount } from '@vue/test-utils'

import Version from '@/components/FileContent/Content/Version'
import moment from 'moment'

let version = {
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
}

describe('Version', () => {
  it('basic', () => {
    const wrapper = shallowMount(Version, {
      propsData: {
        version
      }
    })

    expect(wrapper.vm.date).to.equal(moment(version.date).format('hh:mm'))
    expect(wrapper.vm.fromNow).to.equal(moment(version.date).fromNow())
    expect(wrapper.vm.lines).to.eql({ 'added': 1, 'removed': 1, 'unchange': 7 })
  })

  it('add', () => {
    version = {
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

    const wrapper = shallowMount(Version, {
      propsData: {
        version
      }
    })

    expect(wrapper.vm.addNodes).to.eql([{
      class: 'added-block'
    }, {
      class: 'added-block'
    }, {
      class: 'added-block'
    }, {
      class: 'added-block'
    }, {
      class: 'added-block'
    }])
  })

  it('rm', () => {
    version = {
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
          'count': 6,
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
    }

    const wrapper = shallowMount(Version, {
      propsData: {
        version
      }
    })

    expect(wrapper.vm.addNodes).to.eql([{
      class: 'removed-block'
    }, {
      class: 'removed-block'
    }, {
      class: 'removed-block'
    }, {
      class: 'removed-block'
    }, {
      class: 'removed-block'
    }])
  })

  it('add_and_normal', () => {
    version = {
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
    }

    const wrapper = shallowMount(Version, {
      propsData: {
        version
      }
    })

    expect(wrapper.vm.addNodes).to.eql([{
      class: 'added-block'
    }, {
      class: 'added-block'
    }, {
      class: 'normal-block'
    }, {
      class: 'normal-block'
    }, {
      class: 'normal-block'
    }])
  })

  it('rm_and_normal', () => {
    version = {
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
    }

    const wrapper = shallowMount(Version, {
      propsData: {
        version
      }
    })

    expect(wrapper.vm.addNodes).to.eql([{
      class: 'removed-block'
    }, {
      class: 'normal-block'
    }, {
      class: 'normal-block'
    }, {
      class: 'normal-block'
    }, {
      class: 'normal-block'
    }])
  })
})
