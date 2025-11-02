export class UserInfo {
  constructor({userName, userJob, avatarSelector}){
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._avatarElement = document.querySelector(avatarSelector);

  }

  getUserInfo(){
    return {
      // userName: this._userName.textContent,
      // userJob: this._userJob.textContent,
      name: this._userName ? this._userName.textContent : "",
      about: this._userJob ? this._userJob.textContent : "",
      avatar: this._avatarElement ? this._avatarElement.src : ""
    };

  }

  setUserInfo({ name, about, avatar}){
    // this._userName.textContent = userName;
    // this._userJob.textContent = userJob;
    if (name !== undefined && this._userName) {
      this._userName.textContent = name;
    }
    if (about !== undefined && this._userJob) {
      this._userJob.textContent = about;
    }
    if (avatar !== undefined && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}