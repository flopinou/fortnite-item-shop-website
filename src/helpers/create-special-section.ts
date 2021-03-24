import fixSpecialFeaturedName from './fix-specal-featured-name'
import sortEntries from './sort-entries'

import type ShopEntryType from '../types/shop-entry'

export const createSpecialSection = (
  entries: Array<ShopEntryType<string>>
): Array<{
  sectionName: string
  sectionEntries: Array<Array<Array<ShopEntryType<string>>>>
}> => {
  const tabs = [
    ...entries
      .reduce((shop, entry) => {
        const tab = entry.sectionId
        const tabArray = shop.get(tab) ?? []

        tabArray.push(entry)

        if (!shop.has(tab)) {
          shop.set(tab, tabArray)
        }

        return shop
      }, new Map<string, Array<ShopEntryType<string>>>())
      .entries(),
  ].map(([name, entry]) => ({
    sectionName: fixSpecialFeaturedName(name),
    sectionEntries: [[sortEntries(entry)]],
  }))

  return tabs
}

export default createSpecialSection
