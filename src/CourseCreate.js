import React from 'react';
import jQuery from 'jquery';

class CourseCreate extends React.Component {

  createCourse(event){
    event.preventDefault();

    let newCourse = {
      name: this.refs.name.value,
      description: this.refs.description.value
    };
    var component = this;
    jQuery.ajax({
      type: "POST",
      url: "http://localhost:3000/courses.json",
      data: JSON.stringify({
        course: newCourse
      }),
      contentType: "application/json",
      dataType: "json"

    }).done(function( data ) {
      component.props.reload()
    })
        .fail(function(error) {
          console.log(error);
        });
  }

  render (){
    return (
        <form onSubmit={this.createCourse.bind(this)}>
          <input type="text" className="form-control" ref="name" placeholder="What will the project be named?" />
          <textarea className="form-control" ref="description" placeholder="Describe the project.."></textarea>
          <button type="submit" className="btn btn-primary">Create Project</button>
        </form>
    )
  }
}

export default CourseCreate;
