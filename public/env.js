const submitProject = (project) => {
  $.ajax({
    url: '/api/projects',
    contentType: 'application/json',
    data: JSON.stringify(project),
    type: 'POST',
    success: function(result) {
      alert('Project successfuly submitted')
    }
  });
}

/*const submitProject = () => {
  let project = {};
  project.first_name = $('#first_name').val();
  project.last_name = $('#last_name').val();
  project.mobile = $('#password').val();
  project.email = $('#email').val();

  console.log("Project Data Submitted: ", project);
}*/

const project = () => {
  let first_name = $('#first_name').val()
  let last_name = $('#last_name').val()
  let mobile = $('#mobile').val()
  let email = $('#email').val()

  let project = { first_name, last_name, mobile, email }
  console.log(project)
  submitProject(project)
}


const requestProjects = () => {
  $.get('/api/projects', (projects) => {
    if (projects.length > 0) {
      console.log(projects)
      listProjects(projects)
    }
  })
}

listProjects = (projects) => {
  projects.forEach(project => {
    console.log(project)
    let item = '<div class="column">' +
      '<div class="colMargin">' +
      '<img src="' + project.imageUrl + '" alt="placeholder">' +
      '</div>' +
      '<h3>' + project.title + '</h3>' +
      '<p>' + project.description + '</p>' +
      '</div>'

      $('#listProjects').append(item)
  });
}

const hireButtonFunction = () => {
  alert('Thank you for choosing to hire me')

}

// connect to the socket

let socket = io();


socket.on('number', (msg) => {
  console.log('Random number: ' + msg);
})

$(document).ready(function () {
  console.log('Ready')

  //bind the button
  $('#hireButton').click(hireButtonFunction)

  //test get call
  $.get('/test?user_name="User007"', (result) => {
    console.log(result)
  })


  $('.modal').modal();
  requestProjects()

})
