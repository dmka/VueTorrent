import comparatorMap from './Comparators'
import type { PropertyData, PropertyMetadata, TorrentProperty } from './DashboardDefaults'
import { propsData, propsMetadata, defaultWebuiSettings } from './DashboardDefaults'
import { DashboardDisplayMode } from './DashboardDisplayMode'
import { DashboardProperty } from './DashboardProperty'
import { DashboardPropertyType } from './DashboardPropertyType'
import { FeedState } from './FeedState'
import { getFileIcon, typesMap } from './FileIcon'
import { FilterType } from './FilterType'
import { HistoryKey } from './HistoryKey'
import { PaginationPosition } from './PaginationPosition'
import { ThemeMode } from './ThemeMode'
import { TitleOptions } from './TitleOptions'
import { TorrentState, emojiStateMap, stateQbitToVt, stateVtToQbit } from './TorrentState'
import { TrackerSpecialFilter } from './TrackerSpecialFilter'

const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss'
const defaultDurationFormat = 'Y[Y] M[M] D[d] H[h] m[m] s[s]'

export {
  comparatorMap,
  TorrentProperty,
  PropertyData,
  PropertyMetadata,
  propsData,
  propsMetadata,
  DashboardDisplayMode,
  DashboardProperty,
  DashboardPropertyType,
  FeedState,
  getFileIcon,
  typesMap,
  FilterType,
  HistoryKey,
  PaginationPosition,
  ThemeMode,
  TitleOptions,
  TorrentState,
  emojiStateMap,
  stateQbitToVt,
  stateVtToQbit,
  TrackerSpecialFilter,
  defaultDateFormat,
  defaultDurationFormat,
  defaultWebuiSettings
}
