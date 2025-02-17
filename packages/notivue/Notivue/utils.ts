import type { StoreItem, NotivueItem, HiddenInternalItemData } from 'notivue'

export const hiddenInternalKeys: (keyof HiddenInternalItemData)[] = [
   'timeout',
   'elapsed',
   'resumedAt',
   'animationAttrs',
   'positionStyles',
]

export function getSlotContext(item: StoreItem): NotivueItem {
   return Object.fromEntries(
      Object.entries(item).filter(
         ([key]) => !hiddenInternalKeys.includes(key as keyof HiddenInternalItemData)
      )
   ) as NotivueItem
}

export function getAriaLabel(item: NotivueItem) {
   return `${item.title ? `${item.title}: ` : ''}${item.message}`
}
