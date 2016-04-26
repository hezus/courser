# Courser

We are going to create a Student course app today with React on a Rails backend.

Our system needs to handle the following:

1. Display a list of resources
2. Provide a form for creating new resources
3. Provide a form for editing resources
4. Provide the ability to delete resources
5. Play nice with a restful API
6. Be extensible

We want to be able to create Courses
We want to be able to create Students
We want to assign students to the courses

---------------------
We will be using the [react-starter provided by Rory](https://github.com/Codaisseur/react-starter)

I have already created a simple rails backend for you to be downloaded at: [todo](todo)

At the end of this exercise you should:

> Know what a callback function is
> Understand .bind(this)
> Create forms for various resources
> Create a structure in your application
> Learn about the react router

# All courses
Lets start by making a overview page for all the courses. We will need to create React components for all Courses and for a single Course.

## I Setup the rendering

###1 Prerequisites
Create directory
Download starter
Add stuff to git



###2 Change App.js
Change App.js to render a component of courses

```javascript
import React from 'react';
import Courses from './Courses';

class App extends React.Component {
  render() {
    return (
       <Courses />
    );
  }
}

export default App;
```

###3 Create Courses.js
We need to create a component for the courses. Create a new file for it.

```javascript
import React from 'react';

class Courses extends React.Component {

}
export default Courses;
```

We need to add a constructor to the Courses component. With a default value for 
 
```javascript
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }
```

###4 Data
Add some data for rendering. Lets use a simple array with objects
```
  componentDidMount() {
    this.setState({
      courses: [{name: 'React', description: 'Its a course'}, {name: 'Javascript', description: 'Learn the basics'}],
    });
  }
```

###5 Render
We need to render the Courses. We do this by using the map method on our array with courses

```javascript
  render() {
    let courses = this.state.courses.map(function(course) {
      return <li key={course.id}><h1>{course.name}</h1><p>{course.description}</p></li>;
    });

    return (
        <ul>
          {courses}
        </ul>
    )
  }
```
TODO: explain about map

###6 ...

###7 Test
Go to `http://localhost:4200` and check if stuff works. It should look like this

![Rendering](/docs/rendering.png?raw=true)

###8 Git
Add your progress to Git

## II Connect API

###1 Prerequisites
1. Download the RAILS API
2. Install it
3. Migrate and seed
4. Start 
5. Go to `http://localhost:3000/courses.json` which should look like a list of courses

###2 jQuery
1. Install jquery 
2. Add it to the imports of the courses component

###3 GET
Right now we use a predefined array in our courses component, lets get that array from our Rails server.
We do this by adding a jQuery ajax request and then changing the state. When we change the state of a React component it is rerendered

```javascript
  componentDidMount() {
    jQuery.get("http://localhost:3000/courses.json", (function(data){
      this.setState({
        courses: data.courses,
      });
    }).bind(this));
  }
```

Do you know what bind(this) does?

###4 Test
Go to `http://localhost:4200` and check if stuff works. It should look like this

![Data](/docs/data.png?raw=true)

###5 Git
Add your progress to Git

## II Add a create resource

###1 Add a form

Add a form to the render method. The form will call another method on submit.

```
<form onSubmit={this.createCourse.bind(this)}>
  <input type="text" className="form-control" ref="name" placeholder="What will the project be named?" />
  <textarea className="form-control" ref="description" placeholder="Describe the project.."></textarea>
  <button type="submit" className="btn btn-primary">Create Project</button>
</form>
```

###2 Handle the form
We need a function to get the information from the form and submit it with a AJAX request.

```
createCourse(event){
    event.preventDefault();

    let newCourse = {
      name: this.refs.name.value,
      description: this.refs.description.value
    };

    jQuery.ajax({
      type: "POST",
      url: "http://localhost:3000/courses.json",
      data: JSON.stringify({
        course: newCourse
      }),
      contentType: "application/json",
      dataType: "json"

    }).done(function( data ) {
      alert( "Data saved: " + data );
    })
    .fail(function(error) {
      console.log(error);
    });
  }
```

###3 Reload the data
Offcourse showing a alert is really fancy already. Lets make a function  to reload the data

1. Move the AJAX GET function out of the componentDidMount function and make a own function for it.
2. Call this function inside the done() block of the ajax post function. You cannot use this.function() because it is out of scope, you need to reassign this.

###4 Test
Go to `http://localhost:4200` and check if stuff works. You should now have a working form

###5 Git
Add your progress to Git

## III Time to split up some code

###1 Make a component for Course

Create a component in its own file that only does a render for Course


###2 Make a component for CourseCreate

1. Create a component `CourseCreate` in its own file that only handles the create
2. Move the `<form>` and the  `createCourse()` method there
3. Call the reload method in `Courses` from within the `CourseCreate` component

## IV Add a list for Students

