  //+++++ Tableau d'utilsateur ++++++++++
  let tabUsers = [
      {
          utilisateur: "Adi",
          mdp: "123456",
          src: "adi.png"
},
      {
          utilisateur: "Ali",
          mdp: "123456",
          src: "ali.png"
},
      {
          utilisateur: "Mahmoud",
          mdp: "0000",
          src: "mahmoud.png"
},
      {
          utilisateur: "Salh",
          mdp: "015485",
          src: "ali.png"
},
      {
          utilisateur: "Mohamed",
          mdp: "123456",
          src: "mohamed.png"
}, {
          utilisateur: "Fingi",
          mdp: "015485",
          src: "mahmoud.png"
}, {
          utilisateur: "Slayser",
          mdp: "015485",
          src: "mbs.png"
},
      {
          utilisateur: "Nabil",
          mdp: "015485",
          src: "mohamed.png"
}, {
          utilisateur: "Mohamed Ben Said",
          mdp: "456123",
          src: "mbs.png"
}
];
  //*************************************

  // tableau des touche de  clavier numérique
  let tabKeyboard = [
      {
          num: 1,
          id: ""
    },
      {
          num: 2,
          id: ""
    },
      {
          num: 3,
          id: ""
    },
      {
          num: 4,
          id: ""
    },
      {
          num: 5,
          id: ""
    },
      {
          num: 6,
          id: ""
    },
      {
          num: 7,
          id: ""
    },
      {
          num: 8,
          id: ""
    },
      {
          num: 9,
          id: ""
    },
      {
          num: "",
          id: "erase"
    },
      {
          num: 0,
          id: "ok"
    },
      {
          num: "",
          id: "ok"
    }
];




/*
// Request Permission from User to get Notified with Event Hundler Click in Button notification
var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});


//Send to the user a notifcation 
function randomNotification() {
    var notifBody = 'Created by Adi.';
    var notifImg = 'icon-192.png';
    var options = {
        body: notifBody,
        icon: notifImg
    }
    var notif = new Notification(notifTitle, options);
    setTimeout(randomNotification, 30000);
}
*/
  // fonction pour Dynamiser le tableau des Users :
  function creatUserBox() {
      $("#userBox").html("");
      tabUsers=localStorage.tabUsers;
      tabUsers=JSON.parse(tabUsers);
      let userInLine = 2;
      tabUsers.forEach(function (e) {
          userInLine += 1;
          if (userInLine === 3) {
              $("#userBox").append("<div class='btn-group' role='group' aria-label='Basic example'></div>");
              $("#userBox div:last").append("<button type='button' class='btn btn-secondary'>" + e.utilisateur + "</button>");
              userInLine = 0;
          } else {
              $("#userBox div:last").append("<button type='button' class='btn btn-secondary'>" + e.utilisateur + "</button>");
          }

      });
      // add an event to the button created
      $("#userBox button").click(function () {
          var name = $(this).text();
          $(".user").val(name);
          $("#userBox").hide();
      });
  }
  //***************************************



  //Dynamiser le clavier Numérique
  let keyLine = 2;
  tabKeyboard.forEach(function (e, i) {
      keyLine += 1;
      if (i === 9) {
          $("#numKeyboard").append("<div class='btn-group' role='group' aria-label='Basic example'></div>");
          $("#numKeyboard div:last").append("<button type='button' class='btn btn-secondary'" + "id=" + e.id + ">" + e.num + "</button>");
      } else if (i === 11) {
          $("#numKeyboard div:last").append("<button type='button' class='btn btn-secondary'" + "id=" + e.id + ">" + e.num + "</button>");
      } else if (keyLine === 3) {
          $("#numKeyboard").append("<div class='btn-group' role='group' aria-label='Basic example'></div>");
          $("#numKeyboard div:last").append("<button type='button' class='btn btn-secondary'>" + e.num + "</button>");
          keyLine = 0;
      } else {
          $("#numKeyboard div:last").append("<button type='button' class='btn btn-secondary'>" + e.num + "</button>");
      }


  });


  // User Input *******************
  $(".user").click(function () {
      creatUserBox();
      $("#userBox").removeAttr("hidden");
      $("#userBox").show();
  });



  //********************************

  //+++++++++  Form Login : Input Password Event Click *********
  $("#ok").click(function () {
      $("#numKeyboard").hide();
  });


  //+++++++++  numKeyboar Box: Input Password Event Click *********
  $("#numKeyboard button").on("click", function () {
      var pwd = $(this).text();
      pwd = $(".pwd").val() + pwd;
      $(".pwd").val(pwd);
  });


  //+++++
  $(".pwd").on("click", function () {
      $("#numKeyboard").removeAttr("hidden");
      $("#numKeyboard").show();

  });


  // Event Erase pour la Touche C dans le clavier numerique
  $("#erase").click(function () {
      var str = $(".pwd").val();
      str = str.substr(0, str.length - 1);
      $(".pwd").val(str);
  })


  //tester si la saisie de l'utilsateur est valide :
  $("#submit").click(function (e) {

      e.preventDefault();
      let test = true;
      let user = $(".user").val();
      let pwd = $(".pwd").val();
      if (!(user.length === 0) && !(pwd.length === 0)) {
          tabUsers.forEach(function (e) {

              if (e.utilisateur === user) {
                  if (e.mdp === pwd) {
                      $("#alert").html("<b>Félicitation</b> vous êtes connecté")
                      $("#alert").removeAttr("hidden");
                      $("#alert").removeClass("alert-danger");
                      $("#alert").addClass("alert-success");
                      $("#alert").show();
                      $("#userProfPhoto img").attr("src","img/"+ e.src);
                      test = false;
                }
            }

          });
          //message d'alert: mot de passe incorrecte
          if (test) {
              $("#alert").html("<strong>Désolé!</strong> Mots de passe incorrecte");
              $("#alert").removeClass("alert-success");
              $("#alert").addClass("alert-danger");
              $("#alert").removeAttr("hidden");

              $("#alert").show("hidden");

          };
      }



  })


  //+++++ fait dissparaitr le userBox le clavier numerique
  $(document).mousedown(function (e) {
      var container = $("#userBox,#numKeyboard");

      if (container.has(e.target).length === 0) {
          container.hide();
      }
  });


  //+++++ fait dissparaitr le message d'alert: mots de passe incorrecte
  $(document).mousedown(function (e) {
      var container = $("#submit");

      // if the target of the click isn't the container nor a descendant of the container
      if (container.has(e.target).length === 0) {
          $("#alert").hide();

      }
  });


  // ******** Clique sur le lien Créer un compte ++++
  $("#formLogin p + a").click(function () {
      $("#alertIns").attr("hidden", "hidden");
      $("#formInsc").removeAttr("hidden");
      $("#formInsc").show(2000);
      $("#formInsc input:lt(3)").val("");


  })
