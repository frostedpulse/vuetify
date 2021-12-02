// Components
import { VListGroup } from './VListGroup'
import { VListItem } from './VListItem'
import { VListSubheader } from './VListSubheader'
import { VDivider } from '../VDivider'

// Utilities
import { genericComponent } from '@/util'

// Types
import type { Prop } from 'vue'
import type { MakeSlots } from '@/util'
import type { ListGroupHeaderSlot } from './VListGroup'
import type { InternalListItem } from './VList'

export const VListChildren = genericComponent<new <T extends InternalListItem>() => {
  $props: {
    items?: T[]
  }
  $slots: MakeSlots<{
    header: [ListGroupHeaderSlot]
    item: [T]
  }>
}>()({
  name: 'VListChildren',

  props: {
    items: Array as Prop<InternalListItem[]>,
  },

  setup (props, { slots }) {
    return () => slots.default?.() ?? props.items?.map(({ children, props: itemProps, type }) => {
      // const { value, ...rest } = item
      if (type === 'divider') return <VDivider {...itemProps} />

      if (type === 'subheader') return <VListSubheader {...itemProps} v-slots={ slots } />

      return children ? (
        <VListGroup
          value={itemProps?.value}
          items={children}
          v-slots={{
            ...slots,
            header: headerProps => slots.header
              ? slots.header({ ...itemProps, ...headerProps })
              : <VListItem {...itemProps} {...headerProps} />,
          }}
        />
      ) : (
        slots.item ? slots.item(itemProps) : <VListItem {...itemProps} v-slots={ slots } />
      )
    })
  },
})
