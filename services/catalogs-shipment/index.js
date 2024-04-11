import { pipe, map, when, sortBy, prop } from 'ramda'
import { i18n } from '../i18n'

export const loadCategories = [
  { _id: '0001', name: 'general'},
  { _id: '0002', name: 'bulk'},
  { _id: '0003', name: 'perishable'},
  { _id: '0004', name: 'fragile'},
  { _id: '0005', name: 'cold'},
  { _id: '0006', name: 'hazardous'},
]

export const tripTypes = [
  { _id: '0001', name: 'oneWay'},
  { _id: '0002', name: 'roundTrip'},
]

export const modeTypes = [
  { _id: '0001', name: 'land'},
  { _id: '0002', name: 'sea'},
  { _id: '0003', name: 'air'},
  { _id: '0004', name: 'train'},
  { _id: '0005', name: 'multi'},
]

export const servicesTypes = [
  { _id: '0001', name: 'export'},
  { _id: '0002', name: 'import'},
  { _id: '0003', name: 'national'},
  { _id: '0004', name: 'regional'},
  { _id: '0005', name: 'local'},
]

export const recurrenceTypes = [
  { _id: '0001', name: 'spot'},
  { _id: '0002', name: 'project'},
]

export const urgencyTypes = [
  { _id: '0001', name: 'normal'},
  { _id: '0002', name: 'expedited'},
]

export const optionTypes = [
  { _id: '0001', name: 'ltl'},
  { _id: '0002', name: 'ftl'},
]