import { create } from 'zustand'

export const useStatisticStore = create(set => ({
  counters: {
    good: 0,
    neutral: 0,
    bad: 0,
  },
  actions: {
    add_good: () => set(state => ({ counters: { ...state.counters, good: state.counters.good + 1 }})),
    add_neutral: () => set(state => ({ counters: { ...state.counters, neutral: state.counters.neutral + 1 }})),
    add_bad: () => set(state => ({ counters: { ...state.counters, bad: state.counters.bad + 1 }}))
  }
}))

export const useStatistic = () => useStatisticStore(state => state.counters)
export const useStatisticControls = () => useStatisticStore(state => state.actions)