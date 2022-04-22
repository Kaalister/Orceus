const AppProfile = {
    profile : {
        connected: false,
        sessionType: ""
    },
    get: function(key) {
        return key in this.profile ? this.profile[key] : null;
    }
}

export default AppProfile;