export const enum TRACKER_TYPE {
  PROJECT = 'project',
  MEETING = 'meeting',
  LEAVE = 'leave',
  MANAGE = 'management',
  STANDBY = 'standby',
  OT = 'ot',
}

export const TRACKER_TYPE_LABEL = {
  [TRACKER_TYPE.PROJECT]: 'On Project',
  [TRACKER_TYPE.MEETING]: 'On Meeting',
  [TRACKER_TYPE.LEAVE]: 'Leave',
  [TRACKER_TYPE.MANAGE]: 'Team Management',
  [TRACKER_TYPE.STANDBY]: 'Standby',
  [TRACKER_TYPE.OT]: 'OT',
}

export const TRACKER_TYPE_OPTIONS = [
  {
    label: TRACKER_TYPE_LABEL[TRACKER_TYPE.PROJECT],
    value: TRACKER_TYPE.PROJECT,
  },
  {
    label: TRACKER_TYPE_LABEL[TRACKER_TYPE.MEETING],
    value: TRACKER_TYPE.MEETING,
  },
  {
    label: TRACKER_TYPE_LABEL[TRACKER_TYPE.LEAVE],
    value: TRACKER_TYPE.LEAVE,
  },
  {
    label: TRACKER_TYPE_LABEL[TRACKER_TYPE.MANAGE],
    value: TRACKER_TYPE.MANAGE,
  },
  {
    label: TRACKER_TYPE_LABEL[TRACKER_TYPE.STANDBY],
    value: TRACKER_TYPE.STANDBY,
  },
  {
    label: TRACKER_TYPE_LABEL[TRACKER_TYPE.OT],
    value: TRACKER_TYPE.OT,
  },
]
