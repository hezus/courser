import React from 'react';

class Course extends React.Component {
  render() {
    return (
        <li>
          <h1>{this.props.course.name}</h1>
          <p>
            {this.props.course.description}
          </p>
        </li>
    )
  }

}

export default Course;