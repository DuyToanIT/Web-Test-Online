angular.module('mathtest.services', [])
.factory('AuthService', function($http) {
  var user = null;
  var TOKEN_KEY = 'jwtToken';
  var EXPIRES_IN = "expires_in";
  var PROTOCOL = "http"
  var ADDRRESS = "localhost:9999/mathtestscore"
  
  var getJwtToken = function() {
    return localStorage.getItem(TOKEN_KEY);
  };

  var getExpiresIn = function(){
    return localStorage.getItem(EXPIRES_IN);
  };

  var getProtocol = function() {
    return PROTOCOL;
  };

  var getAddress = function() {
    return ADDRRESS;
  };

  var setJwtToken = function(token) {
      localStorage.setItem(TOKEN_KEY, token);
  };

  var setExpiresIn = function(expires_in) {
      localStorage.setItem(EXPIRES_IN, expires_in);
  };

  var removeAuth = function() {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRES_IN);
  };

  var createAuthorizationTokenHeader = function() {
      var token = getJwtToken();
      if (token) {
          return {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json;charset=UTF-8'
          };
      } else {
          return {
            'Content-Type': 'application/json'
          };
      }
  }
  return {
	    getJwtToken: getJwtToken,
	    getExpiresIn: getExpiresIn,
	    getProtocol: getProtocol,
	    getAddress: getAddress,
	    setJwtToken: setJwtToken,
	    setExpiresIn: setExpiresIn,
	    removeAuth: removeAuth,
	    createAuthorizationTokenHeader: createAuthorizationTokenHeader
	  };
});