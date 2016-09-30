'use strict';

var handler = require('./lib/request-handler.js'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    sessions = require("client-sessions"),
    cors = require('cors'),
    compression = require('compression');


app.get('*', function (a, b, c) {
  if (a.headers['x-forwarded-proto'] !== 'https') {
    b.redirect('https://' + a.hostname + a.url);
  } else {
    c();
  }
});

app.use(cors());
app.use(sessions({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  resave: !0,
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
  saveInitialized: !0
}));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: !0 }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public', { maxAge: 3600 * 24 * 1000 }));
app.use('/scripts', express.static(__dirname + '/node_modules', { maxAge: 3600 * 24 * 1000 }));
app.use('/compiled', express.static(__dirname + '/compiled', { maxAge: 3600 * 24 * 1000 }));

app.post('/signup', handler.signupUser);
app.post('/login', handler.signinUser);

//////////////////
//Handling friends
//////////////////

//friend requests
app.post('/listRequests', handler.listRequests);
app.post('/sendRequest', handler.sendRequest);
//Friend requests
app.post('/getThisFriendsMovies', handler.getThisFriendsMovies);
app.post('/logout', handler.logout);

app.post('/sendWatchRequest', handler.sendWatchRequest);
app.delete('/sendWatchRequest', handler.removeWatchRequest);

app.post('/decline', handler.decline);
app.post('/accept', handler.accept);
app.delete('/removeRequest', handler.removeRequest);

app.post('/findMovieBuddies', handler.findMovieBuddies);
app.post('/getFriends', handler.getFriends);
app.get('/getFriendList', handler.getFriendList);

//////////////////
//Handling movies
//////////////////
app.post('/ratemovie', handler.rateMovie);
app.get('/recentRelease', handler.getRecentRelease);
app.get('/getUserRatings', handler.getUserRatings);
app.get('/getFriendUserRatings', handler.getFriendUserRatings);
app.post('/getMultipleMovieRatings', handler.getMultipleMovieRatings);
app.post('/getFriendRatings', handler.handleGetFriendRatings);
app.get('/searchRatedMovie', handler.searchRatedMovie);

app.get('/*', function (a, b) {
  b.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NlcnZlci5qcyJdLCJuYW1lcyI6WyJoYW5kbGVyIiwicmVxdWlyZSIsImV4cHJlc3MiLCJhcHAiLCJib2R5UGFyc2VyIiwic2Vzc2lvbnMiLCJjb3JzIiwiY29tcHJlc3Npb24iLCJnZXQiLCJyZXEiLCJyZXMiLCJuZXh0IiwiaGVhZGVycyIsInJlZGlyZWN0IiwiaG9zdG5hbWUiLCJ1cmwiLCJ1c2UiLCJjb29raWVOYW1lIiwic2VjcmV0IiwicmVzYXZlIiwiZHVyYXRpb24iLCJhY3RpdmVEdXJhdGlvbiIsInNhdmVJbml0aWFsaXplZCIsInVybGVuY29kZWQiLCJleHRlbmRlZCIsImpzb24iLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJtYXhBZ2UiLCJwb3N0Iiwic2lnbnVwVXNlciIsInNpZ25pblVzZXIiLCJsaXN0UmVxdWVzdHMiLCJzZW5kUmVxdWVzdCIsImdldFRoaXNGcmllbmRzTW92aWVzIiwibG9nb3V0Iiwic2VuZFdhdGNoUmVxdWVzdCIsImRlbGV0ZSIsInJlbW92ZVdhdGNoUmVxdWVzdCIsImRlY2xpbmUiLCJhY2NlcHQiLCJyZW1vdmVSZXF1ZXN0IiwiZmluZE1vdmllQnVkZGllcyIsImdldEZyaWVuZHMiLCJnZXRGcmllbmRMaXN0IiwicmF0ZU1vdmllIiwiZ2V0UmVjZW50UmVsZWFzZSIsImdldFVzZXJSYXRpbmdzIiwiZ2V0RnJpZW5kVXNlclJhdGluZ3MiLCJnZXRNdWx0aXBsZU1vdmllUmF0aW5ncyIsImhhbmRsZUdldEZyaWVuZFJhdGluZ3MiLCJzZWFyY2hSYXRlZE1vdmllIiwicG9ydCIsInByb2Nlc3MiLCJlbnYiLCJQT1JUIiwibGlzdGVuIl0sIm1hcHBpbmdzIjoiOztBQUNBLElBQUlBLFVBQVVDLFFBQVEsMEJBQVIsQ0FBZDtBQUFBLElBQ0lDLFVBQVVELFFBQVEsU0FBUixDQURkO0FBQUEsSUFFSUUsTUFBTUQsU0FGVjtBQUFBLElBR0lFLGFBQWFILFFBQVEsYUFBUixDQUhqQjtBQUFBLElBSUlJLFdBQVdKLFFBQVEs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QUlLLEdBQUosQ0FBUSxnQkFBUixFQUEwQlIsUUFBUThDLGdCQUFsQztBQUNBM0MsSUFBSUssR0FBSixDQUFRLGlCQUFSLEVBQTJCUixRQUFRK0MsY0FBbkM7QUFDQTVDLElBQUlLLEdBQUosQ0FBUSx1QkFBUixFQUFpQ1IsUUFBUWdELG9CQUF6QztBQUNBN0MsSUFBSTBCLElBQUosQ0FBUywwQkFBVCxFQUFxQzdCLFFBQVFpRCx1QkFBN0M7QUFDQTlDLElBQUkwQixJQUFKLENBQVMsbUJBQVQsRUFBOEI3QixRQUFRa0Qsc0JBQXRDO0FBQ0EvQyxJQUFJSyxHQUFKLENBQVEsbUJBQVIsRUFBNkJSLFFBQVFtRCxnQkFBckM7O0FBR0FoRCxJQUFJSyxHQUFKLENBQVEsSUFBUixFQUFjLFVBQVNDLENBQVQsRUFBY0MsQ0FBZCxFQUFtQjtBQUM3QkEsSUFBSUcsUUFBSixDQUFhLEdBQWI7QUFDSCxDQUZEOztBQUlBLElBQUl1QyxPQUFPQyxRQUFRQyxHQUFSLENBQVlDLElBQVosSUFBb0IsSUFBL0I7QUFDQXBELElBQUlxRCxNQUFKLENBQVdKLElBQVgsRUFBaUIsWUFBWSxDQUU1QixDQUZEIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgaGFuZGxlciA9IHJlcXVpcmUoJy4vbGliL3JlcXVlc3QtaGFuZGxlci5qcycpO1xyXG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxudmFyIGFwcCA9IGV4cHJlc3MoKTtcclxudmFyIGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xyXG52YXIgc2Vzc2lvbnMgPSByZXF1aXJlKFwiY2xpZW50LXNlc3Npb25zXCIpO1xyXG52YXIgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcclxudmFyIGNvbXByZXNzaW9uID0gcmVxdWlyZSgnY29tcHJlc3Npb24nKTtcclxuXHJcblxyXG5hcHAuZ2V0KCcqJywgZnVuY3Rpb24ocmVxLHJlcyxuZXh0KSB7XHJcbiAgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wcm90byddICE9PSAnaHR0cHMnKSB7XHJcbiAgICByZXMucmVkaXJlY3QoJ2h0dHBzOi8vJyArIHJlcS5ob3N0bmFtZSArIHJlcS51cmwpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBuZXh0KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmFwcC51c2UoY29ycygpKTtcclxuYXBwLnVzZShzZXNzaW9ucyh7XHJcbiAgY29va2llTmFtZTogJ215U2Vzc2lvbicsIC8vIGNvb2tpZSBuYW1lIGRpY3RhdGVzIHRoZSBrZXkgbmFtZSBhZGRlZCB0byB0aGUgcmVxdWVzdCBvYmplY3RcclxuICBzZWNyZXQ6ICdibGFyZ2FkZWVibGFyZ2JsYXJnJywgLy8gc2hvdWxkIGJlIGEgbGFyZ2UgdW5ndWVzc2FibGUgc3RyaW5nXHJcbiAgcmVzYXZlOiB0cnVlLFxyXG4gIGR1cmF0aW9uOiAyNCAqIDYwICogNjAgKiAxMDAwLCAvLyBob3cgbG9uZyB0aGUgc2Vzc2lvbiB3aWxsIHN0YXkgdmFsaWQgaW4gbXNcclxuICBhY3RpdmVEdXJhdGlvbjogMTAwMCAqIDYwICogNSwgLy8gaWYgZXhwaXJlc0luIDwgYWN0aXZlRHVyYXRpb24sIHRoZSBzZXNzaW9uIHdpbGwgYmUgZXh0ZW5kZWQgYnkgYWN0aXZlRHVyYXRpb24gbWlsbGlzZWNvbmRzXHJcbiAgc2F2ZUluaXRpYWxpemVkOiB0cnVlXHJcbn0pKTtcclxuXHJcbmFwcC51c2UoY29tcHJlc3Npb24oKSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKTtcclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9wdWJsaWMnLCB7bWF4QWdlOjM2MDAqMjQgKjEwMDB9KSk7XHJcbmFwcC51c2UoJy9zY3JpcHRzJywgZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9ub2RlX21vZHVsZXMnLCB7bWF4QWdlOjM2MDAqMjQqMTAwMH0pKTtcclxuYXBwLnVzZSgnL2NvbXBpbGVkJywgZXhwcmVzcy5zdGF0aWMoX19kaXJuYW1lICsgJy9jb21waWxlZCcsIHttYXhBZ2U6MzYwMCoyNCoxMDAwfSkpO1xyXG5cclxuXHJcbmFwcC5wb3N0KCcvc2lnbnVwJywgaGFuZGxlci5zaWdudXBVc2VyKTtcclxuYXBwLnBvc3QoJy9sb2dpbicsIGhhbmRsZXIuc2lnbmluVXNlcik7XHJcblxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vSGFuZGxpbmcgZnJpZW5kc1xyXG4vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbi8vZnJpZW5kIHJlcXVlc3RzXHJcbmFwcC5wb3N0KCcvbGlzdFJlcXVlc3RzJywgaGFuZGxlci5saXN0UmVxdWVzdHMpO1xyXG5hcHAucG9zdCgnL3NlbmRSZXF1ZXN0JywgaGFuZGxlci5zZW5kUmVxdWVzdCk7XHJcbi8vRnJpZW5kIHJlcXVlc3RzXHJcbmFwcC5wb3N0KCcvZ2V0VGhpc0ZyaWVuZHNNb3ZpZXMnLGhhbmRsZXIuZ2V0VGhpc0ZyaWVuZHNNb3ZpZXMpXHJcbmFwcC5wb3N0KCcvbG9nb3V0JywgaGFuZGxlci5sb2dvdXQpO1xyXG5cclxuYXBwLnBvc3QoJy9zZW5kV2F0Y2hSZXF1ZXN0JyxoYW5kbGVyLnNlbmRXYXRjaFJlcXVlc3QpXHJcbmFwcC5kZWxldGUoJy9zZW5kV2F0Y2hSZXF1ZXN0JywgaGFuZGxlci5yZW1vdmVXYXRjaFJlcXVlc3QpXHJcblxyXG5hcHAucG9zdCgnL2RlY2xpbmUnLCBoYW5kbGVyLmRlY2xpbmUpO1xyXG5hcHAucG9zdCgnL2FjY2VwdCcsIGhhbmRsZXIuYWNjZXB0KTtcclxuYXBwLmRlbGV0ZSgnL3JlbW92ZVJlcXVlc3QnLCBoYW5kbGVyLnJlbW92ZVJlcXVlc3QpXHJcblxyXG5hcHAucG9zdCgnL2ZpbmRNb3ZpZUJ1ZGRpZXMnLGhhbmRsZXIuZmluZE1vdmllQnVkZGllcylcclxuYXBwLnBvc3QoJy9nZXRGcmllbmRzJyxoYW5kbGVyLmdldEZyaWVuZHMpXHJcbmFwcC5nZXQoJy9nZXRGcmllbmRMaXN0JywgaGFuZGxlci5nZXRGcmllbmRMaXN0KVxyXG5cclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vL0hhbmRsaW5nIG1vdmllc1xyXG4vLy8vLy8vLy8vLy8vLy8vLy9cclxuYXBwLnBvc3QoJy9yYXRlbW92aWUnLCBoYW5kbGVyLnJhdGVNb3ZpZSk7XHJcbmFwcC5nZXQoJy9yZWNlbnRSZWxlYXNlJywgaGFuZGxlci5nZXRSZWNlbnRSZWxlYXNlKTtcclxuYXBwLmdldCgnL2dldFVzZXJSYXRpbmdzJywgaGFuZGxlci5nZXRVc2VyUmF0aW5ncyk7XHJcbmFwcC5nZXQoJy9nZXRGcmllbmRVc2VyUmF0aW5ncycsIGhhbmRsZXIuZ2V0RnJpZW5kVXNlclJhdGluZ3MpO1xyXG5hcHAucG9zdCgnL2dldE11bHRpcGxlTW92aWVSYXRpbmdzJywgaGFuZGxlci5nZXRNdWx0aXBsZU1vdmllUmF0aW5ncyk7XHJcbmFwcC5wb3N0KCcvZ2V0RnJpZW5kUmF0aW5ncycsIGhhbmRsZXIuaGFuZGxlR2V0RnJpZW5kUmF0aW5ncyk7XHJcbmFwcC5nZXQoJy9zZWFyY2hSYXRlZE1vdmllJywgaGFuZGxlci5zZWFyY2hSYXRlZE1vdmllKTtcclxuXHJcblxyXG5hcHAuZ2V0KCcvKicsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XHJcbiAgICByZXMucmVkaXJlY3QoJy8nKTtcclxufSk7XHJcblxyXG52YXIgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcclxuYXBwLmxpc3Rlbihwb3J0LCBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc29sZS5sb2coJ0xpc3RlbmluZyBvbiBwb3J0IDMwMDAhJyk7XHJcbn0pOyJdfQ==