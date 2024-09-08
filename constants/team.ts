export const enum TEAM {
  DEV = 'dev',
  TESTER = 'tester',
}

export const TEAM_LABEL = {
  [TEAM.DEV]: 'Developer',
  [TEAM.TESTER]: 'Tester',
}

export const TEAM_OPTIONS = [
  {
    label: TEAM_LABEL[TEAM.DEV],
    value: TEAM.DEV,
  },
  {
    label: TEAM_LABEL[TEAM.TESTER],
    value: TEAM.TESTER,
  },
]
