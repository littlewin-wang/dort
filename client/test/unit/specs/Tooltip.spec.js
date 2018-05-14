import { createCompInstance } from '../utils'
import Tooltip from '@/components/Tooltip'

describe('Tooltip', () => {
  it('Title', () => {
    let vm = createCompInstance(Tooltip)

    expect(vm.$el.querySelectorAll('.arrow').length).to.equal(1)
  })
})
