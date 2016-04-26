import React from 'react';
import jQuery from 'jquery';
import Students from './Students';

class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    this.loadCourses()
  }

  loadCourses(event){
    jQuery.get("http://localhost:3000/courses.json", function(data){
      this.setState({
        courses: data.courses,
      });
    }.bind(this));
  }

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
      component.loadCourses()
    })
    .fail(function(error) {
      console.log(error);
    });
  }

  render() {
    let courses = this.state.courses.map(function(course) {
      return <li key={course.id}><h1>{course.name}</h1><p>{course.description}</p><Students/></li>;
    });

    return (
        <div>
          <ul>
            {courses}
          </ul>
          <form onSubmit={this.createCourse.bind(this)}>
            <input type="text" className="form-control" ref="name" placeholder="What will the project be named?" />
            <textarea className="form-control" ref="description" placeholder="Describe the project.."></textarea>
            <button type="submit" className="btn btn-primary">Create Project</button>
          </form>
        </div>
    )
  }

}

export default Courses;