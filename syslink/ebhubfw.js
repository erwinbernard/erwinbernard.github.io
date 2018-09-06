var ebhubjs = { // This should be before HTML_ID
  hashprior: function ($identity) {
    // return True if successful and False if failed
    // or return Array with values that will be sent to Server; e.g., ['mydata1', 'mydata2']
    switch ($identity) {
      case 'ajaxhash_id':
        break;

      default:
        if (ebhub_ajax.html_id.eb_syslinkstatic) {
          ebhub.waitshow($identity, 'pleasewait', [ebhub_ajax.html_id.eb_syslinkstatic + "image/gif/loading1"]);
        }
        break;
    }
    return true;
  },

  hashcontent: function ($identity, $content, $is_nocontent) {
    if ($is_nocontent === false) {
      switch ($identity) {
        case 'ajaxhash_id':
          alert($content);
          break;
          
        default:
          ebhub.renderpage($identity, $content);
          var x = document.getElementsByClassName("active");
          for (var i = 0; i < x.length; i++) {
              x[i].classList.remove('active');  // Remove all instances of 'active'
          }
          // Set active to classname ajax_??
          document.getElementById("ajax_" + $identity).className += "active"; // append to existing
          break;
      }
      switch ($identity) {
        case 'purchase':
          break;
          
        default:
          break;
      }
    }
    return;
  },

  hasherror: function ($identity, $error_code, $error_message) {  // Errors coming from the Server
    if ($error_code === '704') {
      var $heading = "Single-Page Application Error";
      var $1stmsg = "This could be cause by having multiple instances or opening pages of this site in multiple browser tabs. Another possible cause is downloading an object originating from our website or loading an invalid object such as media objects or applications.";
      var $2ndmsg = "Please load this page again to correct this problem.";
      ebhubfw_tools.show_popmsg($heading, $1stmsg, $2ndmsg);
    }
    return;
  },

  markprior: function ($identity) {
    // return True if successful and False if failed
    // or return Array with values that will be sent to Server; e.g., ['mydata1', 'mydata2']
    ebhub.waitshow($identity, ebhub_ajax.html_id.eb_syslinkdynamic + "image/gif/loading1");
    return true;
  },

  markcontent: function ($identity, $content, $is_nocontent) {
    if ($is_nocontent === false) {
      if ($identity === 'ajaxmark_id') {
        alert($content);
      } else {
        ebhub.renderpage($identity, $content);
      }
    }
    return;
  },

  markerror: function ($identity, $error_code, $error_message) {  // Errors coming from the Server
    return;
  },

  // If using Syncpost and Recaptcha, syncpostprior will not be executed
  syncpostprior: function ($identity, $postquery, $formelements, $event) {  // Client-side validation
    // return True if successful and False if failed
    // or return Array with values that will be sent to Server; e.g., ['mydata1', 'mydata2']
    switch ($identity) {
      case 'signup':
        var $heading = "Signup Validation Error";
        var $errormsgs = [];
        if ($formelements['signup_name'] && $formelements['signup_email'] && $formelements['signup_agree']) {
          if ($formelements['signup_name'] === 'off') {
            $errormsgs.push('[Name textbox] requires your real name, alias or pseudonym!');
          }
          if ($formelements['signup_email'] === 'off') {
            $errormsgs.push('[Email textbox] requires your own email address!');
          }
          if ($formelements['signup_agree'] === 'off') {
            $errormsgs.push('You should agree with our Terms of Use when you sign-up with us!');
          }
          if ($errormsgs.length === 0) {
            var $msgconfirm = 'Proceed with registration ' + $formelements['signup_name'];
            return confirm($msgconfirm);
          } else {
            var $1stmsg = "<strong>Please correct the errors below:</strong>";
            var $2ndmsg = '<ul class="v-list-v2">';
            for (var i = 0; i < $errormsgs.length; i++) {
              $2ndmsg = $2ndmsg + '<li><i class="fa fa-info-circle"></i>' + $errormsgs[i]  + '</li>'
            }
            $2ndmsg = $2ndmsg + '</ul>';
            ebhubfw_tools.show_popmsg($heading, $1stmsg, $2ndmsg);
          }
        }
        return false;
        break;

      case 'logmeup':
        return true;
        break;
        
      case 'login':
        return true;
        break;
        
      case 'syncpost_id':
        return true;
        break;
        
      default:
        return false;
        break;
    }
    return true;
  },

  ajaxpostprior: function ($identity, $postquery, $formelements) {  // Client-side validation
    // return True if successful and False if failed
    // or return Array with values that will be sent to Server; e.g., ['mydata1', 'mydata2']
    ebhub.waitshow($identity, ebhub_ajax.html_id.eb_syslinkdynamic + "image/gif/loading1");
    return true;
  },

  ajaxpostcontent: function ($identity, $content, $is_nocontent) {
    if ($is_nocontent === false) {
      ebhub.renderpage($identity, $content);
    }
    return;
  },

  ajaxposterror: function ($identity, $error_code, $error_message) {  // Errors coming from the Server
    alert($error_message);
    return;
  },

  error: function ($error_code, $error_message) {
    return;
  }
};

var ebhubfw = {
  onload: function () {
    if (document.getElementById("js-load").style.display === 'none') {
      ebhub.showhide('loadwait');
    }
    return;
  }
};

var ebhubfw_tools = {
  show_popmsg: function ($heading, $1stmsg, $2ndmsg) {
    document.getElementById("modal_heading").innerHTML = $heading;
    document.getElementById("modal_1stmsg").innerHTML = $1stmsg;
    document.getElementById("modal_2ndmsg").innerHTML = $2ndmsg;
    $("#modalpop").modal();
    return;
  },
  
  alert_errormsg: function ($heading, $message) {
    document.getElementById("alert_error").style.display = 'block';
    document.getElementById("alert_errorhead").innerHTML = $heading;
    document.getElementById("alert_errormsg").innerHTML = $message;
    return false;
  },
  
  alert_infomsg: function ($heading, $message) {
    document.getElementById("alert_info").style.display = 'block';
    document.getElementById("alert_infohead").innerHTML = $heading;
    document.getElementById("alert_infomsg").innerHTML = $message;
    return false;
  },
  
  alert_succmsg: function ($heading, $message) {
    document.getElementById("alert_succ").style.display = 'block';
    document.getElementById("alert_succhead").innerHTML = $heading;
    document.getElementById("alert_succmsg").innerHTML = $message;
    return false;
  },
  
  alert_warnmsg: function ($heading, $message) {
    document.getElementById("alert_warn").style.display = 'block';
    document.getElementById("alert_warnhead").innerHTML = $heading;
    document.getElementById("alert_warnmsg").innerHTML = $message;
    return false;
  }
};
