'use strict';

var db = require('../dbConnection'),
    allRequest = db.Model.extend({
  tableName: 'allRequests',
  hasTimestamps: !0
});

//create friendRequest model


module.exports = allRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvYWxsUmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJkYiIsInJlcXVpcmUiLCJhbGxSZXF1ZXN0IiwiTW9kZWwiLCJleHRlbmQiLCJ0YWJsZU5hbWUiLCJoYXNUaW1lc3RhbXBzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxLQUFLQyxRQUFRLGlCQUFSLENBQVQ7QUFBQSxJQUdJQyxhQUFhRixHQUFHRyxLQUFILENBQVNDLE1BQVQsQ0FBZ0I7QUFDL0JDLGFBQVcsYUFEb0I7QUFFL0JDO0FBRitCLENBQWhCLENBSGpCOztBQUVBOzs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQk4sVUFBakIiLCJmaWxlIjoiYWxsUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkYiA9IHJlcXVpcmUoJy4uL2RiQ29ubmVjdGlvbicpO1xyXG5cclxuLy9jcmVhdGUgZnJpZW5kUmVxdWVzdCBtb2RlbFxyXG52YXIgYWxsUmVxdWVzdCA9IGRiLk1vZGVsLmV4dGVuZCh7XHJcbiAgdGFibGVOYW1lOiAnYWxsUmVxdWVzdHMnLFxyXG4gIGhhc1RpbWVzdGFtcHM6IHRydWVcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFsbFJlcXVlc3Q7XHJcbiJdfQ==