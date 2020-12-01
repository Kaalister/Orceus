const AppProfile = {
    profile : {
        connected: false,
        isAdmin: false
    },
    get: function(key) {
        return key in this.profile ? this.profile[key] : null;
    }
}

export default AppProfile;