export type ThisParams = {
  flag: string | undefined;
};

export type BuildingRoutesErrors = {
  INVALID_DATA: string;
  ERROR_CREATING_BUILDING: string;
  ERROR_UPDATING_BUILDING: string;
  NOT_FOUND: string;
};

export default (params: ThisParams): BuildingRoutesErrors => {
  const { flag } = params;
  return {
    INVALID_DATA: `cannot-perform-operation-due-invalid-parameters -> ${flag}`,
    ERROR_CREATING_BUILDING: `cannot-perform-operation-due-error-while-creating-building -> ${flag}`,
    ERROR_UPDATING_BUILDING: `cannot-perform-operation-due-error-while-updating-building -> ${flag}`,
    NOT_FOUND: `buildings-not-found -> ${flag}`,
  };
};
