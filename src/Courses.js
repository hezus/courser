import React from 'react';
import jQuery from 'jquery';

import Course from './Course';
import CourseCreate from './CourseCreate';

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

  loadCourses(){
    jQuery.get("http://localhost:3000/courses.json", function(data){
      this.setState({
        courses: data.courses,
      });
    }.bind(this));
  }


  render() {
    let courses = this.state.courses.map(function(course) {
      return <Course key={course.id} course={course} />;
    });

    return (
        <div>
          <ul>
            {courses}
          </ul>
          <CourseCreate reload={this.loadCourses.bind(this)}/>
        </div>
    )
  }

}

export default Courses;