import { writable } from 'svelte/store'

// 'single' = one scrollable page | 'multi' = separate routed pages
export const layout = writable('single')

// current page for multi-layout routing
export const currentPage = writable('home')

// active section for single-page nav highlighting
export const activeSection = writable('hero')
