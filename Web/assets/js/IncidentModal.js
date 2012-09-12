// Generated by CoffeeScript 1.3.3

/*
Retreive, and create a incident modal dialog box
*/


(function() {
  var Make, checkMessage, getMessage;

  getMessage = function() {
    var messageInput;
    messageInput = $("#messageInput");
    return messageInput.val();
  };

  checkMessage = function() {
    var controlGroup;
    if (getMessage() === "") {
      controlGroup = $("#messageControlGroup");
      controlGroup.addClass("error");
      controlGroup.change(function() {
        if (getMessage() !== "") {
          return controlGroup.removeClass("error");
        }
      });
      return false;
    }
    return true;
  };

  Make = function(id) {
    var args, calltype, onFail, onSuccess, path;
    onFail = function(data) {
      return console.log("Rest Call has failed");
    };
    path = "incident";
    args = "/" + id;
    calltype = "GET";
    onSuccess = function(data) {
      var commentFailure, commentSuccess, incidentModal, submitCommentButton;
      incidentModal = $("<div class=\"modal hide fade in\" id=\"myModal\">			<div class=\"modal-header\">				<button type=\"button\" class=\"close\" data-dismiss=\"modal\"><i class=\"icon-remove icon-red\"></i></button>				<h3>Incident Details</h3>			</div>			<div class=\"modal-body\">				<div href=\"#\" class=\"thumbnail\" id=\"testThumbnail\">					<img src=\"" + data.image_url + "\" alt=\"\">					</div>				<h2>Details</h2>				<p> " + data.description + "</p>				<h2>Comments</h2>				<p></p>				<div id = \"comments\"></div>								<h2>Post Comment</h2>				<div class =\"control-group\" id = \"messageControlGroup\">					<textarea class=\"input-xlarge\" id=\"messageInput\" rows=\"3\" style=\"margin: 0px; width: 690px; height: 114px; \"></textarea>				</div>				<p></p>				<a href=\"#\" id= \"commentSubmitButton\"class=\"btn btn-primary\">					<i class=\"icon-comment icon-white\"></i>					Submit				</a>				</div>			<div class=\"modal-footer\">					<a href=\"#\" class=\"btn btn-danger\" data-dismiss=\"modal\">					<i class=\"icon-remove icon-white\"></i>					Close Incident				</a>			</div>					</div>");
      incidentModal.modal({
        show: true
      });
      submitCommentButton = incidentModal.find("#commentSubmitButton");
      submitCommentButton.click(function() {
        var onFailure;
        if (checkMessage()) {
          data = {
            comment: getMessage(),
            name: "NA",
            email: "NA"
          };
          onSuccess = function() {
            submitCommentButton.removeClass("btn-primary");
            submitCommentButton.addClass("btn-success");
            console.log("Success");
            return submitCommentButton.text("Comment Submitted Successfuly, Awaiting Approval");
          };
          onFailure = function() {
            submitCommentButton.removeClass("btn-primary");
            submitCommentButton.addClass("btn-danger");
            console.log("Fail");
            return submitCommentButton.text("Comment Submission Failed");
          };
          submitCommentButton.text("Submitting...");
          submitCommentButton.click(function() {});
          return Window.RWCall(onSuccess, onFailure, data, "incident", "/" + id + "/comment", "POST");
        }
      });
      commentFailure = function(data) {
        return console.log("problem for loaing comments");
      };
      commentSuccess = function(data) {
        var c, commentsSection, _i, _len, _results;
        commentsSection = incidentModal.find("#comments");
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          c = data[_i];
          console.log("adding coment " + c);
          _results.push(commentsSection.append($("<p>" + c.comment + "</p>")));
        }
        return _results;
      };
      return Window.RWCall(commentSuccess, commentFailure, {}, "incident", "/" + id + "/comments/", "success");
    };
    return Window.RWCall(onSuccess, onFail, {}, path, args, calltype);
  };

  Window.CreateIncidentModal = Make;

}).call(this);
