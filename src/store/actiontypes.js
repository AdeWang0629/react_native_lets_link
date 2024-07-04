const manageActionType = type => {
  return {
    start: type + '_Start',
    success: type + '_Success',
    failed: type + '_Failed',
  };
};

export const types = {
  // +++++++++ AUTH ACTION TYPES +++++++++++++ //
  REGISTER: manageActionType('REGISTER'),
  LOGIN: manageActionType('LOGIN'),
  USERDATA: manageActionType('USERDATA'),
  UPDATE_PROFILE: manageActionType('UPDATE_PROFILE'),
  USER_ADDRESS: manageActionType('USER_ADDRESS'),
  USER_VIDEO: manageActionType('USER_VIDEO'),
  

};
