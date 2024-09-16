export const enum TEAM {
  DEV = 'dev',
  TESTER = 'tester',
  UXUI = 'uxui',
  BASA = 'basa',
}

export const TEAM_LABEL = {
  [TEAM.DEV]: 'Developer',
  [TEAM.TESTER]: 'Tester',
  [TEAM.UXUI]: 'UX/UI',
  [TEAM.BASA]: 'BA/SA',
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
  {
    label: TEAM_LABEL[TEAM.UXUI],
    value: TEAM.UXUI,
  },
  {
    label: TEAM_LABEL[TEAM.BASA],
    value: TEAM.BASA,
  },
]
