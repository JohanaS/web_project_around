export class UserInfo {
  constructor({userName, userJob}){
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }

  getUserInfo(){
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };

  }

  setUserInfo({ userName, userJob}){
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;

  }
}