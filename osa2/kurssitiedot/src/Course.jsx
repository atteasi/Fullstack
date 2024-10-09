const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content content={props.course.parts} />
        <Total parts={props.course} />
      </div>
    );
  };